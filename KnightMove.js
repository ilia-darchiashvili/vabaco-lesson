function Game(turn, figures){
		this.turn = turn;
		this.figures = figures;
};

Game.prototype.move = function (x, y, newX, newY) {
	var s = this.figures.getAvailableMoves();
	//console.log(s);
	var count = true;
	for(i=0; i<s.length; i++){
		if (newX == s[i][0] && newY == s[i][1]){
			this.figures.positionX = newX;
			this.figures.positionY = newY;
			count = false;
		}
	}
	
	return count;
};


function Figure(color, positionX, positionY){
		this.color = color;
		this.positionX = positionX;
		this.positionY = positionY;
};

Figure.prototype.canMove = function(x, y){
	if (x>7 || x<0 || y>7 || y<0){
		console.log('wrong positions');
		return false;
		}
	else
		return true;
};

function Knight(color, positionX, positionY){
	//Figure.call(this, color);
	//Figure.call(this, positionX);
	//Figure.call(this, positionY);
		this.color = color;
		this.positionX = positionX;
		this.positionY = positionY;
};

Object.assign(Knight.prototype, Figure.prototype);

Knight.prototype.canMove = function(x, y){
	if (Figure.prototype.canMove(x,y))
		if (((x-this.positionX)==1 && (y-this.positionY)==2)
			|| ((x-this.positionX)==2 && (y-this.positionY)==1)
			|| ((x-this.positionX)==-2 && (y-this.positionY)==-1)
			|| ((x-this.positionX)==-1 && (y-this.positionY)==-2)
			|| ((x-this.positionX)==1 && (y-this.positionY)==-2)
			|| ((x-this.positionX)==2 && (y-this.positionY)==-1)
			|| ((x-this.positionX)==-1 && (y-this.positionY)==2)
			|| ((x-this.positionX)==-2 && (y-this.positionY)==1))
				return true;
		else
				return false;
}

Knight.prototype.getAvailableMoves = function () {
	var moves=[];
	for(var i=0; i<8; i++)
		for(var j=0; j<8; j++){
			if (this.canMove(i,j) == true)
				moves.push([i,j]);
		}
	return moves;
};

try{
var k1 = new Knight('white', 0, 0);
var k2 = new Knight('white', 0, 7);
var game = new Game('white', k1);
console.log("k1 position:",k1.positionX,k1.positionY);
var b = game.move(k1.positionX,k1.positionY,1,2);
if(b)
	throw new Error('wrong move!');
console.log("k1 position:",k1.positionX,k1.positionY);

game2 = new Game('black', k2);
if(game2.turn == game.turn)
	throw new Error('Not your turn!');
console.log("k2 position:",k2.positionX,k2.positionY);
var b = game2.move(k2.positionX,k2.positionY,1,5);
if(b)
	throw new Error('wrong move!');
console.log("k2 position:",k2.positionX,k2.positionY);
}

catch(e){
	console.log(e);
}