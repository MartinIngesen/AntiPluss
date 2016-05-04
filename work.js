setTimeout(function(){
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

},3000);

function appendData(data){
  $('<div class="am-article-body am-txt--body" itemprop="articleBody"></div>').insertAfter(".am-article-summary");

  $('.am-article-body').append(data.body);
}
