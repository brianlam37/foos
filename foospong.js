var baseY = 25;
var baseX = 50;
var speedH = 10;
var speedB= 3;
var score1 = 0;
var score2 = 0;
var score = function() {
    textSize(30);
    text("PLAYER : "+score1, 10, 30);
    text("AI : "+score2, 360, 590);
};

var Hitter =  function(xx,yy){
    this.x= xx;
    this.y = yy;
    this.w = 20;
    this.h = 30;
    
};
Hitter.prototype.getX=function(){
    return this.x;
};
Hitter.prototype.getW = function(){
    return this.w;   
};
Hitter.prototype.hitRside=function(ballX,ballY,ballD){
 if(ballX-ballD/2<= this.x+this.w && ballX>=this.x+this.w/2&& this.y+this.h>=ballY&& ballY>=this.y ){
     
    return true;
 }
 return false;
};
Hitter.prototype.hitLside=function(ballX,ballY,ballD){
 if(ballX+ballD/2>= this.x && ballX <= this.x+this.w/2&& this.y+this.h>=ballY&& ballY>=this.y ){
     
    return true;
 }
 return false;
};
Hitter.prototype.hitBside=function(ballX,ballY,ballD){
 if(ballY-ballD/2<= this.y+this.h&& ballY >=this.y +this.h&& this.x+this.w>=ballX&& ballX>=this.x){
    return true;
 }
 return false;
};
Hitter.prototype.hitTside=function(ballX,ballY,ballD){
 if(ballY+ballD/2>= this.y && ballY <= this.y&& this.x+this.w>=ballX&& ballX>=this.x ){

    return true;
 }
 return false;
};
Hitter.prototype.drawH= function(col) {
    stroke(255,255,255);
    fill(col);
    rect(this.x,this.y,this.w,this.h);
};
Hitter.prototype.moveR=function(){
    
        this.x+=speedH;
        
};
Hitter.prototype.moveL=function(){
    this.x-=speedH;
};
var redAi = true;

var futbol = function(xx,yy){
  this.x =xx;
  this.y =yy;
  this.d = 15;
  this.left =false;
  this.up = true;
};
futbol.prototype.getX = function(){
    return this.x;
};
futbol.prototype.getY = function(){
    return this.y;
};
futbol.prototype.getD = function(){
    return this.d;  
};
futbol.prototype.move = function(){
    if(this.up === true){

        this.y-=speedB;
    }
    if(this.down === true){
        this.y+=speedB;
    }
    if(this.left === true){
        this.x-=speedB;
    }
    if(this.right === true){
        this.x+=speedB;
    }
};
futbol.prototype.collideH = function(hitter){
    if(this.x+this.d/2>= width){
        this.left =true;
        this.right = false;
    }
    if(this.x-this.d/2<=0){
        this.left = false;
        this.right = true;
    }
    if(this.y+this.d/2>=height){
        if(this.x>185 && this.x<315){
            score1++;
            this.x= width/2;
            this.y=height/2;
            this.up = true;
            this.down = false;
            this.right = false;
            this.left = false;
        }else{
            this.up = true;
            this.down = false;
        }
    }
    if(this.y-this.d/2<=0){
        if(this.x>185 && this.x<315){
            score2++;
            this.x= width/2;
            this.y=height/2;
            this.right = false;
            this.left = false;
            this.up = false;
            this.down = true;
        }else{
            this.up = false;
            this.down = true;
        }
    }
    if(hitter.hitLside(this.x,this.y,this.d)){
        this.left=true;
        this.right = false;
    }    
    if(hitter.hitRside(this.x,this.y,this.d)){
        this.left=false;
        this.right = true;
    }
    if(hitter.hitTside(this.x,this.y,this.d)){
        this.up=true;
        this.down=false;
    }
    if(hitter.hitBside(this.x,this.y,this.d)){
        this.up = false;
        this.down = true;
    }
};

