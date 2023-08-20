/**
   * É recomendado que um controller tenha no máximo os 5    * métodos listados abaixo, se precisar de mais métodos    * devemos pensar em criar outro controller.
   * 
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */

const { hash, compare } = require("bcryptjs");

const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

   if(checkUserExists){
    throw new AppError("Este e-mail já está em uso.");
   }

   const hashedPassword = await hash(password, 8);

   await database.run("INSERT INTO users (name, email, password)  VALUES (?, ?, ?)", [name,email,hashedPassword]);

   return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user) {
      throw new AppError("User not found");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Este email ja esta em uso.");
    }

    user.name = name;
    user.email = email;

    if(password && !old_password){
      throw new AppError ("voce precisa informar a senha antiga");
    }
    
    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError("A senha antiga nao confere.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(`UPDATE users SET name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?`, [user.name, user.email, user.password, new Date(), id]);

    return response.status(200).json();
  }
}
module.exports = UsersController;