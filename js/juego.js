Juego = {
// Arreglo que contiene las intrucciones del juego
  instrucciones : [],
// Arreglo para ir guardando los movimientos que se vayan realizando
  movimientos : [],

  codigosDireccion : {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
   },

  ultimosMovimientos : "     ",
  terminoDeMezclar : false,

  instrucciones : [" Utilizar las flechas para mover las piezas", "O Clickear en la pieza que se quiere mover ", "Pasá el mouse sobre la imagen de arriba para ampliarla"],
  piezasPorLado : document.getElementById('cantidad-piezas-por-lado'),
  nivel : document.getElementById('nivel-de-dificultad'),
  mezclar : document.getElementById('mezclar'),
  cantidadDePiezasPorLado : 3,
  cantidadMovimientosPermitidos: 0,
  dificultad: " ",
  facil : document.getElementById('facil'),
  intermedio : document.getElementById('intermedio'),
  dificil : document.getElementById('dificil'),


  mostrarInstrucciones : function(instrucciones) {
    for (i=0; i<this.instrucciones.length; i++) {
      this.mostrarInstruccionEnLista(this.instrucciones[i], "lista-instrucciones");
    }
  },

  mostrarInstruccionEnLista : function(instruccion, idLista) {
    this.ul = document.getElementById(idLista);
    this.li = document.createElement("li");
    this.li.textContent = instruccion;
    this.ul.appendChild(this.li);
  },


  moverEnDireccion : function(direccion) {
     this.nuevaFilaPiezaVacia;
     this.nuevaColumnaPiezaVacia;

     // Mueve pieza hacia abajo, reemplazandola con la blanca
     if (direccion === this.codigosDireccion.ABAJO) {
     this.nuevaFilaPiezaVacia = this.filaVacia + 1;
     this.nuevaColumnaPiezaVacia = this.columnaVacia;
   }

  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === this.codigosDireccion.ARRIBA) {
    this.nuevaFilaPiezaVacia = this.filaVacia - 1;
    this.nuevaColumnaPiezaVacia = this.columnaVacia;
  }

  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === this.codigosDireccion.DERECHA) {
    this.nuevaFilaPiezaVacia = this.filaVacia;
    this.nuevaColumnaPiezaVacia = this.columnaVacia + 1;
  }

  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === this.codigosDireccion.IZQUIERDA) {
     this.nuevaFilaPiezaVacia = this.filaVacia;
     this.nuevaColumnaPiezaVacia = this.columnaVacia - 1;
  }

  /* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia.
  Para que esta parte del código funcione correctamente deberás haber implementado
  las funciones posicionValida, intercambiarPosicionesGrilla y actualizarPosicionVacia */

    if (this.posicionValida(this.nuevaFilaPiezaVacia, this.nuevaColumnaPiezaVacia)) {
        this.intercambiarPosiciones(this.filaVacia, this.columnaVacia, this.nuevaFilaPiezaVacia, this.nuevaColumnaPiezaVacia);
        this.actualizarPosicionVacia(this.nuevaFilaPiezaVacia, this.nuevaColumnaPiezaVacia);
        this.ultimoMovimiento(direccion);
        Imagen.iniciarImagen();
    }else{
        return;
      }
    },


  intercambiarPosiciones : function(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia) {
      this.piezaVacia = Pieza.piezas[filaVacia][columnaVacia];
      this.nuevaPiezaVacia = Pieza.piezas[nuevaFilaPiezaVacia][nuevaColumnaPiezaVacia];
      this.intercambiarPosicionesCanvas(this.piezaVacia, this.nuevaPiezaVacia);
    },


  intercambiarPosicionesCanvas : function(pieza1, pieza2) {
        this.temporal = pieza1.xActual ;
        pieza1.xActual = pieza2.xActual;
        pieza2.xActual = this.temporal;

        this.temporal = pieza1.yActual ;
        pieza1.yActual = pieza2.yActual;
        pieza2.yActual = this.temporal;

        this.temporal = pieza1.numeroPieza ;
        pieza1.numeroPieza = pieza2.numeroPieza;
        pieza2.numeroPieza = this.temporal;
    },


    actualizarPosicionVacia : function(nuevaFila, nuevaColumna) {
        this.filaVacia = nuevaFila;
        this.columnaVacia = nuevaColumna;
    },

    // Para chequear si la posicón está dentro de la grilla.
    posicionValida : function(fila, columna) {
      if ((fila <=this.cantidadDePiezasPorLado-1) && (fila >=0) && (columna <=this.cantidadDePiezasPorLado-1) && (columna >=0)){
          return true;
        }else{
          return false;
        }
      },


    ultimoMovimiento : function(direccion){
        if (this.terminoDeMezclar){
          this.movimientos.push(direccion);
          this.actualizarUltimoMovimiento(direccion);
          this.actualizarMovimientosRestantes();
          }
       },

     /* Actualiza la representación visual del último movimiento
     en la pantalla, representado con una flecha. */
       actualizarUltimoMovimiento : function(direccion) {
          this.ultimoMov = document.getElementById('flecha');
          switch (direccion) {
             case this.codigosDireccion.ARRIBA:
               this.ultimoMov.textContent = '↑';
             break;
             case this.codigosDireccion.ABAJO:
               this.ultimoMov.textContent = '↓';
             break;
             case this.codigosDireccion.DERECHA:
               this.ultimoMov.textContent = '→';
             break;
             case this.codigosDireccion.IZQUIERDA:
               this.ultimoMov.textContent = '←';
             break;
       }
         this.ultimosMovimientos += this.ultimoMov.textContent;

     },

     actualizarMovimientosRestantes : function() {
       this.cantidadMovimientosPermitidos--;
       document.getElementById("cantidad-movimientos-restantes").innerHTML = this.cantidadMovimientosPermitidos;
     },


    mezclarPiezas : function(veces) {
        if (veces <= 0) {
          this.terminoDeMezclar = true;
          return;
        }
        this.direcciones = [this.codigosDireccion.ABAJO, this.codigosDireccion.ARRIBA,
            this.codigosDireccion.DERECHA, this.codigosDireccion.IZQUIERDA
          ];
        this.direccion = this.direcciones[Math.floor(Math.random() * this.direcciones.length)];
        this.moverEnDireccion(this.direccion) ;
        setTimeout(function() {
            Juego.mezclarPiezas(veces - 1);
          });
      },


