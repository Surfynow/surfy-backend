function showExtension(tabId, changeInfo, tab) {
	console.log('Page Shown')
    chrome.pageAction.show(tabId);
    var Url = "http://localhost:3000"
    chrome.pageAction.onClicked.addListener(function(){
    	chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    		var currentUrl = encodeURIComponent(tabs[0].url)
    		$.get(Url + "/rating/" + currentUrl).done(function(data){
				console.log(data)
	    	});
		});
    });
};
console.log('Starting Extension')
chrome.tabs.onUpdated.addListener(showExtension);