/**
   * É recomendado que um controller tenha no máximo os 5    * métodos listados abaixo, se precisar de mais métodos    * devemos pensar em criar outro controller.
   * 
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */

const AppError = require("../utils/AppError");

class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    if(!name){
      throw new AppError("Name is mandatory!")
    }

    response.status(201).json({ name, email, password });
  }
}

module.exports = UsersController;