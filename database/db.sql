CREATE DATABASE database_todoList;

USE database_todoList;

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