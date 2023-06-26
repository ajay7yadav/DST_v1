const Routes = require("../utils/constant.js");
const controller = require("../controllers/todo.controller.js");

module.exports = (app) => {

  app.post(Routes.createTodo, controller.createTodo);
  app.get(Routes.getAllTodo, controller.getAll_Todo);
  
};
