
 var Pieza = function (xOriginal, yOriginal, xActual, yActual, numeroPieza) {
    this.xOriginal= xOriginal;
    this.yOriginal= yOriginal;
    this.xActual= xActual;
    this.yActual= yActual;
    this.numeroPieza = numeroPieza;
  }

 Pieza.piezas = [];
 Pieza.grillaGanadora = [];

  Pieza.construirPiezas = function() {
    Pieza.calcularTamanioPiezas();
    var yOriginal = 0;
    var yActual = 0;
    var numeroPieza;
    var contador = 1;
    var imagen = new Image();
    imagen.src = 'images/escher2.jpg';
    
    for (i=0; i<Juego.cantidadDePiezasPorLado; i++) {
      var xOriginal = 0;
      var xActual = 0;
      Pieza.piezas[i] = new Array(Juego.cantidadDePiezasPorLado);
      for (j=0; j<Juego.cantidadDePiezasPorLado; j++) {
          numeroPieza = contador;
      Pieza.piezas[i][j] = new Pieza(xOriginal, yOriginal,xActual, yActual, numeroPieza);
        contador++;
        xOriginal+= Pieza.anchoPiezas;
        xActual+= Pieza.anchoPiezas;
       }
      yActual+= Pieza.altoPiezas;
      yOriginal+= Pieza.altoPiezas;
    }
  }


  Pieza.construirGrillaGanadora = function() {
    var contador = 1;
    xOriginal= 0;
    xActual= 0;
    yActual= 0;
    yOriginal= 0;
    for (i=0; i<Juego.cantidadDePiezasPorLado; i++) {
      Pieza.grillaGanadora[i] = new Array(Juego.cantidadDePiezasPorLado);
      for (j=0; j<Juego.cantidadDePiezasPorLado; j++) {
          numeroPieza = contador;
         Pieza.grillaGanadora[i][j] = new Pieza(xOriginal, yOriginal,xActual, yActual, numeroPieza);
         contador++;
           }
         }
      }

    Pieza.calcularTamanioPiezas = function () {
      //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600).
      Pieza.anchoPiezas = Math.floor(600 / Juego.cantidadDePiezasPorLado);
      Pieza.altoPiezas = Math.floor(600 / Juego.cantidadDePiezasPorLado);

      //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
      this.anchoDeRompecabezas = Pieza.anchoPiezas * Juego.cantidadDePiezasPorLado;
      this.altoDeRompecabezas = Pieza.altoPiezas * Juego.cantidadDePiezasPorLado;
    }
