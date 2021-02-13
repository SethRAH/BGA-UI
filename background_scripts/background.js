
function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
  }

function load(){
    getActiveTab().then((tabs) => {
        // get any previously set cookie for the current tab 
        var gettingCookies = browser.cookies.get({
          url: tabs[0].url,
          name: "bgaui"
        });
        gettingCookies.then((cookie) => {
            if(cookie){
                var cookieVal = JSON.parse(cookie.value);
                browser.tabs.sendMessage(tabs[0].id, cookieVal);
            }
        });
    });
}


// update when the tab is updated
browser.tabs.onUpdated.addListener(load);
// update when the tab is activated
browser.tabs.onActivated.addListener(load);
