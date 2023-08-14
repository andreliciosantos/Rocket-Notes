require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");

const express = require("express");
const routes = require("./routes"); //como nao diz qual arquivo em especifico queremos da pasta, ele automaticamente busca pelo index.js
migrationsRun();

const app = express();
app.use(express.json()); // Dizendo pro node que o app vai usar json para receber parâmetros

app.use(routes);

app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });

});

const PORT = 3333;
app.listen(PORT, () =>{
  console.log(`Server is running on Port: ${PORT}`);
});
