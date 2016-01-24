# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty32"
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "private_network", ip: "192.168.33.11"
  config.vm.synced_folder "./", "/simple-blog"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    echo vagrant | sudo -S locale-gen UTF-8
    echo vagrant | sudo -S apt-get update
    echo vagrant | sudo -S apt-get install -y nginx
    echo vagrant | sudo -S apt-get install -y php5-cli
    echo vagrant | sudo -S apt-get install -y postgresql
    echo vagrant | sudo -S curl -LsS https://symfony.com/installer -o /usr/local/bin/symfony
    echo vagrant | sudo -S chmod a+x /usr/local/bin/symfony
    echo vagrant | sudo -S sed -i 's/;date.timezone =/date.timezone = "Europe\/Kiev"/g' /etc/php5/cli/php.ini 
  SHELL
end
