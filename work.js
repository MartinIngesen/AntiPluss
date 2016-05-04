window.onload = function () {
    if (document.getElementById("aid-overlay") != null && document.getElementsByClassName("am-article-summary") != null) {
        waitForElement('.am-gridComp-body', function () {
            $('.aid-background-blur').addClass("aid-background").removeClass("aid-background-blur");
            $('#aid-overlay').remove();
            $('.aid-large-center').remove();

            var url = document.location.href;
            var split = url.split('/');
            var id = split[split.length - 1];

            $.get('http://bed.api.no/api/acpcomposer/v1.1/content/' + id)
                .done(function (data) {
                    appendData(data);
                })
                .fail(function () {
                    console.log("Could not load API");
                });
        });
    }

};

function appendData(data) {
    $('<div class="am-article-body am-txt--body" itemprop="articleBody"></div>').insertAfter(".am-article-summary");
    $('.am-article-body').append(data.body);
}

var n = 0;
function waitForElement(elementPath, callBack) {
    window.setTimeout(function () {
        n++;
        if ($(elementPath).length) {
            callBack(elementPath, $(elementPath));
        } else {
            if (n < 20) {
                waitForElement(elementPath, callBack);
            } else{
                console.log("AntiPluss ventet for lenge på artikkelen.")
            }
        }
    }, 500)
}