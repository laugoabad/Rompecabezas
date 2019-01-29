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
  }


  Juego.mostrarInstrucciones = function(instrucciones) {
    for (i=0; i<this.instrucciones.length; i++) {
      Juego.mostrarInstruccionEnLista(this.instrucciones[i], "lista-instrucciones");
    }
  }

  Juego.mostrarInstruccionEnLista = function(instruccion, idLista) {
    this.ul = document.getElementById(idLista);
    this.li = document.createElement("li");
    this.li.textContent = instruccion;
    this.ul.appendChild(this.li);
  }


  Juego.moverEnDireccion = function(direccion) {
     this.nuevaFilaPiezaVacia;
     this.nuevaColumnaPiezaVacia;

     // Mueve pieza hacia abajo, reemplazandola con la blanca
     if (direccion === Juego.codigosDireccion.ABAJO) {
     this.nuevaFilaPiezaVacia = Juego.filaVacia + 1;
     this.nuevaColumnaPiezaVacia = Juego.columnaVacia;
   }

  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === Juego.codigosDireccion.ARRIBA) {
    this.nuevaFilaPiezaVacia = Juego.filaVacia - 1;
    this.nuevaColumnaPiezaVacia = Juego.columnaVacia;
  }

  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === Juego.codigosDireccion.DERECHA) {
    this.nuevaFilaPiezaVacia = Juego.filaVacia;
    this.nuevaColumnaPiezaVacia = Juego.columnaVacia + 1;
  }

  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === Juego.codigosDireccion.IZQUIERDA) {
     this.nuevaFilaPiezaVacia = Juego.filaVacia;
     this.nuevaColumnaPiezaVacia = Juego.columnaVacia - 1;
  }

  /* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia.
  Para que esta parte del código funcione correctamente deberás haber implementado
  las funciones posicionValida, intercambiarPosicionesGrilla y actualizarPosicionVacia */

    if (Juego.posicionValida(this.nuevaFilaPiezaVacia, this.nuevaColumnaPiezaVacia)) {
        Juego.intercambiarPosiciones(Juego.filaVacia, Juego.columnaVacia, this.nuevaFilaPiezaVacia, this.nuevaColumnaPiezaVacia);
        Juego.actualizarPosicionVacia(this.nuevaFilaPiezaVacia, this.nuevaColumnaPiezaVacia);
        Juego.ultimoMovimiento(direccion);
        Imagen.iniciarImagen();
    }else{
        return;
      }
    }


  Juego.intercambiarPosiciones = function(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia) {
      this.piezaVacia = Pieza.piezas[filaVacia][columnaVacia];
      this.nuevaPiezaVacia = Pieza.piezas[nuevaFilaPiezaVacia][nuevaColumnaPiezaVacia];
      Juego.intercambiarPosicionesCanvas(this.piezaVacia, this.nuevaPiezaVacia);
    }


  Juego.intercambiarPosicionesCanvas = function(pieza1, pieza2) {
        this.temporal = pieza1.xActual ;
        pieza1.xActual = pieza2.xActual;
        pieza2.xActual = this.temporal;

        this.temporal = pieza1.yActual ;
        pieza1.yActual = pieza2.yActual;
        pieza2.yActual = this.temporal;

        this.temporal = pieza1.numeroPieza ;
        pieza1.numeroPieza = pieza2.numeroPieza;
        pieza2.numeroPieza = this.temporal;
    }


    Juego.actualizarPosicionVacia = function(nuevaFila, nuevaColumna) {
        Juego.filaVacia = nuevaFila;
        Juego.columnaVacia = nuevaColumna;
    }

    // Para chequear si la posicón está dentro de la grilla.
    Juego.posicionValida = function(fila, columna) {
      if ((fila <=Juego.cantidadDePiezasPorLado-1) && (fila >=0) && (columna <=Juego.cantidadDePiezasPorLado-1) && (columna >=0)){
          return true;
        }else{
          return false;
        }
      }


    Juego.ultimoMovimiento = function(direccion){
        if (Juego.terminoDeMezclar){
          Juego.movimientos.push(direccion);
          Juego.actualizarUltimoMovimiento(direccion);
          Juego.actualizarMovimientosRestantes();
          }
       }

     /* Actualiza la representación visual del último movimiento
     en la pantalla, representado con una flecha. */
       Juego.actualizarUltimoMovimiento = function(direccion) {
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
         Juego.ultimosMovimientos += this.ultimoMov.textContent;

     }

     Juego.actualizarMovimientosRestantes = function() {
       Juego.cantidadMovimientosPermitidos--;
       document.getElementById("cantidad-movimientos-restantes").innerHTML = Juego.cantidadMovimientosPermitidos;
      }


    Juego.mezclarPiezas = function(veces) {
        if (veces <= 0) {
          Juego.terminoDeMezclar = true;
          return;
        }
        this.direcciones = [Juego.codigosDireccion.ABAJO, Juego.codigosDireccion.ARRIBA,
            Juego.codigosDireccion.DERECHA, Juego.codigosDireccion.IZQUIERDA
          ];
        this.direccion = this.direcciones[Math.floor(Math.random() * this.direcciones.length)];
        Juego.moverEnDireccion(this.direccion) ;
        setTimeout(function() {
            Juego.mezclarPiezas(veces - 1);
          });
      }


