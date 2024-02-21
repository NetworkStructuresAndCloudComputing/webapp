#!/bin/bash

# Install prerequisites
sudo yum -y install curl

# Install Node.js 18.x
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum -y install nodejs

# Install MySQL server
sudo yum -y install mysql-server

# Enable MySQL service to start on boot
sudo systemctl enable mysqld

# Clean up yum cache
sudo yum clean all

