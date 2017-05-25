# AppMap options #

Adding an (optional) AppMap json data item allows you to turn on/off or override features in Project Reno.

**Skeleton (should be loaded before renoloader.js):**

```
window.AppMap = {
};
```

**Basics:**

```
window.AppMap = {
   id: '<name of the app>', 
   debug: true // enables console.logging 
};
```

Note that many values can be of different types. Generally, this is the pattern:

true  - include the default behavior<br/>
false - turn off the feature/info<br/>
{}    - include an empty container (like appBar with no commands)<br/>
'#elementName' - get the text from an element value<br/>
'.className'   - get the text from the first class element<br/>
() => { return document.querySelector('.myClass') || document.title; }<br/>


**Abilities: AppBar**

The AppBar is a toolbar at the bottom of the app which includes commands such as pin, unpin and sharing.

**Turn off the AppBar:**
```
window.AppMap = {
   abilities: {
      appBar: false  // turns off the appBar (on by default)
   }
};
```

**Add a new command to the AppBar:**
```
window.AppMap = {
   abilities: {
      appBar: {
         keepDefaultCommands: true, // if included, preserves the default commands, overriden by id
         commands: [ 
            {
               id: 'TotallyNewCommand',
               icon: '\ue76d', 
               show: (command, appBar, reno) => { return true; } // true, false or a function to show/hide              
            }
         ]
      }
   }
};
```

**Override behavior on the sharing command:**
```
window.AppMap = {
   abilities: {
      appBar: {
         keepDefaultCommands: true, // if included, preserves the default commands, overriden by id
         commands: [ 
            {
               id: 'ShareCommand',
               command: (sender, command, appBar, app) => { DoThisMethod(); }
            }
         ]
      }
   }
};
```

**Override data for the sharing command:**
```
window.AppMap = {
   abilities: {
      appBar: {
         keepDefaultCommands: true, // if included, preserves the default commands, overriden by id
         commands: [ 
            {
               id: 'ShareCommand',
               options: {
                    ondatarequested: (e, options) => {
                        e.request.data.properties.title = Utils.evalNow(options.title, document.URL);
                        e.request.data.setText(Utils.evalNow(options.text, document.URL));
                    }
               }
            }
         ]
      }
   }
};
```