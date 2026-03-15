const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarioSchema");

const authController = {};

authController.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        error: "Nombre, email y contraseña son obligatorios"
      });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(409).json({
        error: "Ya existe un usuario con ese email"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      nombre,
      email,
      passwordHash,
      rol: rol || "alumno"
    });

    await usuario.save();

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (err) {
    console.error("Error en register:", err);
    res.status(500).json({ error: "Error en el registro" });
  }
};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email y contraseña son obligatorios"
      });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({
        error: "Credenciales incorrectas"
      });
    }

    let passwordOk = false;

    // Si está hasheada con bcrypt
    if (usuario.passwordHash && usuario.passwordHash.startsWith("$2")) {
      passwordOk = await bcrypt.compare(password, usuario.passwordHash);
    } else {
      // Compatibilidad temporal con usuarios antiguos en texto plano
      passwordOk = usuario.passwordHash === password;
    }

    if (!passwordOk) {
      return res.status(401).json({
        error: "Credenciales incorrectas"
      });
    }

    req.session.user = {
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    };

    res.json({
      message: "Login correcto",
      user: req.session.user
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el login" });
  }
};

authController.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        error: "Error al cerrar sesión"
      });
    }

    res.json({ message: "Logout correcto" });
  });
};

authController.me = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "No autenticado" });
  }

  res.json(req.session.user);
};

module.exports = authController;