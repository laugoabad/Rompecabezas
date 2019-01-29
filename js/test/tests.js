var expect = chai.expect;

describe('Creación', function() {
    'use strict';

describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (!window.Juego){
        done(err);
      }
      else{
        done();
      }
    });
});

describe('Tamaño de la grilla Ganadora', function() {
    it('La grilla tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 5;
      Pieza.construirGrillaGanadora();
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Pieza.grillaGanadora.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Pieza.grillaGanadora[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
  });

describe('Tamaño de la Grilla para Canvas', function() {
    it('La grilla tiene el tamaño correcto', function() {
      Juego.cantidadDePiezasPorLado = 5;
      Pieza.construirPiezas();
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Pieza.piezas.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Pieza.piezas[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
  });

  describe('Tamaño de las piezas para Canvas', function() {
      it('Las piezas tienen el tamaño correcto', function() {
        Juego.cantidadDePiezasPorLado = 5;
        Pieza.calcularTamanioPiezas();
        //se evalua si el tamaño de las piezas es correcto
        expect(Pieza.anchoPiezas).to.equal(120);
        expect(Pieza.altoPiezas).to.equal(120);
      });
    });

describe('Crea correctamente las piezas para el Canvas', function() {
    it('Las coordenadas de las piezas creadas son correctas', function() {
      Juego.cantidadDePiezasPorLado = 2;
      Juego.anchoPiezas = 300;
      Juego.altoPiezas = 300;
      Pieza.construirPiezas();


      expect(Pieza.piezas[0][0].xOriginal).to.equal(0);
      expect(Pieza.piezas[0][0].yOriginal).to.equal(0);
      expect(Pieza.piezas[0][0].xActual).to.equal(0);
      expect(Pieza.piezas[0][0].yActual).to.equal(0);
      expect(Pieza.piezas[0][0].numeroPieza).to.equal(1);

      expect(Pieza.piezas[0][1].xOriginal).to.equal(300);
      expect(Pieza.piezas[0][1].yOriginal).to.equal(0);
      expect(Pieza.piezas[0][1].xActual).to.equal(300);
      expect(Pieza.piezas[0][1].yActual).to.equal(0);
      expect(Pieza.piezas[0][1].numeroPieza).to.equal(2);

      expect(Pieza.piezas[1][0].xOriginal).to.equal(0);
      expect(Pieza.piezas[1][0].yOriginal).to.equal(300);
      expect(Pieza.piezas[1][0].xActual).to.equal(0);
      expect(Pieza.piezas[1][0].yActual).to.equal(300);
      expect(Pieza.piezas[1][0].numeroPieza).to.equal(3);

      expect(Pieza.piezas[1][1].xOriginal).to.equal(300);
      expect(Pieza.piezas[1][1].yOriginal).to.equal(300);
      expect(Pieza.piezas[1][1].xActual).to.equal(300);
      expect(Pieza.piezas[1][1].yActual).to.equal(300);
      expect(Pieza.piezas[1][1].numeroPieza).to.equal(4);
    });
  });
});