futbol.prototype.drawF= function(){
    fill(255,255,255);
    ellipse(this.x,this.y,this.d,this.d);
};
var red1 = [new Hitter(baseX+190,baseY)];
var red2 = [new Hitter(baseX+110,baseY+70),new Hitter(baseX+270,baseY+70)];
var blue4 = [new Hitter(baseX+110,baseY+140),new Hitter(baseX+190,baseY+140),new Hitter(baseX+270,baseY+140)];
var red3 = [new Hitter(baseX+30,baseY+210),new Hitter(baseX+110,baseY+210),new Hitter(baseX+190,baseY+210),new Hitter(baseX+270,baseY+210),new Hitter(baseX+350,baseY+210)];
var blue3 = [new Hitter(baseX+30,baseY+310),new Hitter(baseX+110,baseY+310),new Hitter(baseX+190,baseY+310),new Hitter(baseX+270,baseY+310),new Hitter(baseX+350,baseY+310)];
var red4 = [new Hitter(baseX+110,baseY+380),new Hitter(baseX+190,baseY+380),new Hitter(baseX+270,baseY+380)];
var blue2 = [new Hitter(baseX+110,baseY+450),new Hitter(baseX+270,baseY+450)];
var blue1 = [new Hitter(baseX+190,baseY+520)];
var r = color(255,0,0);
var b = color(0,0,255);
var y = color(255,255,0);
var row = 0;

