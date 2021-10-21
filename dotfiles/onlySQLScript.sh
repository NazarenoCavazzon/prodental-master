#!/bin/bash

clear
echo "Starting sql config..."

echo "Configuring sql data... 1/2"
sudo mysql prodental < tables.sql

echo "Poblating database... 2/2"
sudo mysql prodental < insert-testimonials.sql
sudo mysql prodental < insert-treatments.sql
sudo mysql prodental < insert-staff.sql

echo "Finished script."
sleep(1)
clear