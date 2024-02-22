#!/bin/bash

# Install prerequisites
sudo yum -y install curl

# Install Node.js 18.x
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum -y install nodejs

# Install MySQL server
sudo yum -y install mysql-server

sudo systemctl enable --now mysqld

sudo mysql --connect-expired-password -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '2108786Z@kir';"

sudo yum -y install unzip

