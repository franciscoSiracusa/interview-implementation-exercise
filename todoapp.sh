#!/usr/bin/env bash

# Make executable

chmod 755 todoapp.sh

#Install Mysql

sudo apt update

sudo apt upgrade

sudo apt install mysql-server

#configurate mysql root password
sudo mysql -u root -e ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
sudo mysql -u root -e FLUSH PRIVILEGES;

# Install Node js

curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs


# Install Node dependencies

npm install


# Create database and tables

sudo mysql -u root --password="password" -e "CREATE DATABASE database_todolist;"
sudo mysql -u root --password="password" -D database_todolist < db.sql



# Run index.js file

node index


# Now the app is running in localhost:3000