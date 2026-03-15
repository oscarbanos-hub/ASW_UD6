require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const session = require("express-session");

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || "globalonline_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

app.use("/api/usuarios", require("./routes/usuarioRoutes"));
app.use("/api/cursos", require("./routes/cursosRoutes"));
app.use("/api/profesores", require("./routes/profesoresRoutes"));
app.use("/api/comentarios", require("./routes/comentariosRoutes"));
app.use("/api/noticias", require("./routes/noticiasRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