var rows =[red1,red2,blue4,red3,blue3,red4,blue2,blue1];
var blues =[blue1,blue2,blue3,blue4];
var reds =[red1,red2,red3,red4];
var game = function(){
    for(var j = 0;j <reds.length;j++){
        for(var i = 0; i < reds[j].length;i++){
            if(row === j){
               reds[j][i].drawH(y);
            }else{
                reds[j][i].drawH(r);

            }
            blues[j][i].drawH(b);
        }
    }
};
var ball = new futbol(width/2,height/2);
var aiMove = function(ballX){

    for(var i = 1; i <blues.length;i++){
        if(i%2===0){
            if(ballX<blues[i][0].getX()){
                if(blues[i][0].getX()-speedH>=0){
                    for(var j = 0; j < blues[i].length;j++){
                        blues[i][j].moveL();
                    }
                }else{
                    speedH = blues[i][0].getX();
                    for(var j = 0; j < blues[i].length;j++){
                        blues[i][j].moveL();
                        
                    }
                    speedH = 10;
                }
            }
            if(ballX>blues[i][0].getX()+blues[i][0].getW()){
                var position = blues[i][blues[i].length-1].getX()+blues[i][blues[i].length-1].getW();
                if(position+speedH<=width){
                    for(var j = 0; j < blues[i].length;j++){
                        blues[i][j].moveR();
                        
                    }
                }else{
                    speedH = width-position;
                    for(var j = 0; j < blues[i].length;j++){
                        blues[i][j].moveR();
                    }
                    speedH = 10;
                }
            }
        }else{
            
            if(ballX<blues[i][blues[i].length-1].getX()){
                if(blues[i][0].getX()-speedH>=0){
                    for(var j = 0; j < blues[i].length;j++){
                        blues[i][j].moveL();
                    }
                }else{
                    speedH = blues[i][0].getX();
                    for(var j = 0; j < blues[i].length;j++){
                        blues[i][j].moveL();
                        
                    }
                    speedH = 10;
                }
            }
            if(ballX>blues[i][blues[i].length-1].getX()+blues[i][blues[i].length-1].getW()){
                var position = blues[i][blues[i].length-1].getX()+blues[i][blues[i].length-1].getW();
                if(position+speedH<=width){
                    for(var j = 0; j < blues[i].length;j++){
                        blues[i][j].moveR();
                        
                    }
                }else{
                    speedH = width-position;
                    for(var j = 0; j < blues[i].length;j++){
                        blues[i][j].moveR();
                    }
                    speedH = 10;
                }
            }
            
        }
        }
   
        if(ballX<blue1[0].getX()){
            if(blue1[0].getX()-speedH>=170){
                blue1[0].moveL();
            }else{
                speedH = 170-blue1[0].getX();
                blue1[0].moveL();
            }
            speedH = 10;
        }

        if(ballX>blue1[0].getX()+blue1[0].getW()){      
            if(blue1[0].getX()+blue1[0].getW()+speedH<=330){
                blue1[0].moveR();
            }else{
                speedH = 330-(blue1[0].getX()+blue1[0].getW());
                blue1[0].moveR();
            }
            speedH = 10;
        }
        
        for(var i = 1; i <reds.length;i++){
            if(row!==i){
                if(ballX<reds[i][0].getX()){
                if(reds[i][0].getX()-speedH>=0){
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveL();
                    }
                }else{
                    speedH = reds[i][0].getX();
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveL();
                        
                    }
                    speedH = 10;
                }
            }
                if(ballX>reds[i][0].getX()+reds[i][0].getW()){
                var position = reds[i][reds[i].length-1].getX()+reds[i][reds[i].length-1].getW();
                if(position+speedH<=width){
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveR();
                        
                    }
                }else{
                    speedH = width-position;
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveR();
                    }
                    speedH = 10;
                }
            }
            if(ballX<reds[i][reds[i].length-1].getX()){
                if(reds[i][0].getX()-speedH>=0){
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveL();
                    }
                }else{
                    speedH = reds[i][0].getX();
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveL();
                        
                    }
                    speedH = 10;
                }
            }
                if(ballX>reds[i][reds[i].length-1].getX()+reds[i][reds[i].length-1].getW()){
                var position = reds[i][reds[i].length-1].getX()+reds[i][reds[i].length-1].getW();
                if(position+speedH<=width){
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveR();
                        
                    }
                }else{
                    speedH = width-position;
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveR();
                    }
                    speedH = 10;
                }
            }
        
            }
        }
        if(row!==0){
            if(ballX<red1[0].getX()){
                if(red1[0].getX()-speedH>=170){
                    red1[0].moveL();
                }else{
                    speedH = 170-red1[0].getX();
                    red1[0].moveL();
                }
                speedH = 10;
            }
    
            if(ballX>red1[0].getX()+red1[0].getW()){      
                if(red1[0].getX()+red1[0].getW()+speedH<=330){
                    red1[0].moveR();
                }else{
                    speedH = 330-(red1[0].getX()+red1[0].getW());
                    red1[0].moveR();
                }
                speedH = 10;
            }
        }
        
};
var draw = function() {
    background(0,255,0);
    noFill();
    stroke(255,255,255);
    strokeWeight(5);
    rect(0,0,width,height);
    ellipse(width/2,height/2,40,40);
    line(0,height/2,width,height/2);
    rect(170,0,160,70);
    rect(185,0,130,20);
    rect(170,530,160,70);
    rect(185,580,130,20);
    strokeWeight(1);
    game();
    ball.drawF();
    aiMove(ball.getX());
    for(var i =0; i < rows.length;i++){
        for(var j = 0;j < rows[i].length;j++){
            ball.collideH(rows[i][j]);
            
        }
       
    }
     ball.move();
     score();
};
var keys=[];
var keyPressed = function(){
    keys[keyCode] = true;

    for(var i = 1; i <reds.length;i++){
        if(row === i){
            if(keys[65] ===true){
                if(reds[i][0].getX()-speedH>=0){
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveL();
                    }
                }else{
                    speedH = reds[i][0].getX();
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveL();
                        
                    }
                    speedH = 10;
                }
            }
            if(keys[68] ===true){
                var position = reds[i][reds[i].length-1].getX()+reds[i][reds[i].length-1].getW();
                if(position+speedH<=width){
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveR();
                        
                    }
                }else{
                    speedH = width-position;
                    for(var j = 0; j < reds[i].length;j++){
                        reds[i][j].moveR();
                    }
                    speedH = 10;
                }
            }
            
        }
    }
    if(row === 0){
        if(keys[65] ===true){
            if(red1[0].getX()-speedH>=170){
                red1[0].moveL();
            }else{
                speedH = 170-red1[0].getX();
                red1[0].moveL();
            }
            speedH = 10;
        }

        if(keys[68]===true){      
            if(red1[0].getX()+red1[0].getW()+speedH<=330){
                red1[0].moveR();
            }else{
                speedH = 330-(red1[0].getX()+red1[0].getW());
                red1[0].moveR();
            }
            speedH = 10;
        }
    }
    if(keys[83] ===true){
       if(row<3){
           row++;
       }else{
          row = 0;
       }
    }
    if(keys[87] ===true){
        if(row>0){
            row--;
        }else{
            row=3;
        }
    }
};
var keyReleased = function(){
    keys[keyCode] = false;

};