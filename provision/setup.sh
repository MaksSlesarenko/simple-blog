#!/bin/bash

echo "Provisioning virtual machine..."

PASSWORD='12345678'
POSTGRE_VERSION=9.3

echo "Repository update..."
apt-get update > /dev/null

echo "Installing basic things..."
sudo locale-gen en_US en_US.UTF-8
apt-get install git python-software-properties build-essential libpq-dev -y > /dev/null

echo "Installing php5-cli and php5-fpm..."
apt-get install php5-cli php5-fpm php5-pgsql -y > /dev/null
sed -i 's/user = www-data/user = vagrant/g' /etc/php5/fpm/pool.d/www.conf
sed -i 's/group = www-data/group = vagrant/g' /etc/php5/fpm/pool.d/www.conf
sed -i 's@;date.timezone =@date.timezone = "Europe\/Kiev"@g' /etc/php5/cli/php.ini

echo "Installing nginx..."
apt-get install -y nginx > /dev/null

echo "Configuring nginx"
cp /var/www/blog/provision/config/nginx_vhost /etc/nginx/sites-available/nginx_vhost > /dev/null
ln -s /etc/nginx/sites-available/nginx_vhost /etc/nginx/sites-enabled/
rm -rf /etc/nginx/sites-available/default
service nginx restart > /dev/null

echo "Restart php5-fpm"
service php5-fpm restart

echo "Installing postgresql"
apt-get install -y postgresql=$POSTGRE_VERSION\* > /dev/null

echo "Configuring postgresql"
sudo -u postgres psql -c "CREATE ROLE root LOGIN UNENCRYPTED PASSWORD '$PASSWORD' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;"
sudo -u postgres psql -c "CREATE DATABASE blog"
sed -i 's@#listen_addresses@listen_addresses@' /etc/postgresql/$POSTGRE_VERSION/main/postgresql.conf

echo "Installing symfony cli..."
curl -LsS https://symfony.com/installer -o /usr/local/bin/symfony > /dev/null
chmod a+x /usr/local/bin/symfony

echo "Installing composer..."
curl -sS https://getcomposer.org/installer | php > /dev/null
mv composer.phar /usr/local/bin/composer

echo "Installing composer packages..."
cd /var/www/blog
composer install > /dev/null
