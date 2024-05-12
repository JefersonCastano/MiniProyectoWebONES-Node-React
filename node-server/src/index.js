const express = require("express");
const morgan = require("morgan");
const v1HorarioRouter = require("./routes/v1/horarioRoutes");
const v1LoginRouter = require("./routes/v1/loginRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/login", v1LoginRouter);
app.use("/api/v1/horarios", v1HorarioRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});