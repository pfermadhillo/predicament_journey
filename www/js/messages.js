if(LD === undefined) {
  var LD = {};
}

LD.Messages = {
    woodText:  "",
    woodTextPrefix:   "Need Wood: ",
    woodTextSuffix:   "/9",

    nothingText:  "",
    nothingTextPrefix:   "Nothing: ",
    nothingTextSuffix:   "/"+LD.Player.nothingTallyMax,

    movesText:  "",
    movesTextPrefix:   "Moves: ",

    levelText:  "",
    levelTextPrefix :   "Level: ",

    ticksText:  "",
    ticksTextPrefix :   "Distance: ",

    debugText:  "",
    debugTextPrefix :   "debug: ",

    timeText:  "",
    timeTextPrefix :   "Time: ",
    savedTime: 0,

    introTextMsg:   "Don't you think It's time we got "
                    +"\n\t started?   "
                    +"\n\t...Isn't time you WAKE UP!",
    introTextMsg2:   "Hey kid,"
                    +"\n\n\tI found you passed out at the gate, "
                    +"\nnot the best place for a nap even when there isn't "
                    +"\n4 feet of snow on the ground."
                    +"\n\n\tAnyway I went to get some supplies, "
                    +"\ntry to keep the fire going..."
                    +"\n\n\tShould be some wood around but don't go too far "
                    +"\nthe specters out there will kill you faster than the snow.",
    
    selectTextMsg:   "Select your Runner!",
    winloseTextMsg:   "",
    restartTextMsg:   "Click to restart!",

    gotSwordText: "There's a note it reads: \n\t\t\tHey kid I left you my old sword",

    winloseTexts: {
        zeroHP: "How am I going to get anything done \n\t if you're dead",
        nothingMaxed: "Thanks I'll take it from here",
        levelOneCleared: "Ah... The fire is nice \n\t and let's take a nap"
      },

    textDepth: 200,

    hpBarSize: {width:100,height:20},


    statsText: {}, 

    createStatsText: function(){
      var player = LD.Player.player;

      LD.Messages.statsText.blue = LD.Globals.game.add.text(80, 80, 
        LD.Player.stats.blue + ":" + LD.Player.statsMax.blue, 
        { align: 'right', fontSize: '48px', fill: '#00f' });
      LD.Messages.statsText.blue.setStroke('#000', 5);
      LD.Messages.statsText.blue.setZ( 2 );

      LD.Messages.statsText.yellow = LD.Globals.game.add.text(80, 80, 
        LD.Player.stats.yellow + ":" + LD.Player.statsMax.yellow, 
        { align: 'right', fontSize: '48px', fill: '#ff0' });
      LD.Messages.statsText.yellow.setStroke('#000', 5);
      LD.Messages.statsText.yellow.setZ( 2 );

      LD.Messages.statsText.red = LD.Globals.game.add.text(80, 80, 
        LD.Player.stats.red + ":" + LD.Player.statsMax.red, 
        { align: 'right', fontSize: '48px', fill: '#f00' });
      LD.Messages.statsText.red.setStroke('#000', 5);
      LD.Messages.statsText.red.setZ( 2 );
    },

    updateStatsText: function(){
      // LD.Messages.statsText.blue.setText(LD.Player.stats.blue + ":" + LD.Player.statsMax.blue);
      var stats = LD.Player.stats;
      var statsMax = LD.Player.statsMax;
      var player = LD.Player.player;
      var blue = {};
      var yellow = {};
      var red = {};
      if(LD.Messages.statsText && LD.Messages.statsText.blue){blue = LD.Messages.statsText.blue;}
      if(LD.Messages.statsText && LD.Messages.statsText.yellow){yellow = LD.Messages.statsText.yellow;}
      if(LD.Messages.statsText && LD.Messages.statsText.red){red = LD.Messages.statsText.red;}
      var backoutX = LD.Globals.gameWidth * 0.49;
      // var backoutY = LD.Globals.gameHeight * 0.4;
      var backoutY = {
        blue: LD.Globals.gameHeight * 0.45,
        yellow: LD.Globals.gameHeight * 0.35,
        red: LD.Globals.gameHeight * 0.25,
      };

      if(stats  && statsMax){
        if(blue && blue.text && statsMax.blue){
          console.log("updateStatsText(): ", blue, backoutX, backoutY);
          blue.setPosition(player.x - backoutX, player.y - backoutY.blue);
          blue.setText(stats.blue + ":" + statsMax.blue);
        }
        if(yellow && yellow.text && statsMax.yellow){
          console.log("updateStatsText(): ", yellow, backoutX, backoutY);
          yellow.setPosition(player.x - backoutX, player.y - backoutY.yellow);
          yellow.setText(stats.yellow + ":" + statsMax.yellow);
        }
        if(red && red.text && statsMax.red){
          console.log("updateStatsText(): ", red, backoutX, backoutY);
          red.setPosition(player.x - backoutX, player.y - backoutY.red);
          red.setText(stats.red + ":" + statsMax.red);
        }
      }
    },


    savedTimeFormatted: function(){
        return LD.Messages.msToTime(LD.Messages.savedTime);
    },

    msToTime: function(s) {

  // Pad to 2 or 3 digits, default is 2
      function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
      return pad(mins) + ':' + pad(secs) + '.' + pad(ms);
    }
};

