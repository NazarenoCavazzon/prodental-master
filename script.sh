#!/bin/bash

echo "Starting setup script... 1/10"
git clone https://github.com/NazarenoCavazzon/prodental-master
git clone https://gitlab.com/mahumada/dentalprodotfiles.git

echo "Changing project database config.js 2/10"
sudo rm ./prodental-master/src/database/config/config.js
sudo mv ./dbConfig.js ./prodental-master/src/database/config/

echo "Installing mysql... 3/10"
sudo apt -y install mysql-server
sudo mysql < createDB.sql

echo "Configuring sql data... 4/10"
sudo mysql prodental < tables.sql

echo "Poblating database... 5/10"
sudo mysql prodental < insert-testimonials.sql
sudo mysql prodental < insert-treatments.sql
sudo mysql prodental < insert-staff.sql

echo "Installing NodeJS & modules... 6/10"
sudo apt -y install nodejs
cd ./prodental-master/
npm install
sudo npm i --save-dev nodemon -g

echo "Installing and setup pm2 7/10"
sudo npm i pm2 -g
sudo pm2 start app
sudo pm2 startup ubuntu

echo "Setting up firewall 8/10"
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)

echo "Setting up Nginx 9/10"
sudo apt install nginx
sudo rm -rf /etc/nginx/sites-available/default
sudo mv default /etc/nginx/sites-available/

echo "Finished setup script! 10/10"
