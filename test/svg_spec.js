const expect = require('chai').expect;
const { isColliding, toViewBoxCoords } = require('../src/svg');
const svgConstants = require('../src/svg_constants');

describe('svg', () => {
  describe('toViewBoxCoords', () => {
    const width = 1200;
    const height = 800;
    let x;
    let y;

    it('is a function', () => {
      expect(toViewBoxCoords).to.be.a('function');
    });

    describe('when browser point is at the origin', () => {
      beforeEach(() => {
        x = 0;
        y = 0;
      });

      it('gives an svg point at the origin', () => {
        const svgCoords = toViewBoxCoords(width, height, x, y);
        expect(svgCoords.x).to.equal(0);
        expect(svgCoords.y).to.equal(0);
      });
    });

    describe('when browser point is opposite the origin', () => {
      beforeEach(() => {
        x = width;
        y = height;
      });

      it('gives an svg point at the origin', () => {
        const svgCoords = toViewBoxCoords(width, height, x, y);
        expect(svgCoords.x).to.equal(svgConstants.DIMENSIONS_X);
        expect(svgCoords.y).to.equal(svgConstants.DIMENSIONS_Y);
      });
    });

    describe('when browser point is in the center', () => {
      beforeEach(() => {
        x = width / 2;
        y = height / 2;
      });

      it('gives an svg point at the center of the svg', () => {
        const svgCoords = toViewBoxCoords(width, height, x, y);
        expect(svgCoords.x).to.equal(svgConstants.DIMENSIONS_X / 2);
        expect(svgCoords.y).to.equal(svgConstants.DIMENSIONS_Y / 2);
      });
    });
  });

  describe('isColliding', () => {
    let boxA;
    let boxB;

    beforeEach(() => {
      boxA = {};
      boxB = {};
    });

    describe('when they\'re directly on top of each other', () => {
      beforeEach(() => {
        boxA = {
          x: 0,
          y: 0,
          width: 10,
          height: 10,
        };
        boxB = Object.assign({}, boxA);
      });

      it('returns true', () => {
        expect(isColliding(boxA, boxB)).to.be.true;
      });
    });

    describe('when one is fully to the side of the other', () => {
      beforeEach(() => {
        boxA = {
          x: 0,
          y: 0,
          width: 10,
          height: 10,
        };
        boxB = {
          x: 11,
          y: 0,
          width: 10,
          height: 10,
        };
      });

      it('returns false', () => {
        expect(isColliding(boxA, boxB)).to.be.false;
      });
    });

    describe('when they overlap in the x direction', () => {
      beforeEach(() => {
        boxA.x = 0;
        boxA.width = 10;
        boxB.x = 5;
        boxB.width = 10;
      });

      describe('when they also overlap in the y direction', () => {
        beforeEach(() => {
          boxA.y = 0;
          boxA.height = 10;
          boxB.y = 5;
          boxB.height = 10;
        });

        it('returns true', () => {
          expect(isColliding(boxA, boxB)).to.be.true;
        });
      });

      describe('when they do not overlap in the y direction', () => {
        beforeEach(() => {
          boxA.y = 0;
          boxA.height = 10;
          boxB.y = 20;
          boxB.height = 10;
        });

        it('returns false', () => {
          expect(isColliding(boxA, boxB)).to.be.false;
        });
      });
    });

    describe('when they do not overlap in the x direction', () => {
      beforeEach(() => {
        boxA.x = 0;
        boxA.width = 10;
        boxB.x = 20;
        boxB.width = 10;
      });

      describe('when they overlap in the y direction', () => {
        beforeEach(() => {
          boxA.y = 0;
          boxA.height = 10;
          boxB.y = 5;
          boxB.height = 10;
        });

        it('returns false', () => {
          expect(isColliding(boxA, boxB)).to.be.false;
        });
      });

      describe('when they do not overlap in the y direction', () => {
        beforeEach(() => {
          boxA.y = 0;
          boxA.height = 10;
          boxB.y = 20;
          boxB.height = 10;
        });

        it('returns false', () => {
          expect(isColliding(boxA, boxB)).to.be.false;
        });
      });
    });
  });
});
