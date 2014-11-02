$(document).ready(function () {

    var Url = "http://localhost:3000";
    console.log("Content script is loaded");
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            var currentPageUrl = encodeURIComponent(window.location.origin);
            console.log(currentPageUrl + Math.random());
            var surfy = $("#surfy");

            if(surfy.length === 0){
                $.get(Url + "/comments/" + currentPageUrl).done(function (data) {
                    var parentDiv = $("<div/>", {id: "surfy"}).addClass("parentDiv");
                    parentDiv.html(data.link);
                    $.each(data.comments, function (index, comment) {
                        var commenterDiv = $("<div/>").addClass("commenter");
                        commenterDiv.html(comment.author);

                        var commentDiv = $("<div/>").addClass("comment");
                        commentDiv.html(comment.comment);

                        parentDiv.append(commenterDiv);
                        parentDiv.append(commentDiv);
                    });
                    $("body").append(parentDiv);
                    sendResponse({"commentsLoaded": true});
                });
            }
            else if (surfy.is(':visible')) {
                $("#surfy").hide();
            } else {
                $("#surfy").show();
            }

        });
});