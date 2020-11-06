if(LD === undefined) {
  var LD = {};
}

LD.Blocks = {


    nodes: [],


	refresh: function (){
		// refresh every game propeties goes here
        LD.Blocks.nodes = [];
	},

	createBlocks: function(){
		thisGame = LD.Globals.game;
		LD.Blocks.refresh();
	},

	updateBlocks: function(){


        

	},

    createNode: function(tileX, tileY, first=false) {
        var layer = LD.Maps.layer;
        var tileName = LD.Maps.tiles;
        LD.Blocks.nodes.push([tileX,tileY]);
        layer.putTileAt(tileName.path, tileX, tileY);
        var pathNum = LD.Globals.randomNumber(1,3);
        if(first){pathNum = LD.Globals.randomNumber(3,4);}
        var i,j;
        var justInCase = 20;
        console.log("createnode(first?): ",first,pathNum);

        while(pathNum>0 && justInCase>0){
            if(pathNum == 0){
                justInCase = 0;
                break;
            }else{
                justInCase--;
            }
            var pathDir = LD.Globals.randomNumber(0,3);
            var pathLen = LD.Globals.randomNumber(1,4);
            pathLen = pathLen * 2 + 1;

            console.log("createnode(): ",pathNum,justInCase, pathDir, pathLen);
            if(pathDir == 0){
                // left
                if (LD.Blocks.checkIfOnlyWallsOnPath(pathLen,tileX,tileY,-1,0)) {
                    --pathNum;
                    LD.Blocks.buildPath(pathLen,tileX,tileY,-1,0);
                }
            }else if(pathDir == 1){
                // right
                if (LD.Blocks.checkIfOnlyWallsOnPath(pathLen,tileX,tileY,1,0)) {
                    --pathNum;
                    LD.Blocks.buildPath(pathLen,tileX,tileY,1,0);
                }
            }else if(pathDir == 2){
                // up
                if (LD.Blocks.checkIfOnlyWallsOnPath(pathLen,tileX,tileY,0,-1)) {
                    --pathNum;
                    LD.Blocks.buildPath(pathLen,tileX,tileY,0,-1);
                }
            }else if(pathDir == 3){
                // down
                if (LD.Blocks.checkIfOnlyWallsOnPath(pathLen,tileX,tileY,0,1)) {
                    --pathNum;
                    LD.Blocks.buildPath(pathLen,tileX,tileY,0,1);
                }
            }

            console.log("createnode(): at the end: ",pathNum,justInCase, pathDir, pathLen);

        }
    },

    checkIfWall: function(x,y){
        console.log(LD.Maps.layer.getTileAt(x,y).index , LD.Maps.tiles.wall);
        if(LD.Maps.layer.getTileAt(x,y).index === LD.Maps.tiles.wall){
            return true;
        }else{
            return false;
        }
    },

    checkIfOnlyWallsOnPath: function(len, tileX, tileY, x=0, y=0){
        var retVal = true;
        var count = 1; // i am here
        var X,Y;
        for(j=0;j<len;j++){
            X = tileX+(x*j);
            Y = tileY+(y*j);
            var wallMaybe = LD.Maps.layer.getTileAt(X,Y);
            if(wallMaybe && wallMaybe.index === LD.Maps.tiles.wall){
                count++;
            }
        }
        console.log("checkIfOnlyWallsOnPath(): ",len, count);
        if(count===len){
            return true;
        }else{
            return false;
        }
    },

    buildPath: function(len, tileX, tileY, x=0, y=0){
        var layer = LD.Maps.layer;
        var tileName = LD.Maps.tiles;
        var X,Y;
        var makeNode=true;
        for(j=0;j<len;j++){
            X = tileX+(x*j);
            Y = tileY+(y*j);
            if(X>=2 && X < LD.Maps.tileNum.x-1
                && Y>=2 && Y < LD.Maps.tileNum.y-1){

                layer.putTileAt(tileName.path, X, Y);
                LD.Blocks.fillBlock(X,Y);
            }else{
                makeNode = false;
                break;
            }
        }
        if(makeNode){
            LD.Blocks.setNodeOnPath(len,X,Y);
        }
    },

    setNodeOnPath: function(l,tileX,tileY){
        var layer = LD.Maps.layer;
        var tileName = LD.Maps.tiles;
        var nodes = LD.Maps.nodes;
        var tile = layer.putTileAt(tileName.node, tileX, tileY );
        nodes.push(tile);
    },

    fillBlock: function (tileX,tileY) {
        // body...
        var tilePicked = LD.Blocks.pickTileType();
        if(tilePicked > 0){
            LD.Blocks.createBlock(tileX,tileY,tilePicked);
        }
    },

    pickTileType: function(){
        var tileName = LD.Maps.tiles;
        var wtArray = [
            {wt:200, tile:0},
            {wt:20, tile:tileName.blue},
            {wt:20, tile:tileName.yellow},
            {wt:20, tile:tileName.red},
            {wt:20, tile:tileName.purple},
            {wt:20, tile:tileName.green},
            {wt:20, tile:tileName.orange},
        ];
        var tallyWT = 0;
        wtArray.forEach(function(block) {
            tallyWT += block.wt;
        });

        var pickWT = LD.Globals.randomNumber(1,tallyWT);
        var tilePicked = 0;
        var i=0;
        while(pickWT > 0){
            var pick = wtArray[i];
            pickWT -= pick.wt;
            tilePicked = pick.tile;
            i++;
        }

        return tilePicked;
    },

    createBlock: function(tileX,tileY,tilePicked){
        var layer = LD.Maps.layer;
        var tileName = LD.Maps.tiles;
        var blocks = LD.Maps.blocks;
        var tile = layer.putTileAt(tilePicked, tileX, tileY );
        blocks.push(tile);
    },

    removeBlock: function(tile){
        var thisTime = LD.Globals.game.time; 
        var tileX = tile.x;
        var tileY = tile.y;
        var tilePicked = tile.index;

        LD.Maps.map.removeTile(tile, LD.Maps.tiles.path);
        console.log("removeBlock(): x,y",tile.x,tile.y);

        // LD.Maps.nodes = LD.Maps.nodes.filter((tile) => item.id !== idToRemove);
        LD.Maps.blocks = LD.Maps.blocks.filter(function(t) {
          //return false for the element that matches both the name and the id
            // console.log("removeBlock(): t: x,y",t.x,t.y);

          return !(t.x == tile.x && t.y == tile.y)
        });

        thisTime.delayedCall(3000, LD.Blocks.createBlock, [tileX,tileY,tilePicked], this);
    }



	

	

};