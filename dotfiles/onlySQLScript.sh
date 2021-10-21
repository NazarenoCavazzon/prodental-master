#!/bin/bash

clear
echo "Starting sql config..."

echo "Creating database... 1/3"
sudo mysql < createDB.sql

echo "Creating tables in db... 2/3"
sudo mysql prodental < tables.sql

echo "Poblating database... 3/3"
sudo mysql prodental < insert-testimonials.sql
sudo mysql prodental < insert-treatments.sql
sudo mysql prodental < insert-staff.sql

echo "Finished script."
sleep(1)
clear