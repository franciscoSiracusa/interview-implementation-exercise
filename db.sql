USE database_todolist;

CREATE TABLE folders (
    name VARCHAR(30) NOT NULL,
    folder_id INT NOT NULL
);

ALTER TABLE folders ADD PRIMARY KEY (folder_id);

ALTER TABLE folders 
    MODIFY folder_id INT NOT NULL AUTO_INCREMENT;

DESCRIBE folders;

CREATE TABLE items (
    item_id INT NOT NULL,
    description VARCHAR(50) NOT NULL,
    checked BOOLEAN NOT NULL DEFAULT 0,
    folder_id INT NOT NULL DEFAULT 0
);

ALTER TABLE items ADD PRIMARY KEY (item_id);

ALTER TABLE items 
    MODIFY item_id INT NOT NULL AUTO_INCREMENT;

DESCRIBE items;