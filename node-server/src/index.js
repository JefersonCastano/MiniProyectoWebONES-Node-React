const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const v1HorarioRouter = require("./routes/v1/horarioRoutes");
const v1UserRouter = require("./routes/v1/userRoutes");
const v1DocenteRouter = require("./routes/v1/docenteRoutes");
const v1PeriodoAcademicoRouter = require("./routes/v1/periodoAcademicoRoutes");
const v1AmbienteRouter = require("./routes/v1/ambienteRoutes");
const v1competenciaRouter = require("./routes/v1/competenciaRoutes");
const v1ProgramaRouter = require("./routes/v1/programaRoutes");

const app = express();
const PORT = process.env.PORT || 3001;
const v1BasePath = "/api/v1/";

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(v1BasePath + "users", v1UserRouter);
app.use(v1BasePath + "horarios", v1HorarioRouter);
app.use(v1BasePath + "docentes", v1DocenteRouter);
app.use(v1BasePath + "periodos_academicos", v1PeriodoAcademicoRouter);
app.use(v1BasePath + "ambientes", v1AmbienteRouter);
app.use(v1BasePath + "competencias", v1competenciaRouter);
app.use(v1BasePath + "programas", v1ProgramaRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});