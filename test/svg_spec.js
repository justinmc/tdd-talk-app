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
    // TODO Write some test cases for isColliding in src/svg.js,
    // then make it pass
  });
});
