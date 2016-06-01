
  var channelList = ["freecodecamp",
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "brunofin", //deactivated - test
    "comster404", //deactivated - test
    "404notfound929" //user does not exist - test
  ];
  var channels = [];
  var embedVideoPre = '<iframe src="http://player.twitch.tv/?channel=';
  var embedVideoPost = '" frameborder="0" scrolling="no" height="378" width="620"></iframe>';
  var embedChatPre = '<iframe src="http://www.twitch.tv/';
  var embedChatPost = '/chat?popout=" frameborder="0" scrolling="yes" height="500" width="350"></iframe>';
  var apiURL = "https://api.twitch.tv/kraken";
  var apiCB = "?callback=?";

  function channel(data) {
    if (data.error == 'Unprocessable Entity') this.stream = 'inactive';
    else if (data.error == 'Not Found') this.stream = 'not found';
    else if (data.stream) {
      this.stream = 'online';
      this.name = data.stream.channel.name;
      this.displayName = data.stream.channel.display_name;
      this.logo = data.stream.channel.logo;
      this.game = data.stream.game;
      this.status = data.stream.channel.status;
      this.url = data.stream.channel.url;
      this.isPlaylist = data.stream.is_playlist;
      this.preview = data.stream.preview.large;
      this.viewers = data.stream.viewers;
    } else {
      this.stream = 'offline';
      this.name = data.name;
      this.displayName = data.display_name;
      this.logo = data.logo;
      this.game = data.game;
      this.status = data.status;
      this.url = data.url;
    }
  }

  function populateChannel(index) {
    var output = '';

    if (channels[index].stream == 'offline') {
      output +=
        "<a class='channel' href='javascript:;'>" +
          "<li id=" + channelList[index] + " class='linkOff offline'>" +
          "<div class='col-sm-2 col-xs-12 vCenter'>" +
            "<img class='logo' src='" + channels[index].logo + "' />" +
          "</div>" +
          "<div class='col-sm-5 col-xs-12 vCenter'>" +
            "<div class='col-xs-6'>" +
              "<h4>" + channels[index].displayName + "</h4>" +
              "<p>channel offline</p>" +
            "</div>" +
            "<div class='col-xs-6'>" +
              "<h4>Last Played</h4>" +
              "<p>" + channels[index].game + "</p>" +
            "</div>" +
            "<div class='clearfix visible-xs'></div>" +
          "</div>" +
          "<div class='col-sm-4 col-xs-11 vCenter preview'>" +
            "<p>" + channels[index].status + "</p>" +
          "</div>" +
          "<div class='col-xs-1 vCenter'>" +
            "<button class='btn'><i class='fa fa-times-circle'></i></button>" +
          "</div>" +
        "</li></a>";
      
      $("#outputOffline").prepend(output);
      
      setTimeout(function() {
        $('#' + channelList[index]).parent().fadeIn('slow');
      }, 10);
    }
    else if (channels[index].stream == 'online') {
      output +=
        "<a class='channel' href='javascript:;'>" +
          "<li id='" + channelList[index] + "' class='streamOff online'>" +
            "<div class='col-sm-2 col-xs-12 vCenter'>" +
              "<img class='logo' src='" + channels[index].logo + "' />" +
            "</div>" +
            "<div class='col-sm-5 col-xs-12 vCenter'>" +
              "<div class='col-xs-6'>" +
                "<h4>" + channels[index].displayName + "</h4>" +
                "<p>channel online</p>" +
              "</div>" +
              "<div class='col-xs-6'>" +
                "<h4>Playing</h4>" +
                "<p>" + channels[index].game + "</p>" +
              "</div>" +
              "<div class='clearfix visible-xs'></div>" +
              "<p>" + channels[index].status + "</p>" +
            "</div>" +
            "<img class='preview img-responsive col-sm-4 col-xs-11 vCenter' src='" + channels[index].preview + "' />" +
            "<div class='col-xs-1 vCenter'>" +
              "<button class='btn'><i class='fa fa-times-circle'></i></button>" +
            "</div>" +
        "</li></a>";
      
      $("#outputOnline").prepend(output);
      
      setTimeout(function() {
        $('#' + channelList[index]).parent().fadeIn('slow');
      }, 10);
    }
    else if (channels[index].stream == 'inactive') {
      output +=
        "<a class='channel'><li  id='" + channelList[index] + "'class='inactive'>" +
          "<div class='col-sm-2 col-xs-12 vCenter'></div>" +
            "<div class='col-sm-5 col-xs-12 vCenter'>" +
              "<h4>" + channelList[index] + " - </h4><p>no longer active!</p>" +
            "<div class='clearfix visible-xs'></div>" +
            "</div>" +
          "<div class='col-sm-4 col-xs-11 vCenter preview'></div>" +
          "<div class='col-xs-1 vCenter'>" +
            "<button class='btn'><i class='fa fa-times-circle'></i></button>" +
          "</div>" +
        "</li></a>";
      
      $("#outputOther").prepend(output);
      
      setTimeout(function() {
        $('#' + channelList[index]).parent().fadeIn('slow');
      }, 10);
    }
    else {
      output +=
        "<a class='channel'><li id='" + channelList[index] + "' class='inactive'>" +
          "<div class='col-sm-2 col-xs-12 vCenter'></div>" +
            "<div class='col-sm-5 col-xs-12 vCenter'>" +
              "<h4>" + channelList[index] + " - </h4><p>channel not found!</p>" +
            "<div class='clearfix visible-xs'></div>" +
            "</div>" +
          "<div class='col-sm-4 col-xs-11 vCenter preview'></div>" +
          "<div class='col-xs-1 vCenter'>" +
            "<button class='btn'><i class='fa fa-times-circle'></i></button>" +
          "</div>" +
        "</li></a>";
      
      $("#outputOther").prepend(output);
      
      setTimeout(function() {
        $('#' + channelList[index]).parent().fadeIn('slow');
      }, 10);
    }
  }

  function addChannel(index) {
    $.getJSON(apiURL + "/streams/" + channelList[index] + apiCB, function(data) {
      if (data.stream || data.error) {
        channels[index] = new channel(data);
        populateChannel(index);
      } else $.getJSON(apiURL + "/channels/" + channelList[index] + apiCB, function(data) {
        channels[index] = new channel(data);
        populateChannel(index);
      });
    });
  }
  
  function getStream(id) {
    return '<div class="stream"><iframe src="https://player.twitch.tv/?channel=' + id + '" frameborder="0" scrolling="no" height="378" width="620"></iframe><br><a href="https://www.twitch.tv/' + id + '" target="_blank">Watch live and chat on twitch.tv</a><div>';
  }
  
  function getLink(id) {
    return '<div class="twitchLink"><a href="https://www.twitch.tv/' + id + '"  target="_blank">Check out this channel on twitch.tv</a><div>';
  }

  function buildInitial() {
    var len = channelList.length;
    for (var i = 0; i < len; i++) addChannel(i);
  }

  $("#refresh").on("click", function() { //embed video and chat
    $("#output *").html("");
    channels = [];
    buildInitial();
    $("#refresh").blur();
  });
  
  $("#userChannel").keyup(function(event) {
    if (event.keyCode == 13) { //checks to see if the key pressed was enter
      $("#addChannel").click(); //if so, "call" the search button function
    }
  });
  
  $("#addChannel").on("click", function() {
    channelList.unshift($("#userChannel").val());
    addChannel(0);
    $("#userChannel").val("")
    $("#addChannel").blur();
  });
  
  $('#outputOnline').on('click', 'a li.streamOff', function() {
    thisObj = $(this);
    thisObj.append(getStream(thisObj.attr('id')));
    thisObj.removeClass('streamOff');
    thisObj.addClass('streamOn');
    function fadeThisIn(fadeObj) {
      fadeObj.children('div:last').fadeIn();
    }
    setTimeout(fadeThisIn(thisObj), 10);
    $(this).parent().blur();
  });
  
  $('#outputOnline').on('click', 'a li.streamOn', function() {
    $(this).children('div:last').fadeOut(function(){
      $(this).children('div:last').remove();
    });
    $(this).removeClass('streamOn');
    $(this).addClass('streamOff');
    $(this).parent().blur();
  });
  
  $('#outputOffline').on('click', 'a li.linkOff', function() {
    thisObj = $(this);
    thisObj.append(getLink(thisObj.attr('id')));
    thisObj.removeClass('linkOff');
    thisObj.addClass('linkOn');
    function fadeThisIn(fadeObj) {
      fadeObj.children('div:last').fadeIn();
    }
    setTimeout(fadeThisIn(thisObj), 10);
    $(this).blur();
  });
  
  $('#outputOffline').on('click', 'a li.linkOn', function() {
    $(this).children('div:last').fadeOut(function(){
      $(this).children('div:last').remove();
    });
    $(this).removeClass('linkOn');
    $(this).addClass('linkOff');
    $(this).blur();
  });
  
  $('ul').on('click', 'li div button', function(event) {
    event.stopPropagation();
    var id = $(this).parent().parent().attr('id');
    channelList = $.grep(channelList, function(value) {
      return value != id;
    });
    $(this).parents('.channel').fadeOut(function(){
      $(this).parents('.channel').remove();
    });
    $(this).blur();
  });

  
  /* DEBUG MODE ONLY
  $("#reset").on("click", function() {//debug mode only
    $("#output *").html("");
    channelList = ["freecodecamp",
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "brunofin", //deactivated - test
    "comster404", //deactivated - test
    "404notfound929"]; //user does not exist - test
  });
  
  $("#test").on("click", function() { //debug mode only
    buildInitial();
  });*/

$(document).ready(function() {
  buildInitial();
});