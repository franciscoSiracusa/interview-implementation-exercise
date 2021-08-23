const {Router} = require('express');
const routes = Router();
const controllers = require('../controllers/todo-controllers.js')

//Get items and folders

routes.get('/getItem', controllers.getItem)
routes.get('/getFolder', controllers.getFolder)

//Create items and folders

routes.post('/createItem', controllers.createItem);
routes.post('/createFolder', controllers.createFolder);

//Edit items and folders
routes.patch('/editItem', controllers.editItem);
routes.patch('/editFolder', controllers.editFolder);

//Delete items and folders
routes.delete('/deleteItem', controllers.deleteItem);
routes.delete('/deleteFolder', controllers.deleteFolder);


module.exports = routes;