$(document).ready(function() {
  /*This function returns a tweetable string*/
  function tweetSize(quote, author) {
    var tweet = "";
    var len = quote.length + author.length +2;
    
    if (len > 140) {
      tweet += quote.substring(0, 133 - author.length);
      tweet += "... -" + author;
    }
    else {
      tweet += quote + " -" + author;
    }
    return escape(tweet);
  }
  
  /*This function calls the API, gets the quote and metadata and updates the html*/
  function getQuote() {
    $("#getQuote").html("Loading...");
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data){
      var html = "<blockquote>" + data.quoteText;
      if (data.quoteAuthor != "") {
        html += "<br><br><footer>" + data.quoteAuthor + "</footer><br>" +
          "<a href='http://twitter.com/home?status=" +
          tweetSize(data.quoteText, data.quoteAuthor) +
          "'><i class='fa fa-twitter pull-left'></i><a>" +
          "<a href='http://www.facebook.com/sharer.php?u=" + data.quoteLink +
          "'><i class='fa fa-facebook pull-left'></i><a>" +
          "<a href='//en.wikipedia.org/wiki/" + data.quoteAuthor +
          "'><i class='fa fa-wikipedia-w pull-left'></i><a></blockquote>";
      }
      else {
        html += "<br><br><footer>Author Unknown</footer><br>" +
          "<a target='_blank' href='http://twitter.com/home?status=" +
          tweetSize(data.quoteText, "Author Unknown") +
          "'><i class='fa fa-twitter pull-left'></i><a>" +
          "<a target='_blank' href='http://www.facebook.com/sharer.php?u=" + data.quoteLink +
          "'><i class='fa fa-facebook pull-left'></i><a></blockquote>";
      }
      $(".message").html(html);
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
