function removeFromArray(arr, elt){
  for (var i = arr.length-1; i>= 0; i--){
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function heuristic(a, b){
  var d = dist(a.i,a.j,b.i,b.j);
  // var d = abs(a.i-b.i) + abs(a.j-b.j);
  return d;
}
function setup() {
  var width = 500;
  var height = 500;

  createCanvas(width, height);
  console.log("A* - Start date: 12/27/2020 - End date: 12/27/2020");
  //starts here!

  /*
  NOTES:
  f(n) = g(n) + h(n)
  https://en.wikipedia.org/wiki/A*_search_algorithm
  */

}


//Making the Cell object
function Cell(i, j){
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.i = i;
  this.j = j;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if (getRandomArbitrary(0, 10) <= 3){
    this.wall = true;
  }

  this.show = function(col){
    fill(col);
    if (this.wall == true){
      fill(0);
    }
    stroke(0);
    rect(this.i * 20, this.j * 20, 20, 20);
  }

  this.addNeighbors = function(grid){
    var i = this.i;
   var j = this.j;
   if (i < cols - 1) {
     this.neighbors.push(grid[i + 1][j]);
   }
   if (i > 0) {
     this.neighbors.push(grid[i - 1][j]);
   }
   if (j < rows - 1) {
     this.neighbors.push(grid[i][j + 1]);
   }
   if (j > 0) {
     this.neighbors.push(grid[i][j - 1]);
   }
   // if (i > 0 && j > 0) {
   //   this.neighbors.push(grid[i - 1][j - 1]);
   // }
   // if (i < cols - 1 && j > 0) {
   //   this.neighbors.push(grid[i + 1][j - 1]);
   // }
   // if (i > 0 && j < rows - 1) {
   //   this.neighbors.push(grid[i - 1][j + 1]);
   // }
   // if (i < cols - 1 && j < rows - 1) {
   //   this.neighbors.push(grid[i + 1][j + 1]);
   // }
  }

}


var openSet = [];
var closedSet = [];

var start;
var end;

var cols = 25;
var rows = 25;
var grid = new Array(cols);
var path = [];

//Making the 2D array.
for (var i = 0; i < cols; i++){
  grid[i] = new Array(rows);
}

for (var i = 0; i < cols; i++){
  for (var j = 0; j < rows; j++){
    grid[i][j] = new Cell(i, j);
  }
}
for (var i = 0; i < cols; i++){
  for (var j = 0; j < rows; j++){
    grid[i][j].addNeighbors(grid);
  }
}

start = grid[0][0];
end = grid[cols - 1][rows - 1];
openSet.push(start);

function draw() {
  if (openSet.length > 0){

    var winner = 0;
    for (var i = 0; i < openSet.length; i++){
      if (openSet[i].f < openSet[winner].f){
        winner = i;
      }
    }
    var current = openSet[winner];

    if (current === end){
      noLoop();

      console.log("Done");
      console.log(path);
    }
    removeFromArray(openSet, current);
    closedSet.push(current);


    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++){
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall){
        var tempG = current.g + 1;

        if (openSet.includes(neighbor)){
          if (tempG < neighbor.g){
            neighbor.g = tempG;
          }
        }else{
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;

      }

    }

  }else{
    noLoop();
    console.log("No soultion");
  }
  background(0);

  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
        grid[i][j].show(color(255));
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous){
    path.push(temp.previous);
    temp = temp.previous;
  }
  for (var i = 0; i < path.length; i++){
    path[i].show(color(0, 0, 255));
  }
}
