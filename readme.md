# XVideos Client - socks5
[![powered by Ghostery](https://img.shields.io/badge/ghostery-powered-blue?logo=ghostery)](https://github.com/ghostery/adblocker)

This is a wrapper for XVIDEOS, it can bypass regional restrictions by sending all its traffic through a randomly chosen socks5 proxy.

### Notice : There are always some risks associated with unknown proxies. Please do not log into your account. Or only use an account you can afford to lose in the worst case scenario.
I'm currently developing an alternative version of this project. Should it see the light of the day, it'll use TOR rather than SOCKS proxies.

# Features
- Portable - All your data stays in the XVideos Client directory, leaving less traces behind on the system it is being run on.
**All of the data, including session, cache and cookies is saved in the `'/xdata'` directory. Make sure you delete it before redistributing the program.**
  
- SOCKS5 - A list of proxies is feteched from [monosans/proxy-list](https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks5.txt) and a random proxy is chosen every time. 
- The client contains some __hidden XVideos proxy domains__ that are only accessible through this client.
  You can cycle through proxies by pressing __CTRL+SPACE__ if the page fails to load.
  
- A powerful AdBlocker, thanks to [ghostery/adblocker](https://github.com/ghostery/adblocker).
- A **search feature** which can be accessed by pressing __CTRL+S__.
  ~~Warning : ElectronJS is prone to WebRTC IP leaks, meaning you will end up leaking your real IP address if you visit certain websites.~~ (fixed)


## Getting Started -

Clone the repository.
 ```sh
git clone https://github.com/Cat-Ling/xvideos-client
cd ./xvideos-client
npm install
```
Now we can test out if everything works properly by running -
 ```sh
npm run start
 ```
 Now that we have got it working, let's **build** our apps.
 - For Windows only 
 ```sh
npm run windows-build
```
 - For Linux only 
 ```sh
npm run linux-build
```
- Create a zipped build for your current OS.
 ```sh
npm run make
```
I'm unable to provide Mac instructions as I don't have one to test it on.


## Keyboard Shortcuts

These are some keyboard shortcuts for ease of use :

|                |Shortcut Key                          |Note                         |
|----------------|-------------------------------|-----------------------------|
|Reload Page|`CTRL+R or F5`            |Reloads the page.            |
|Reload Ignoring Cache|`CTRL+F5 or CTRL+SHIFT+R`            |Reloads the page without cache.   
|Refresh Proxy          |`CTRL+SPACE`            |Changes proxy and reloads the page. Be patient as it might take a few seconds to reload.            |
|Search Window          |`CTRL+S`| Opens a search window which allows you to browse the internet or do quick searches.|
|Quit Application|`ESCAPE or CTRL+Q`            |For when you're about to get caught.            |
|Close Current Window |`CTRL+W`            |Useful when you've opened multiple windows.    
 |Show Available Shortcuts|`F1`            |Brings you here.   
|Go To The Previous Page|`CTRL+LEFT-ARROW`            |Goes Backward.   
|Go To The Next Page|`CTRL+RIGHT-ARROW`            |Goes Forward. Basically undoes Backward.   
#
<p align="center">Cat-Ling | License : GPL-3.</p>
