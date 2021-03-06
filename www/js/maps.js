if(LD === undefined) { 
  var LD = {};
}

LD.Maps = {

    tileSize:{x:32,y:32},
    tileNum:{x:165,y:165},
    tileScale:{x:2,y:2},

    startVariance: 5,

    // tiles: {
    //     wall: 14,
    //     path: 43,
    //     fog: 7,
    //     node: 85
    // },

    tiles: {
        wall: 4,
        path: 3,
        fog: 2,
        node: 11,
        blue: 5,
        yellow: 6,
        red: 7,
        purple: 8,
        green: 9,
        orange: 10,
    },

    nodes: [],
    blocks: [],

	preload: function (thisGame){

	},

	create: function (thisGame){
	// 	LD.Maps.map = thisGame.make.tilemap({ key: 'forestcabin' });
		var map = LD.Maps.map;


 //        LD.Maps.tiles = map.addTilesetImage('winter_outdoorsTileSheet', 'tileset1');
 //        var tiles = LD.Maps.tiles;
        
 //        LD.Maps.tiles2 = map.addTilesetImage('cabin', 'tileset2');
 //        var tiles2 = LD.Maps.tiles2;

 //        LD.Maps.layer0 = map.createStaticLayer(0, tiles ); // background
 //        LD.Maps.layer1 = map.createStaticLayer(1, [tiles, tiles2] ); // colliabes
 //        LD.Maps.layer2 = map.createStaticLayer(2, [tiles, tiles2] ); // pass thru/above/in front

 //        LD.Maps.layer1.setCollisionBetween(1,9999);

 //        // LD.Maps.layer1.setCollisionFromCollisionGroup();

 //        var testtt = map.getLayer(1);
 //        console.log(testtt);

 //        LD.Maps.objectLayer = map.getObjectLayer('Object Layer 1');
 //        var obLs = LD.Maps.objectLayer;

 //        obLs.objects.forEach(
 //            (ob) => {
 //                // console.log(ob);
 //                // pretendName = "name|10|behavior|7";
 //                // var res = pretendName.split("|");
 //                console.log("res is:", res);
 //                if(ob.type == "enemy"){
 //                    // if(ob.name == "baddie"){
 //                    //     // new sprite baddie.png
 //                    // }else if(ob.name == "second bruh"){

 //                    // }

 //                    // ob.name = "baddie|derp|10|behavior"
 //                    var obSplit = ob.name.split('|');
 //                    var name = obSplit[0];
 //                    var hp = obSplit[2];
 //                    // var imgpath = obSplit[2]
 //                    // var behavior = obSplit[3]
 //                    // var res = ob.name.split("|");
 //                    // console.log("res is:", res);

 //                    LD.Monsters.activateChild(ob.x,ob.y, name,hp);



 //                }else if(ob.type == "scenechange"){

 //                    // ob.name = "baddie|10|baddie.png|behavior"
 //                    var name = ob.name[0]
 //                    var hp = ob.name[1]
 //                    var imgpath = ob.name[2]
 //                    var behavior = ob.name[3]



 //                }
 //        });

	},

    getBounds: function(){
        var bounds = {};
        bounds.x = LD.Maps.tileSize.x * LD.Maps.tileNum.x;
        bounds.y = LD.Maps.tileSize.y * LD.Maps.tileNum.y;
        return bounds;
    },

    findStartTiles: function(){
        var start = {};
        var x = parseInt(LD.Maps.tileNum.x/4);
        var y = parseInt(LD.Maps.tileNum.y/4);
        var v = LD.Maps.startVariance;
        start.x = LD.Globals.randomNumber(x-v,x+v);
        start.y = LD.Globals.randomNumber(y-v,y+v);

        return start;
    }
};