/* capturarTeclas: Esta función captura las teclas presionadas por el usuario.*/
    capturarTeclas : function() {
      document.body.onkeydown = (function(evento) {
        if (evento.which === this.codigosDireccion.ABAJO ||
          evento.which === this.codigosDireccion.ARRIBA ||
          evento.which === this.codigosDireccion.DERECHA ||
          evento.which === this.codigosDireccion.IZQUIERDA) {
          this.moverEnDireccion(evento.which);
          this.chequearSiGanoOPerdio();
          evento.preventDefault();
             }
         });
       },

  // Juego.seleccionarPiezaMouse = function() {
  capturarMouse : function() {
     this.canvas = Imagen.configurarCanvas('mi-canvas').canvas;
     this.canvas.addEventListener('mousedown', function(e) {
       var mousePos = Juego.getMousePos(this.canvas, e);
       var x = mousePos.x - this.offsetLeft;
       var y = mousePos.y - this.offsetTop;
       this.filaPiezaSeleccionada = Juego.determinarPieza(x, y).fila;
       this.columnaPiezaSeleccionada = Juego.determinarPieza(x,y).columna;
       Juego.moverDesdeMouse(this.filaPiezaSeleccionada, this.columnaPiezaSeleccionada);
      }, false);
    },

    getMousePos : function(canvas, e) {
        return {
          x: e.clientX,
          y: e.clientY
        };
      },

   determinarPieza : function(xMouse, yMouse) {
    for (i=0; i<Pieza.piezas.length; i++) {
        for (j=0; j<Pieza.piezas.length; j++) {
          var limiteInferiorPiezaX = i*Pieza.anchoPiezas;
          var limiteSuperiorPiezaX = (i+1)*Pieza.anchoPiezas;
          var limiteInferiorPiezaY = j*Pieza.altoPiezas;
          var limiteSuperiorPiezaY = (j+1)*Pieza.altoPiezas;
             if ((xMouse>limiteInferiorPiezaX) && (xMouse<limiteSuperiorPiezaX) && (yMouse>limiteInferiorPiezaY) && (yMouse<limiteSuperiorPiezaY)) {
               var fila = j;
               var columna = i;
              return {
                fila ,
                columna
                }
             }
          }
        }
     },

