const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const BoxesController = require('./controllers/BoxesController');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.get("/login", UserController.login);
routes.post("/register", UserController.register);
routes.get("/users/search", UserController.allUsers);
routes.get("/users/teste", UserController.getUser);

routes.get("/boxes-view", BoxesController.show);
routes.post("/new-box/:id", BoxController.store);
routes.get("/box/:id", BoxController.show);

routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
