$(document).ready(function(){
	console.log("Content SCRIPT LOADED")
	var Url = "http://localhost:3000"
	var currentPageUrl = encodeURIComponent(window.location.origin)
    	$.get(Url + "/comments/"+ currentPageUrl).done(function(data){
    	    var parentDiv = $("<div/>").addClass("parentDiv")
    	    parentDiv.html("THIS IS GIONG TO BE MY DAAT")
    		$("body").append(parentDiv)
    	});

})