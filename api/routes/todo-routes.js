const {Router} = require('express');
const routes = Router();
const controllers = require('../controllers/todo-controllers.js')

//Get items and folders

routes.get('/getItem', (req,res) =>{
    
})

routes.get('/getFolder', (req,res) =>{
    
})

//Create items and folders

routes.post('/createItem', (req,res) =>{
    
});

routes.post('/createFolder', (req,res) =>{

});

//Edit items and folders
routes.patch('/editItem', (req,res) =>{
    
});

routes.patch('/editFolder', (req,res) =>{

});

//Delete items and folders
routes.delete('/editItem', (req,res) =>{
    
});

routes.delete('/editFolder', (req,res) =>{

});


module.exports = routes;