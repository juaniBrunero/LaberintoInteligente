var x = 5;
var y = 5;
let ancho = 350;
let alto = 350;

var grafo;

function setup(){
  grafo = generarLaberito(x, y, 0.5);

  createCanvas(400, 600);
}

function draw(){
  background(51);
  noLoop();

  stroke(0);
  fill(240);
  rect(25, 25, 150, 50);
  rect(225, 25, 150, 50);

  fill(0);
  rect(25, 225, ancho, alto);
  textSize(20);
  text("Regenerar", 50, 55);
  text("Exportar", 260, 55);

  //Nodos
  for (var i = 0; i < grafo.length; i++) {
    for (var j = 0; j < grafo[i].length; j++) {
      fill(255);
      ellipse(corX(i) , corY(j), 8, 8);
    }
  }
  //Arcos
  for (var i = 0; i < grafo.length; i++) {
    for (var j = 0; j < grafo[i].length; j++) {
      stroke(0, 255, 0);
      for (var v = 0; v < grafo[i][j].vx.length; v++) {
        line(corX(i), corY(j), corX(grafo[i][j].vx[v]), corY(grafo[i][j].vy[v]));
      }
    }
  }
  //Eje columna
  for (var i = 0; i < x; i++) {
    text(i, 25 + i*ancho/x + ancho/(2*x), 215);
  }
  //Eje fila
  for (var j = 0; j < y; j++) {
    text(j, 10, 225 + j*alto/y + alto/(2*y));
  }
}

function mousePressed(){
  if(mouseX > 25 && mouseX < 175 && mouseY > 25 && mouseY < 75){
    regenerar();
    console.log("Regenerado");
    redraw();
  }else if(mouseX > 225 && mouseX < 375 && mouseY > 25 && mouseY < 75){
    //exportar(grafo);
    console.log("Exportado");
  }
}

function generarLaberito(X, Y, A){
  var g = [];
  //Definir nodos
  for (var i = 0; i < X; i++) {
    g[i] = [];
      for (var j = 0; j < Y; j++) {
        g[i][j] = {vx:[], vy:[]}
      }
  }
  //Buscar y unir vecinos
  for (var i = 0; i < X; i++) {
    for (var j = 0; j < Y; j++) {
      if(i < X-1 && random(0, 1) < A){
        g[i][j].vx.push(i+1);
        g[i][j].vy.push(j);
      }
      if(j < Y-1 && random(0, 1) < A){
        g[i][j].vx.push(i);
        g[i][j].vy.push(j+1);
      }
    }
  }
  return g;
}

const corX = a => 25 + ancho/x * a + ancho/(2*x);
const corY = a => 225 + alto/y * a + alto/(2*y);

function exportar(g){
  let arcos = ""
  for (var i = 0; i < g.length; i++) {
    for (var j = 0; j < g[i].length; j++) {
      for (var v = 0; v < g[i][j].vx.length; v++) {
        arcos += "ªarco("+g[i][j].vx[v]+g[i][j].vy[v]+","+i+j+").";
      }
    }
  }
  arcos +="ª"+arista+"ª"+es_nodo+"ª"+conectados+"ª"+camino;
  let archivo = split(arcos, 'ª');
  saveStrings(archivo, 'laberinto', 'pl');
}

let arista = "arista(X, Y) :- arco(X, Y) ; arco(Y, X).";
let es_nodo = "es_nodo(X) :- arco(X, _) ; arco(_, X).";
let conectados = "conectados(X,Y) :- conectados(X,Y,[X]).ªconectados(X,X,_) :- es_nodo(X).ªconectados(X,Y,Visitados) :- arista(X,Z), not(member(Z,Visitados)), conectados(Z,Y,[Z|Visitados]).";
let camino = "camino(X,Y,[X|Cs]) :- camino(X,Y,[X],Cs).ªcamino(X,X,_,[]).ªcamino(X,Y,Visitados,[Z|Cs]) :- arista(X,Z), not(member(Z,Visitados)), camino(Z,Y,[Z|Visitados],Cs).";

function regenerar(){
  grafo = generarLaberito(x, y, 0.5);
}
