//se carga la imagen del rompecabezas
var Imagen = {

configurarCanvas: function(idCanvas) {
   var canvas = document.getElementById(idCanvas);
   var contexto = canvas.getContext("2d");
         return {
           canvas,
           contexto
         };
  },

  cargarImagenInicial : function() {
  var contexto = this.configurarCanvas('mi-canvas').contexto;
    var imagen = new Image();
    imagen.src = 'images/escher2.jpg';
    imagen.onload = function() {
    contexto.drawImage(imagen,0,0,600,600);
    }
  },


  iniciarImagen : function() {
    var contexto = this.configurarCanvas('mi-canvas').contexto;
      var imagen = new Image();
      var piezaVacia = (Juego.cantidadDePiezasPorLado)*(Juego.cantidadDePiezasPorLado);
      imagen.src = 'images/escher2.jpg';
      imagen.onload = function() {
       for (i=0; i<Pieza.piezas.length; i++) {
         for (j=0; j<Pieza.piezas.length; j++) {
            if (Pieza.piezas[i][j].numeroPieza === piezaVacia) {
              contexto.fillStyle = "#fd5f00";
              contexto.fillRect(Pieza.piezas[i][j].xOriginal, Pieza.piezas[i][j].yOriginal, Pieza.anchoPiezas, Pieza.altoPiezas);

            }else{
              contexto.drawImage(imagen, Pieza.piezas[i][j].xActual, Pieza.piezas[i][j].yActual, Pieza.anchoPiezas, Pieza.altoPiezas, Pieza.piezas[i][j].xOriginal, Pieza.piezas[i][j].yOriginal, Pieza.anchoPiezas, Pieza.altoPiezas);
              }
            }
          }
        }
      }


    }
