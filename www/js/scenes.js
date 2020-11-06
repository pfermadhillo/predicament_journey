if(LD === undefined) {
  var LD = {};
}

LD.Scenes = {};


LD.Scenes.Intro = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro ()
    {
        Phaser.Scene.call(this, { key: 'intro' });
    },

    init: function (data)
    {
        // console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;

        thisGame = this;
        LD.Globals.game = this;
        // LD.Globals.initKeys(this);
    },

    preload: function ()
    {
        this.load.image('black_center', 'img/assets/bg.png');

        
        LD.Sounds.preload(this);


    },

    create: function ()
    {

        LD.Sounds.create(this);

    	var black_center = this.add.sprite(0,0, 'black_center');
	    black_center.setDisplayOrigin(0);

        LD.Messages.introText = this.add.text(160, 80, 
                                    LD.Messages.introTextMsg , 
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.introText.setStroke('#000', 5); 
        LD.Messages.introText.setX( (LD.Globals.gameWidth - LD.Messages.introText.width)/2 ); 

        this.input.once('pointerdown', function () {
            // LD.Sounds.myPlay('emptySound');

            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('intro2')}, 
                                                [], this); 
        }, this);
    },

    update: function () {
        // if(LD.Sounds.emptySound.isPlaying){
        //     console.log("intro audio loaded!");
        //     var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
        //                                         function(){this.scene.start('intro2')}, 
        //                                         [], this); 
        // }
    }

});



LD.Scenes.Intro2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro2 ()
    {
        Phaser.Scene.call(this, { key: 'intro2' });
    },

    init: function (data)
    {
        // console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;

        thisGame = this;
        LD.Globals.game = this;
        // LD.Globals.initKeys(this);
    },

    preload: function ()
    {
        // this.load.image('fireplace', 'img/assets/fireplace.png');
    },

    create: function ()
    {


        // var fireplace = this.add.sprite(0,0, 'fireplace');
        // fireplace.setDisplayOrigin(0);

        LD.Messages.introText2 = this.add.text(160, 80, 
                                    LD.Messages.introTextMsg2 , 
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.introText2.setStroke('#000', 5); 
        LD.Messages.introText2.setX( (LD.Globals.gameWidth - LD.Messages.introText2.width)/2 ); 

        this.input.once('pointerdown', function () {
            // LD.Sounds.myStop('emptySound');
            // LD.Sounds.myPlay('emptySound');

            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('play')}, 
                                                [], this); 
        }, this);

    },

    update: function () {
        // if(LD.Sounds.emptySound.isPlaying){
        //     console.log("intro2 audio loaded!");
        //     var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
        //                                         function(){this.scene.start('play')}, 
        //                                         [], this); 
        // }
    }

});













LD.Scenes.WinLose = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WinLose ()
    {
        Phaser.Scene.call(this, { key: 'winlose' });
    },

    init: function (data)
    {
        this.inText = data.text;
        this.inImg = data.img;
    },

    preload: function ()
    {
	    // this.load.image('teal_border', 'img/backgrounds_teal_border.png');
	    this.load.image('show_image', 'img/assets/'+this.inImg+'.png');

    },

    create: function ()
    {
    	// var teal_border = this.add.image(0, 0, 'teal_border');
	    // teal_border.setDisplayOrigin(0);
        LD.Sounds.emptySound.play();


    	var black_center = this.add.sprite(0,0, 'show_image').setInteractive();
	    black_center.setDisplayOrigin(0);

        // console.log("seconds ",LD.Messages.savedTimeFormatted());
        // LD.Messages.timeText = this.add.text(40, LD.Globals.vertOneThird*2.8, 
        //                             LD.Messages.timeTextPrefix + LD.Messages.savedTimeFormatted() , 
        //                             { fontFamily: 'Anton', fontSize: '36px', fill: '#fff' });
        // LD.Messages.timeText.setStroke('#000', 5);        


        var specificMessage = this.inText;
        // var specificMessage = "you lost bruh";
		var winloseText = this.add.text(LD.Globals.horizontalOffset, 80, 
	    	LD.Messages.winloseTextMsg + "\n" + specificMessage, 
	    	{ align: 'center', 
	    		font: '48px Anton', 
	    		fill: '#fff', 
	    		wordWrap: {width: LD.Globals.gameWidth - (LD.Globals.horizontalOffset*2)} 
	    	});
        winloseText.setStroke('#000', 5);	    
        winloseText.setX( (LD.Globals.gameWidth - winloseText.width)/2 ); 

        var restartText = this.add.text(60, LD.Globals.vertOneThird*2.5, 
            LD.Messages.restartTextMsg, 
            { align: 'center', font: '48px Anton', fill: '#fff' });
        restartText.setStroke('#000', 5);
        restartText.setX( (LD.Globals.gameWidth - restartText.width)/2 ); 

	    var fullClick = false;

        this.input.once('pointerup', function () {

            fullClick = true;
            // console.log("pointerup , click!");
            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                    function(){this.scene.start('play')}, 
                                                    [], this); 

        }, this);

        this.input.once('pointerdown', function () {

            // console.log("pointerdown , click!");
            if(fullClick){
                console.log("fullClick! , select");
                this.scene.start('play');
            }

        }, this);

    }

});






