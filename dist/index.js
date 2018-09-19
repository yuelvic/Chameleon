'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var foregroundColor = exports.foregroundColor = function foregroundColor(r, g, b) {
  var hsl = rgbToHsl(r, g, b);
  hsl[0] = (hsl[0] + 0.5) % 1;
  hsl[1] = (hsl[1] + 0.5) % 1;
  hsl[2] = (hsl[2] + 0.5) % 1;
  return 'hsl(' + hsl[0] * 360 + ',' + hsl[1] * 100 + '%,' + hsl[2] * 100 + '%)';
};

var rgbToHsl = function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h,
      s,
      l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);break;
      case g:
        h = (b - r) / d + 2;break;
      case b:
        h = (r - g) / d + 4;break;
    }
    h /= 6;
  }
  return [h, s, l];
};