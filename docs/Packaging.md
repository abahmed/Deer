# Packaging

Now you can build and distribute Deer easily and generate binaries for various platforms.


## For Linux
Currently, Deer supports deb, rpm and zip packages
To generate the packages use, the one you need according to your distributions.
``` bash
npm run release:linux:deb
npm run release:linux:rpm
npm run release:linux:zip
```


## For Mac OS
Currently, Deer supports dmg package
To generate the packages, use the one you need according to your distributions.
``` bash
npm run release:mac
```


## For Windows
Currently, Deer supports ia32 and x64 architectures.
To generate the packages, use the one you need according to your architecture.
``` bash
npm run release:win32
npm run release:win64
```
