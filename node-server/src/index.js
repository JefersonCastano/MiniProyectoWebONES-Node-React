const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const v1HorarioRouter = require("./routes/v1/horarioRoutes");
const v1UserRouter = require("./routes/v1/userRoutes");
const v1DocenteRouter = require("./routes/v1/docenteRoutes");

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/horarios", v1HorarioRouter);
app.use("/api/v1/docentes", v1DocenteRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});