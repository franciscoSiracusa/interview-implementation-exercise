const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = 3000;

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

//Routes
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname + 'public/index.html'));
    
})

app.use(require('./api/routes/todo-routes.js'));

//Initialize Server
app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`);
})
