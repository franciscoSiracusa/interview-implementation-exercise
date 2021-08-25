const path = require('path')
const pool = require(path.join(__dirname, '..', '..','database.js'))

const getItem = async (req,res) =>{
    const items = await pool.query('SELECT * FROM items WHERE folder_id = 0');
    res.json(items);
};
 
const getFolder = async (req,res) =>{
    const folders = await pool.query('SELECT * FROM folders');
    res.json(folders);
};

const getFolderItem = async (req,res) =>{
    let sql = "SELECT * FROM items WHERE folder_id = " + req.query.id;
    const folderItems = await pool.query(sql);
    res.json(folderItems);
}

const createItem = async (req,res) =>{
    let sql = "INSERT INTO items(description) VALUES('"+ req.query.description +"')";
    await pool.query(sql);
    res.sendStatus(200).end()
};

const createFolder = async(req,res) =>{
    let sql = "INSERT INTO folders(name) VALUES('"+ req.query.name +"')";
    await pool.query(sql);
    res.sendStatus(200).end()
};

const createFolderItem = async(req,res) =>{
    id = req.query.id;
    description= req.query.description;
    let sql = `INSERT INTO items(description, folder_id) VALUES('${description}', ${id})`;
    console.log(sql);
    console.log(req.query.id);
    console.log(req.query.description)
    await pool.query(sql);
    res.sendStatus(200).end()
}

const editItem = async(req,res) =>{
    let sql = "UPDATE items SET description = '" + req.query.description + "' WHERE item_id = " + req.query.id;
    await pool.query(sql);
    res.sendStatus(200).end()
};

const editFolder = async(req,res) =>{
    let sql = "UPDATE folders SET name = '" + req.query.name + "' WHERE folder_id = " + req.query.id;
    await pool.query(sql);
    res.sendStatus(200).end() 
};

const checkItem = async(req,res) =>{
    let sql = "UPDATE items SET checked = " + req.query.checked + " WHERE item_id = " + req.query.id;
    await pool.query(sql);
    res.sendStatus(200).end()
}

const deleteItem = async(req,res) =>{
    let sql = "DELETE FROM items WHERE item_id = " + req.query.id;
    await pool.query(sql);
    res.sendStatus(200).end();
};

const deleteFolder = async(req,res) =>{
    let sql = "DELETE FROM folders WHERE folder_id = " + req.query.id;
    await pool.query(sql);
    sql = "DELETE FROM items WHERE folder_id = " + req.query.id;
    await pool.query(sql);
    res.sendStatus(200).end();
};

module.exports = {
    getItem,
    getFolder,
    getFolderItem,
    createItem,
    createFolder,
    createFolderItem,
    editItem,
    editFolder,
    deleteItem,
    deleteFolder,
    checkItem
}