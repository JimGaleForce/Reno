# Welcome to Project Reno #

> Someone told me to come here... **What is this?**

Project Reno is a very lightweight javascript library for web developers which, by default, lights up numerous OS features when run as a Progressive Web App.

> What does that mean?

Web developers and sites can add a single js file. When their web site is seen from a web app (Hosted Web App, Progressive Web App) running on an OS, like Windows, some features will automatically light up. Some features include an app bar (sharing, pinning), live tile updates and hot linking directly to a page. Some coming-soon features include speech. 

The best part is, no content changes have to be done to the web site (other than the library inclusion and options). And, the developer can turn on or off features, as well as include specific overrides, from hiding the sharing icon to complete new app bar manually added to the site. The developer can dial up or down the whole experience.

Some OS features have been shown to increase engagement by 50%-100%!  This library allows a web developer to start implementing powerful OS features with little to no initial investment while still getting a great engagement return.

![](http://i.imgur.com/IeNZEKH.png)

> Ok, how to I start?

**Step #0:** First, you need a Progressive Web App pointed to your website. This is really easy, once you have the tools installed. Focusing on Windows, having Windows 10 and Visual Studio 2017, create a Hosted Web App and add your starting url as well as the securely accepted url pattern. Go here for more info: [http://preview.pwabuilder.com/generator](http://preview.pwabuilder.com/generator)

Next, in order to use Project Reno features, add a script tag to your master page (or all pages you want to light up). You can choose to host the files locally, or point to a cdn. The benefit of pointing to the latest on a cdn is that any new features and any bug fixes would be automatically referenced in your app. The benefit of downloading and including the library is not having an additional dependency, and locking in your features as-is.

**Step #1:**
Remote use: include this script:  
```
<script src="https://galeforce.azurewebsites.net/renoloader.js"> 
```

(NOTE: this is a preliminary host and will change by mid June-2017 to a final cdn location).

The 'loader' script checks if you are running on a supported OS (Windows 10), and then further loads reno.js and reno.css.

**Step #2 (optional):**
Specify which options to use / not-use, or override. (By default, certain features are turned on (AppBar with Sharing and Secondary Page Pinning)). However, if you wish to turn these off, or override the names, icons, or actual code executed in order to share/pin/etc, you can specify these options. This is what the majority of the documentation references.

Include a js file (i.e. appmap.js) for each page (or master page) with this format. 

(NOTE #1 : Place this before loading the renoloader.js).<br/>
(NOTE #2 : You can include this in the PWA as well, however, it is better to have this remote so that you can change it when needed without redeploying).

<pre>
window.AppMap = {
    id: 'RenoSample',
    logo: '#logo',
    abilities: {
        appBar: {
            keepDefaultCommands: true,
            commands: [
                {
                    id: 'PinCommand',
                    text: document.title
                },
                {
                    id: 'ShareCommand',
                    options: {
                        text: 'This is awesome! ' + document.location.href
                    }
                }
            ]
        },
    }
};
</pre>

The specific documentation goes into detail about these items, but briefly: <br/>
- 'logo': specifies which element qualifier holds the image logo of the app.<br/>
- 'abilities': what features to use from Reno.<br/>
- 'appBar > keepDefaultCommands': (true) keep the current pin and share commands, but specify overrides as follows. (false) means remove default commands so I can add all my own.<br/>
- 'appBar > commands (for 'PinCommand') > text': when pinning this deep link page, use this text on the tile.<br/>
- 'appBar > commands (for 'ShareCommand') > options > text': when sharing this page, use this text in the message.<br/>

There's many more options including specifying the code to execute for commands (like sharing) which override the default completely.  You only need to include what you want to override, if any. 

NOTE: If you use the remote location for grabbing renoloader or an appmap, you will need to add those urls to your content-uris in the App to allow loading of that javascript.

Once your Progressive Web App runs, and grabs the web site including the renoloader.js and optional AppMap, you should see the OS features light up.
<hr/>
**TL;DR:**

This is a lightweight javascript library that auto-adds OS-level features to an existing website.

Step 0: Have a (Windows) Progressive Web App pointing to your website.

Step 1: Add this loader file to your website:
```
<script src="https://galeforce.azurewebsites.net/renoloader.js"> 
```

Step 2: Optionally add an options json data (called AppMap), as shown above, to turn on/off or override features. 

More info about the AppMap located [here](AppMap.MD).