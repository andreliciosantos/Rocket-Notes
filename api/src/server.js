const express = require("express");

const routes = require("./routes"); //como nao diz qual arquivo em especifico queremos da pasta, ele automaticamente busca pelo index.js

const app = express();
app.use(express.json()); // Dizendo pro node que o app vai usar json para receber parâmetros

app.use(routes);

const PORT = 3333;
app.listen(PORT, () =>{
  console.log(`Server is running on Port: ${PORT}`);
});
