const svgNS = 'http://www.w3.org/2000/svg';

const svg = document.createElementNS(svgNS, 'svg');
svg.setAttribute('viewBox', '0 0 100 100');
svg.setAttribute('width', '100');
svg.setAttribute('height', '100');

const rect1 = document.createElementNS(svgNS, 'rect');
rect1.setAttribute('x', '10');
rect1.setAttribute('y', '10');
rect1.setAttribute('width', '10');
rect1.setAttribute('height', '10');
rect1.setAttribute('fill', 'black');
svg.appendChild(rect1);

const rect2 = document.createElementNS(svgNS, 'rect');
rect2.setAttribute('x', '60');
rect2.setAttribute('y', '60');
rect2.setAttribute('width', '10');
rect2.setAttribute('height', '10');
rect2.setAttribute('fill', 'black');
svg.appendChild(rect2);

document.body.prepend(svg);