/* capturarTeclas: Esta función captura las teclas presionadas por el usuario.*/
    Juego.capturarTeclas = function() {
      document.body.onkeydown = (function(evento) {
        if (evento.which === Juego.codigosDireccion.ABAJO ||
          evento.which === Juego.codigosDireccion.ARRIBA ||
          evento.which === Juego.codigosDireccion.DERECHA ||
          evento.which === Juego.codigosDireccion.IZQUIERDA) {
          Juego.moverEnDireccion(evento.which);
          Juego.chequearSiGanoOPerdio();
          evento.preventDefault();
             }
         });
        }

  // Juego.seleccionarPiezaMouse = function() {
  Juego.capturarMouse = function() {
     this.canvas = Imagen.configurarCanvas('mi-canvas').canvas;
     this.canvas.addEventListener('mousedown', function(e) {
       var mousePos = Juego.getMousePos(this.canvas, e);
       var x = mousePos.x - this.offsetLeft;
       var y = mousePos.y - this.offsetTop;
       this.filaPiezaSeleccionada = Juego.determinarPieza(x, y).fila;
       this.columnaPiezaSeleccionada = Juego.determinarPieza(x,y).columna;
       Juego.moverDesdeMouse(this.filaPiezaSeleccionada, this.columnaPiezaSeleccionada);
      }, false);
       }

    Juego.getMousePos = function(canvas, e) {
        return {
          x: e.clientX,
          y: e.clientY
        };
      }

   Juego.determinarPieza = function(xMouse, yMouse) {
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
     }

// Juego.direccionPiezaMouse = function(fila, columna) {
    Juego.moverDesdeMouse = function(fila, columna) {
      var direccion;
      if ((fila === Juego.filaVacia+1)&&(columna === Juego.columnaVacia)) {
        direccion = Juego.codigosDireccion.ABAJO;
      } else if ((fila === Juego.filaVacia-1)&&(columna === Juego.columnaVacia)) {
        direccion = Juego.codigosDireccion.ARRIBA;
      } else if ((columna === Juego.columnaVacia+1)&&(fila ===  Juego.filaVacia)) {
        direccion = Juego.codigosDireccion.DERECHA;
      } else if ((columna === Juego.columnaVacia-1)&&(fila === Juego.filaVacia)) {
        direccion = Juego.codigosDireccion.IZQUIERDA;
      }  else{
        swal("OJO!", "No podés hacer ese movimiento!", "error");
          return;
         }
        Juego.moverEnDireccion(direccion);
        Juego.chequearSiGanoOPerdio();
      }


  Juego.chequearSiGanoOPerdio = function() {
    this.gano = Juego.chequearSiGano();
    this.perdio = Juego.chequearSiPerdio();
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
     }

   Juego.chequearSiGano = function() {
     for (i=0; i<Pieza.piezas.length; i++){
       for (j=0; j<Pieza.piezas[i].length; j++){
           if (Pieza.piezas[i][j].numeroPieza!== Pieza.grillaGanadora[i][j].numeroPieza) {
           return false;
                 }
               }
             }
           return true;
           }


   Juego.chequearSiPerdio = function() {
      if(Juego.cantidadMovimientosPermitidos === 0) {
        Juego.mostrarCartelPerdedor();
        return true;
      } else {
        return false;
      }
    }


  Juego.mostrarCartelGanador = function(){
      swal("Fantástico!","Lo hiciste en "+Juego.movimientos.length+" movimientos", "success");
    }

  Juego.mostrarCartelPerdedor = function() {
    swal("PERDISTE!!", "Querés seguir Jugando?", "warning");
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
     Pieza.piezas =[];
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


   Juego.calcularCantidadDeMovimientos = function(dificultad) {
      switch (dificultad) {
         case "facil":
           Juego.cantidadMovimientosPermitidos =  Math.max(Math.pow(Juego.cantidadDePiezasPorLado,4));
         break;
         case "intermedio":
           Juego.cantidadMovimientosPermitidos = Math.max(Math.pow(Juego.cantidadDePiezasPorLado,3));
         break;
         case "dificil":
            Juego.cantidadMovimientosPermitidos = Math.max(Math.pow(Juego.cantidadDePiezasPorLado,2));
         break;
       }
       document.getElementById("cantidad-movimientos-restantes").innerHTML = Juego.cantidadMovimientosPermitidos;
     }


  Juego.reiniciar = function () {
      Juego.filaVacia = Juego.cantidadDePiezasPorLado - 1;
      Juego.columnaVacia = Juego.cantidadDePiezasPorLado - 1;
      Pieza.calcularTamanioPiezas();
      Pieza.construirGrillaGanadora();
      Pieza.construirPiezas();
      Imagen.iniciarImagen();
  }


  Juego.iniciar = function() {
    Juego.mostrarInstrucciones(instrucciones);
    Imagen.cargarImagenInicial();
    Juego.capturarTeclas();
    Juego.capturarMouse();
    swal("Suerte!", "No te olvides de seleccionar la cantidad de piezas y el nivel de dificultad!");
    }

// // Ejecutamos la función iniciar

  Juego.iniciar();
