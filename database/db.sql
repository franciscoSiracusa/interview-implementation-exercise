CREATE DATABASE database_todolist;

USE database_todolist;

-- Items table
CREATE TABLE items (
    item_id INT NOT NULL,
    description VARCHAR(50) NOT NULL,
    checked BOOLEAN NOT NULL DEFAULT 0
);

ALTER TABLE items ADD PRIMARY KEY (item_id);

ALTER TABLE items 
    MODIFY item_id INT NOT NULL AUTO_INCREMENT;

DESCRIBE items;

-- Folder table

CREATE TABLE folder (
    name VARCHAR(30) NOT NULL,
    item_id INT NOT NULL,
    PRIMARY KEY(name,item_id),
    FOREIGN KEY(item_id) REFERENCES items(item_id) ON DELETE CASCADE
);

DESCRIBE folder;