$(document).ready(function() {
  /*This function calls the API, gets the quote and metadata and updates the html*/
  function getQuote() {
    $("#getQuote").html("Loading...");
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data){
      var html = "<blockquote>" + data.quoteText;
      if (data.quoteAuthor !="") {
        html += "<br><br><footer>" + data.quoteAuthor + "</footer></blockquote>";
      }
      else {
        html += "<br><br><footer>Author Unknown</footer></blockquote>";
      }
      $(".message").html(html)
      $("#getQuote").html("New Quote");
      $("#quoteLink").attr("href", data.quoteLink);
      //http://twitter.com/home?status=Today is the tomorrow we worried about yesterday.  http://en.forismatic.com/6750845f01/ @forismatic
    });
  }
  
  /*Initialize*/
  getQuote(); //comment out when editing to reduce API calls
  
  /*the following calls getQuote() when button is pressed*/
  $("#getQuote").on("click", function(){
    getQuote();
  });
});