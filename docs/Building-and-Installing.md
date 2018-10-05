### Build prerequisites

You need to have following tools installed on your computer
+ [Git](https://git-scm.com)
+ [Node.js](https://nodejs.org/en/download/)
+ [npm](https://www.npmjs.com/) (Usually, it's installed along with Node.js)

In the next section, we explain how to install them correctly on each platform.

***

### Unix/Linux

#### Debian based distributions (Debian / Ubuntu / Linux Mint / elementary OS)
In your terminal
``` bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential git
```

#### Enterprise based distributions (Red Hat® / CentOS / CloudLinux / Fedora)
In your terminal
``` bash
curl -sL https://rpm.nodesource.com/setup_8.x | sudo -E bash -
sudo yum install -y nodejs gcc-c++ make git
```

***

### Windows
#### Git installing
1. Open [Git Downloads page](https://git-scm.com/downloads)
2. Download the Windows Installer(.exe)
3. Run the downloaded _Git-v.exe_ Installer

#### Node.js and npm installing 
1. Open [Node.js Downloads page](https://nodejs.org/en/download/)
2. Download the Windows Installer(.msi)
3. Run the downloaded _Node-v.msi_ Installer

***

### Mac OS X
1. Open [Node.js Downloads page](https://nodejs.org/en/download/)
2. Download the macOS Installer(.pkg)
3. Run the downloaded _Node-v.pkg_ Installer

***

### Getting the source
In your terminal
``` bash
# Clone Deer's repository
git clone https://github.com/abahmed/Deer
```

***

### Installing dependencies and running Deer
In your terminal
``` bash
# Go into Deer's repository
cd Deer

# Install dependencies
npm install

# build Deer
npm run build

# Run Deer
npm run start
```