let values = {};
let newContract = "http://localhost:81/public/contracts/new/";

browser.tabs.executeScript(null, {
  file: '/content_scripts/variables.js'
});

function handleMessage(request, sender, sendResponse) {
	values.dni = request.dni;
	initializeTab();
}

function initializeTab() {
	browser.tabs.create({url: newContract}).then(() => {
	  browser.tabs.executeScript(null, {
	    file: '/content_scripts/clipboard.js'
	  }).then(messageContent)
			.catch(reportError);
	}).catch(error => console.error(`Could not create new tab: ${error}`));
}

function messageContent() {
  const gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
    	"dni": values.dni
    });
  	window.close();
  });
}

function reportError(error) {
  console.error(`Could not inject content script: ${error}`);
}

browser.runtime.onMessage.addListener(handleMessage);