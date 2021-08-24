const path = require('path')
const pool = require(path.join(__dirname, '..', '..','database.js'))

const getItem = async (req,res) =>{
    const items = await pool.query('SELECT * FROM items');
    res.json(items);
};
 
const getFolder = async (req,res) =>{
    const folders = await pool.query('SELECT * FROM folders');
    res.json(folders);
};

const createItem = (req,res) =>{
    console.log(req.query.description);
    res.send("recibido")
};

const createFolder = (req,res) =>{

};

const editItem = (req,res) =>{

};

const editFolder = (req,res) =>{

};

const deleteItem = (req,res) =>{

};

const deleteFolder = (req,res) =>{

};

module.exports = {
    getItem,
    getFolder,
    createItem,
    createFolder,
    editItem,
    editFolder,
    deleteItem,
    deleteFolder
}