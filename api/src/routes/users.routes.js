const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

// function myMiddleware(request, response, next){
//   console.log("you pass middle");

//   if(!request.body.isAdmin) {
//     return response.json({ message: "user unauthorized"})
//   }
//   next();
// }

// usersRoutes.use(myMiddleware); // Aplica a função middleware para todas as rotas. 


const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;