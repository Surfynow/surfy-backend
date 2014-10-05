$(document).ready(function(){
	var Url = "http://localhost:3000"
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    	var currentUrl = encodeURIComponent(tabs[0].url)
    	$.get(Url + "/rating/" + currentUrl).done(function(data){
    		$("#currentUrl").html(data)
			console.log(data)
    	});
	});
})