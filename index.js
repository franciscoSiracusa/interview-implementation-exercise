const express = require('express');
const app = express();
const PORT = 3000;

//Routes
app.get('/', (req,res) =>{
    res.send('to-do app');
})

//Initialize Server
app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`);
})
