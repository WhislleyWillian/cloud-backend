const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const BoxesController = require('./controllers/BoxesController');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

validationToken = (req, res, next) => {
    console.log("teste validationToken");
    if (req.headers.authorization) {
        // console.log(req.headers.authorization);
        next();
    } else {
        res.status(401);//.send({ error: "no authorized"});
        next({ status: 401, message: "no authorized"}); 
        return; 
    }
}

routes.post("/login", UserController.login);
routes.post("/register", UserController.register);
routes.get("/users/search", validationToken, UserController.allUsers);
routes.get("/users/teste", validationToken, UserController.getUser);

routes.get("/boxes-view", validationToken, BoxesController.show);
routes.post("/new-box", validationToken, BoxController.store);
routes.get("/box/:id", validationToken, BoxController.show);

routes.post("/boxes/:id/files", validationToken, multer(multerConfig).single('file'), FileController.store);

 

module.exports = routes;