// Juego.direccionPiezaMouse = function(fila, columna) {
    moverDesdeMouse : function(fila, columna) {
      var direccion;
      if ((fila === this.filaVacia+1)&&(columna === this.columnaVacia)) {
        direccion = this.codigosDireccion.ABAJO;
      } else if ((fila === this.filaVacia-1)&&(columna === this.columnaVacia)) {
        direccion = this.codigosDireccion.ARRIBA;
      } else if ((columna === this.columnaVacia+1)&&(fila ===  this.filaVacia)) {
        direccion = this.codigosDireccion.DERECHA;
      } else if ((columna === this.columnaVacia-1)&&(fila === this.filaVacia)) {
        direccion = this.codigosDireccion.IZQUIERDA;
      }  else{
        swal("OJO!", "No podés hacer ese movimiento!", "error");
          return;
         }
        this.moverEnDireccion(direccion);
        this.chequearSiGanoOPerdio();
      },


  chequearSiGanoOPerdio : function() {
    this.gano = this.chequearSiGano();
    this.perdio = this.chequearSiPerdio();
      if (this.gano) {
        setTimeout(function() {
            Juego.mostrarCartelGanador();
            }, 500);
        }else{
          if (this.perdio) {
            setTimeout(function() {
                Juego.mostrarCartelPerdio();
                }, 500);
          }
        }
     },

   chequearSiGano : function() {
     for (i=0; i<Pieza.piezas.length; i++){
       for (j=0; j<Pieza.piezas[i].length; j++){
           if (Pieza.piezas[i][j].numeroPieza!== Pieza.grillaGanadora[i][j].numeroPieza) {
           return false;
                 }
               }
             }
           return true;
         },


   chequearSiPerdio : function() {
      if(this.cantidadMovimientosPermitidos === 0) {
        this.mostrarCartelPerdedor();
        return true;
      } else {
        return false;
      }
    },


  mostrarCartelGanador :function(){
      swal("Fantástico!","Lo hiciste en "+this.movimientos.length+" movimientos", "success");
    },

  mostrarCartelPerdedor : function() {
    swal("PERDISTE!!", "Querés seguir Jugando?", "warning");
  },


  calcularCantidadDeMovimientos : function(dificultad) {
     switch (dificultad) {
        case "facil":
          this.cantidadMovimientosPermitidos =  Math.max(Math.pow(this.cantidadDePiezasPorLado,4));
        break;
        case "intermedio":
          this.cantidadMovimientosPermitidos = Math.max(Math.pow(this.cantidadDePiezasPorLado,3));
        break;
        case "dificil":
           this.cantidadMovimientosPermitidos = Math.max(Math.pow(this.cantidadDePiezasPorLado,2));
        break;
      }
      document.getElementById("cantidad-movimientos-restantes").innerHTML = this.cantidadMovimientosPermitidos;
    },


 reiniciar : function () {
     this.filaVacia = this.cantidadDePiezasPorLado - 1;
     this.columnaVacia = this.cantidadDePiezasPorLado - 1;
     Pieza.calcularTamanioPiezas();
     Pieza.construirGrillaGanadora();
     Pieza.construirPiezas();
     Imagen.iniciarImagen();
 },


 iniciar : function() {
   this.mostrarInstrucciones(instrucciones);
   Imagen.cargarImagenInicial();
   this.capturarTeclas();
   this.capturarMouse();
   swal("Suerte!", "No te olvides de seleccionar la cantidad de piezas y el nivel de dificultad!");
   }
}


  Juego.mezclar.addEventListener('click', function() {
    if ((Juego.facil.checked)||(Juego.intermedio.checked)||(Juego.dificil.checked)) {
      Juego.terminoDeMezclar = false;
      var cantidadDeMezclas = Math.max(Math.pow(3,Juego.cantidadDePiezasPorLado)+30);
      Juego.mezclarPiezas(cantidadDeMezclas);
      Juego.reiniciar();
    }else{
      swal("Tenes que elegir el nivel de dificultad", "warning");
      }
  })

  Juego.piezasPorLado.addEventListener("change", function(e) {
     Juego.cantidadDePiezasPorLado = e.target.value;
     Pieza.piezas = [];
     Pieza.grillaGanadora = [];
     Juego.calcularCantidadDeMovimientos(Juego.dificultad);
     Juego.reiniciar();
   })

   Juego.nivel.addEventListener("change", function(e) {
     Juego.dificultad = e.target.value;
     Juego.calcularCantidadDeMovimientos(Juego.dificultad);
     Juego.actualizarMovimientosRestantes();
     Juego.reiniciar();
   })


// // Ejecutamos la función iniciar

  Juego.iniciar();
