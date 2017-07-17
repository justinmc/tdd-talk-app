const svgConstants = require('./svg_constants');

module.exports = function rectangleFactory(x, y) {
  const rect = document.createElementNS(svgConstants.NS, 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', '10');
  rect.setAttribute('height', '10');
  rect.setAttribute('fill', 'black');

  return rect;
}
