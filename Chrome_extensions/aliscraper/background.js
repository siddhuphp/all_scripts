console.log("Background script running");
console.log("below script will run only if u remove the default_popup.thml");
chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(){
    console.log("button Clicked");
}