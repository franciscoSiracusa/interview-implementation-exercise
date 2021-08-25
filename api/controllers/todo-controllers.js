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

const createItem = async (req,res) =>{
    let sql = "INSERT INTO items(description) VALUES('"+ req.query.description +"')";
    await pool.query(sql);
    res.sendStatus(200).end()
};

const createFolder = async(req,res) =>{
    let sql = "INSERT INTO folders(name) VALUES('"+ req.query.description +"')";
    await pool.query(sql);
    res.sendStatus(200).end()
};

const editItem = (req,res) =>{

};

const editFolder = (req,res) =>{

};

const deleteItem = async(req,res) =>{
    let sql = "DELETE FROM items WHERE item_id = " + req.query.id;
    console.log(sql)
    await pool.query(sql);
    res.sendStatus(200).end();
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