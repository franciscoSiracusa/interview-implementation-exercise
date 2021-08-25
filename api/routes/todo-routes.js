const {Router} = require('express');
const routes = Router();
const controllers = require('../controllers/todo-controllers.js')

//Get items and folders

routes.get('/getItem', controllers.getItem)
routes.get('/getFolder', controllers.getFolder)
routes.get('/getFolderItem',controllers.getFolderItem)

//Create items and folders

routes.post('/createItem', controllers.createItem);
routes.post('/createFolder', controllers.createFolder);
routes.post('/createFolderItem',controllers.createFolderItem);

//Edit items and folders
routes.put('/editItem', controllers.editItem);
routes.put('/editFolder', controllers.editFolder);
routes.put('/checkItem', controllers.checkItem)

//Delete items and folders
routes.delete('/deleteItem', controllers.deleteItem);
routes.delete('/deleteFolder', controllers.deleteFolder);


module.exports = routes;