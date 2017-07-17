const svgConstants = require('./svg_constants');

module.exports = function rectangleFactory(x, y, width, height) {
  const rect = document.createElementNS(svgConstants.NS, 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', width);
  rect.setAttribute('height', height);
  rect.setAttribute('fill', 'black');

  return rect;
}
