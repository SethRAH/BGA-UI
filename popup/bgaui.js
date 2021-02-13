
let toggles = document.querySelectorAll('input.switch-input');
let cookieVal = {
    theCrewCardCounter: true
}

function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
  }


for(var i = 0; i < toggles.length; i++){
    var cookieProp = toggles[i].getAttribute('data-setting');

    toggles[i].onchange = function(e){
        getActiveTab().then((tabs) => {
            var cookieProp = e.target.getAttribute('data-setting');
            var isChecked = e.target.checked;
            browser.tabs.sendMessage(tabs[0].id, {theCrewCounter: isChecked});

            cookieVal[cookieProp] = isChecked;
            browser.cookies.set({
                url: tabs[0].url,
                name: "bgaui",
                value: JSON.stringify(cookieVal)
            });
        });
    }
}

/* Report cookie changes to the console */

browser.cookies.onChanged.addListener((changeInfo) => {
    console.log(`Cookie changed:\n
                * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
                * Cause: ${changeInfo.cause}\n
                * Removed: ${changeInfo.removed}`);
  });