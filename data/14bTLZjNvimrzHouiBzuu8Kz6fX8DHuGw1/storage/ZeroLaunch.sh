# ZeroLaunch.sh
# An automated process to turn a VPS into a Zeronet Proxy

# User Variables
UIport=80
UIpassword=MYPASSWORDD

# Display Colors for script output
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
NC='\033[0m' # No Color

# Check if this is a first run instance
istorup=$(echo 'PROTOCOLINFO' | nc 127.0.0.1 9051 | tail -1 | awk '{ print $2 }')

# Check if this is a first run instance or second for execution
if [[ $istorup == *"OK"* ]];then
	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nLAUNCHING ZERONET in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1
    cd ~/ZeroNet-master
	nohup ./zeronet.py --ui_ip "*" --ui_port "$UIport" --ui_password "$UIpassword"
else
	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nPREFORMING FIRST RUN UPGRADES in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1

    # Install base Updates from fresh VPS
	apt update
	apt -y upgrade

	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nINSTALLING APT-TRANSPORT-HTTPS in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1
	# Install https Transports
	apt -y install apt-transport-https

	# Get the name of the current os codename
	mycodename=$(lsb_release -c | awk '{ print $2 }')
	mycurrentuser=$(sudo who | awk '{ print $1 }')

	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nADDING SOURCES TO sources.list in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1
	# Add Tor Sources to sources.list
	sed -i '$a #' /etc/apt/sources.list;
	sed -i '$a # The Onion Router Sources' /etc/apt/sources.list
	sed -i '$a deb https://deb.torproject.org/torproject.org osCODENAME main' /etc/apt/sources.list
	sed -i '$a deb-src https://deb.torproject.org/torproject.org osCODENAME main' /etc/apt/sources.list
	sed -i '$a deb https://deb.torproject.org/torproject.org tor-nightly-master-osCODENAME main' /etc/apt/sources.list
	sed -i '$a deb-src https://deb.torproject.org/torproject.org tor-nightly-master-osCODENAME main' /etc/apt/sources.list
	sed -i "s|osCODENAME|$mycodename|g" /etc/apt/sources.list

	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nINSTALLING GNUPG2 in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1
	# Install GNUPG2
	apt-get -y install gnupg2

	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nADDING GPG Keys in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1
	# Add the GPG Key
	sleep 10
	gpg2 --recv A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89;sleep 1
	gpg2 --recv A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89;sleep 1
	gpg2 --recv A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89;sleep 1
	gpg2 --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -

	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nINSTALLING LATEST TOR in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1
	# Update and then install Tor
	apt update
	apt -y install tor deb.torproject.org-keyring

	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nPREFORMING TOR SETTINGS in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1
	#Prepare TOR for Zeronet
	sed -i "s|#ControlPort|ControlPort|g" /etc/tor/torrc
	sed -i "s|#CookieAuthentication|CookieAuthentication|g" /etc/tor/torrc
	sudo usermod -a -G debian-tor "$mycurrentuser"

	#Cleanup unneeded variables
	unset mycodename
	unset mycurrentuser

	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nINSTALLING & PREPARING ZERONET in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1
	#Install Zeronet
	sudo apt-get update
	sudo apt-get -y install msgpack-python python-gevent
	sudo apt-get -y install python-pip
	sudo pip install msgpack --upgrade
	wget https://github.com/HelloZeroNet/ZeroNet/archive/master.tar.gz
	tar xvpfz master.tar.gz
	mv ~/ZeroNet-master/plugins/disabled-UiPassword ~/ZeroNet-master/plugins/UiPassword
	mv ~/ZeroNet-master/plugins/disabled-Bootstrapper ~/ZeroNet-master/plugins/Bootstrapper

	sleep 1;clear
	printf "${BLUE}\n============================================."
	printf "${YELLOW}\nRESTARTING VPS TO PREP TOR in 1 sec...."
	printf "${BLUE}\n============================================."
	sleep 1
	# reboot to enable TOR
	sudo reboot
fi
