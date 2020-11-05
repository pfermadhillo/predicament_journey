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

    createNode: function(tileX, tileY) {
        var layer = LD.Maps.layer;
        LD.Blocks.nodes.push([tileX,tileY]);
        layer.putTileAt(43, tileX, tileY);

        var pathNum = LD.Globals.randomNumber(1,3);
        var i,j;
        for(i=0;i<pathNum;i++){
            var pathDir = LD.Globals.randomNumber(0,3);
            var pathLen = LD.Globals.randomNumber(1,4);
            pathLen = pathLen * 2 + 1;
            if(pathDir == 0){
                // left
                if (LD.Blocks.checkIfWall(tileX-1,tileY)) {
                    for(j=0;j<pathLen;j++){layer.putTileAt(43, tileX-j, tileY);}
                }else{
                    pathDir += 1;                    
                }
            }else if(pathDir == 1){
                // right
                if (LD.Blocks.checkIfWall(tileX+1,tileY)) {
                    for(j=0;j<pathLen;j++){layer.putTileAt(43, tileX+j, tileY);}
                }else{
                    pathDir += 1;                    
                }
            }else if(pathDir == 2){
                // up
                if (LD.Blocks.checkIfWall(tileX,tileY-1)) {
                    for(j=0;j<pathLen;j++){layer.putTileAt(43, tileX, tileY-j);}
                }else{
                    pathDir += 1;                    
                }
            }else if(pathDir == 3){
                // down
                if (LD.Blocks.checkIfWall(tileX,tileY+1)) {
                    for(j=0;j<pathLen;j++){layer.putTileAt(43, tileX, tileY+j);}
                }else{
                    pathDir += 1;                    
                }
            }
        }
    },

    checkIfWall: function(x,y){
        console.log(LD.Maps.layer.getTileAt(x,y).index , LD.Maps.tiles.wall);
        if(LD.Maps.layer.getTileAt(x,y).index === LD.Maps.tiles.wall){
            return true;
        }else{
            return false;
        }
    }



	

	

};