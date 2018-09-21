export const foregroundRgbColor = (r, g, b) => {
  let hsl = rgbToHsl(r, g, b);
  return convert(hsl);
}

const rgbToHsl = (r, g, b) => {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

export const foregroundHexColor = (hex) => {
  var rgb = hexToHsl(hex);
  let hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  return convert(hsl);
}

const hexToHsl = (hex) => {
  var rgb = hexToRgb(hex);
  return [rgb.r, rgb.g, rgb.b];
}

const hexToRgb = (hex) => {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const convert = (hsl) => {
  hsl[0] = (hsl[0] + 0.5) % 1;
  hsl[1] = (hsl[1] + 0.5) % 1;
  hsl[2] = (hsl[2] + 0.5) % 1;
  return 'hsl(' + (hsl[0] * 360) + ',' + (hsl[1] * 100) + '%,' + (hsl[2] * 100) + '%)';
}