LD.Scenes.Play = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Play ()
    {
        // console.log("Play Scene Play()");
        Phaser.Scene.call(this, 'play');
    },


    preload: function ()
    {

        // this.load.image('tileset1', 'img/assets/winter_outdoorsTileSheet.png');
        // this.load.image('tileset2', 'img/assets/cabin.png');
        // this.load.tilemapTiledJSON('forestcabin', 'json/forestcabin.json');
        
        // this.load.image('star', 'img/sprites/wood.png');
        // this.load.image('bomb', 'img/sprites/baddies.png');
        // this.load.image('sword2', 'img/sprites/sword2.png');
        // this.load.spritesheet('boy', 'img/sprites/boy.png', { frameWidth: 30, frameHeight: 52 });
        // this.load.spritesheet('nothing', 'img/sprites/nothing.png', { frameWidth: 38, frameHeight: 44 });
        // this.load.spritesheet('baddie', 'img/sprites/baddies.png', { frameWidth: 48, frameHeight: 48 });
        // this.load.spritesheet('shadow', 'img/sprites/shadow.png', { frameWidth: 16, frameHeight: 6 });  
        // this.load.spritesheet('void', 'img/sprites/void.png', { frameWidth: 9, frameHeight: 9 });

        // this.load.image('tiles', 'img/assets/gridtiles.png');
        this.load.image('tiles', 'img/assets/quickie_tilemap.png');
        this.load.tilemapTiledJSON('map', 'json/simple-map.json');
        // this.load.image('triangle', 'img/sprites/triangle.png');
        this.load.image('player', 'img/sprites/player_t25x25.png');

    },

    create: function ()
    {
        console.log("Play Scene create()");
        thisGame = this;
        LD.Globals.game = this;

        LD.Globals.gameOver = false;

        var ts = LD.Maps.tileSize;
        var tn = LD.Maps.tileNum;
        
        LD.Maps.map = this.make.tilemap({ key: 'map', tileWidth: ts.x, tileHeight: ts.y });
        var map = LD.Maps.map;
        tileset = map.addTilesetImage('tiles');
        var tileName = LD.Maps.tiles;
        // layer = map.createDynamicLayer('Level1', tileset);
        LD.Maps.layer = map.createBlankDynamicLayer('layer', tileset);
        var layer = LD.Maps.layer;
        layer.setScale(LD.Maps.tileScale.x,LD.Maps.tileScale.y);
        layer.fill(tileName.wall, 0, 0, tn.x, tn.y); // Body of the water

        var bounds = LD.Maps.getBounds();
        this.physics.world.setBounds(
            -ts.x , 
            -ts.y , 
            bounds.x ,
            bounds.y , 
            true, true, true, true);


        map.setCollision([ tileName.fog, tileName.wall, tileName.node, 20, 48 ]);

        var i,j;
        var startTile = LD.Maps.findStartTiles();

        LD.Blocks.createNode(startTile.x,startTile.y, true);
        // startTileX = LD.Globals.randomNumber(tn.x-5,tn.x+5);
        // startTileY = LD.Globals.randomNumber(tn.y-5,tn.y+5);
            // Rounds down to nearest tile
        // var pointerTileX = map.worldToTileX(worldPoint.x);
        // var pointerTileY = map.worldToTileY(worldPoint.y);

        // Snap to tile coordinates, but in world space
        var start ={};
        start.x = map.tileToWorldX(startTile.x);
        start.y = map.tileToWorldY(startTile.y);

        // player = this.add.rectangle(start.x, start.y, 24, 38, 0xffff00);
        var player = LD.Player.createPlayer(start.x, start.y);

        console.log(start,player);

        // for(i=0;i<60;i++){
        //     layer.putTileAt(56, startTile.x+i, startTile.y);
        //     layer.putTileAt(57, startTile.x, startTile.y+i);
        //     layer.putTileAt(58, startTile.x+i, startTile.y+3);
            
        //     for(j=1;j<10;j++){
        //         layer.putTileAt(43, i+1, (j*5));
        //     }
        // }

        LD.Maps.fogLayer = map.createBlankDynamicLayer('fogLayer', tileset);
        var fogLayer = LD.Maps.fogLayer;
        // fogLayer.setScale(2);
        var fn = {x:2*tn.x, y:2*tn.y};
        fogLayer.fill(tileName.fog, 1, 1, fn.x, fn.y); // Body of the water
        // fogLayer.setZ(1);
        console.log(tn,fn,fogLayer, layer);


        LD.Globals.cursors = this.input.keyboard.createCursorKeys();
        var cursors = LD.Globals.cursors;

        LD.Globals.myKeys = this.input.keyboard.addKeys(
            {
                W:Phaser.Input.Keyboard.KeyCodes.W,
                S:Phaser.Input.Keyboard.KeyCodes.S,
                A:Phaser.Input.Keyboard.KeyCodes.A,
                D:Phaser.Input.Keyboard.KeyCodes.D,
                SPACE:Phaser.Input.Keyboard.KeyCodes.SPACE
            }
        );


        LD.Messages.createStatsText();


        this.physics.add.collider(player, layer);

        this.physics.add.existing(LD.Player.rect);
        // this.physics.add.collider(LD.Player.rect, fogLayer);

        LD.Maps.fogs = map.filterTiles(function (tile) {
            return (tile.index === tileName.fog);
        });

        // this.physics.world.overlapTiles(LD.Player.rect, fogLayer, this.collideFog, null, this);
        
        console.log("fogs:",LD.Maps.fogs)

    },

    update: function ()
    {
        
        var player = LD.Player.updatePlayer();

        this.physics.world.overlapTiles(LD.Player.rect, LD.Maps.fogs, this.collideFog, null, this);
        this.physics.world.overlapTiles(LD.Player.rect, LD.Maps.nodes, this.collideNode, null, this);
        this.physics.world.overlapTiles(player, LD.Maps.blocks, this.collideBlock, null, this);

        LD.Messages.updateStatsText();

    },



    collideFog: function (player, tile)
    {
        LD.Maps.map.removeTile(tile, -1);

        LD.Maps.fogs = LD.Maps.map.filterTiles(function (tile) {
            return (tile.index === LD.Maps.tiles.fog);
        });
    }, 

    collideNode: function (player, tile)
    {
        var tileX = tile.x;
        var tileY = tile.y;

        LD.Maps.map.removeTile(tile, -1);
        console.log("collideNode(): x,y",tile.x,tile.y);

        // LD.Maps.nodes = LD.Maps.nodes.filter((tile) => item.id !== idToRemove);
        LD.Maps.nodes = LD.Maps.nodes.filter(function(t) {
          //return false for the element that matches both the name and the id
            // console.log("collideNode(): t: x,y",t.x,t.y);

          return !(t.x == tile.x && t.y == tile.y)
        });

        LD.Blocks.createNode(tileX,tileY);
    },



    collideBlock: function (player, tile)
    {
        LD.Blocks.removeBlock(tile);

        var tileName = LD.Maps.tiles;
        var index = tile.index;
        var stats = LD.Player.stats;

        if(index === tileName.blue ){
            stats.blue += 2;
        }else if(index === tileName.yellow ){
            stats.yellow += 2;
        }else if(index === tileName.red ){
            stats.red += 2;
        }else if(index === tileName.purple ){
            stats.blue += 1;
            stats.red += 1;
        }else if(index === tileName.green ){
            stats.yellow += 1;
            stats.blue += 1;
        }else if(index === tileName.orange ){
            stats.red += 1;
            stats.yellow += 1;
        }else{

        }
    }

    

});










