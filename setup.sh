#!/bin/bash

echo "Provisioning virtual machine..."

ROOT_DIR=/home/vagrant/projects/blog
POSTGRE_VERSION=9.3
DB_NAME='blog'
DB_USER='root'
DB_PORT='5432'
DB_PASSWORD='12345678'

echo "Repository update..."
echo vagrant | sudo -S apt-get update > /dev/null

echo "Installing basic things..."
echo vagrant | sudo -S apt-get install git python-software-properties build-essential libpq-dev -y > /dev/null
echo vagrant | sudo -S touch /var/lib/cloud/instance/locale-check.skip
echo vagrant | sudo -S locale-gen en_US en_US.UTF-8 > /dev/null
echo 'export LC_CTYPE=en_US.UTF-8' >> ~/.bashrc
echo 'export LC_ALL=en_US.UTF-8' >> ~/.bashrc
source ~/.bashrc

echo "Installing php5"
echo vagrant | sudo -S apt-get install php5-cli php5-fpm php5-pgsql php5-intl -y > /dev/null
echo vagrant | sudo -S sed -i 's@user = www-data@user = vagrant@g' /etc/php5/fpm/pool.d/www.conf
echo vagrant | sudo -S sed -i 's@group = www-data@group = vagrant@g' /etc/php5/fpm/pool.d/www.conf
echo vagrant | sudo -S sed -i 's@;date.timezone =@date.timezone = "Europe\/Kiev"@g' /etc/php5/cli/php.ini
echo vagrant | sudo -S service php5-fpm restart > /dev/null

echo "Installing nginx..."
echo vagrant | sudo -S apt-get install -y nginx > /dev/null
echo vagrant | sudo -S cp $ROOT_DIR/nginx_vhost.conf /etc/nginx/sites-available/nginx_vhost > /dev/null
echo vagrant | sudo -S ln -s /etc/nginx/sites-available/nginx_vhost /etc/nginx/sites-enabled/
echo vagrant | sudo -S rm -rf /etc/nginx/sites-available/default
echo vagrant | sudo -S service nginx restart > /dev/null

echo "Installing postgresql"
echo vagrant | sudo -S apt-get install -y postgresql=$POSTGRE_VERSION\* > /dev/null
echo vagrant | sudo -S -u postgres psql -c "CREATE ROLE $DB_USER LOGIN UNENCRYPTED PASSWORD '$DB_PASSWORD' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;" > /dev/null
echo vagrant | sudo -S -u postgres psql -c "CREATE DATABASE $DB_NAME" > /dev/null
echo vagrant | sudo -S sed -i 's@#listen_addresses@listen_addresses@' /etc/postgresql/$POSTGRE_VERSION/main/postgresql.conf

echo "Installing symfony cli..."
echo vagrant | sudo -S curl -LsS https://symfony.com/installer -o /usr/local/bin/symfony > /dev/null
echo vagrant | sudo -S chmod a+x /usr/local/bin/symfony

echo "Installing composer..."
curl -sS https://getcomposer.org/installer | php > /dev/null
echo vagrant | sudo -S mv composer.phar /usr/local/bin/composer

echo "Installing composer packages..."
cd $ROOT_DIR
composer install


echo "Configuring symfony"
cp $ROOT_DIR/app/config/parameters.yml.dist $ROOT_DIR/app/config/parameters.yml

sed -i "s@database_port:.*@database_port: $DB_PORT@" $ROOT_DIR/app/config/parameters.yml
sed -i "s@database_name:.*@database_name: $DB_NAME@" $ROOT_DIR/app/config/parameters.yml
sed -i "s@database_password:.*@database_password: $DB_PASSWORD@" $ROOT_DIR/app/config/parameters.yml
sed -i "s@database_user:.*@database_user: $DB_USER@" $ROOT_DIR/app/config/parameters.yml

bin/console doctrine:schema:update --force
bin/console doctrine:fixtures:load
bin/console fos:user:create admin dj@khaled.com thekeytosuccess
bin/console fos:user:activate admin
bin/console fos:user:promote admin ROLE_ADMIN
bin/console assets:install
