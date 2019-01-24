
/*global window*/
/*global document*/

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function roundRect(context, x, y, width, height, radius, hiddenBg) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
  context.stroke();
  if (!hiddenBg) {
    context.fill();
  }
}

export function wrapText(context, text, x, y, width, height, lineHeight) {
  context.textAlign = "center";
  context.textBaseline = "middle";
  x = x + width / 2;
  y = y + height / 2;

  let cars = text.split("\n");

  for (let ii = 0; ii < cars.length; ii++) {
    let line = "";
    let words = cars[ii].split(" ");

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > width) {
        line = words[n] + " ";
        y -= lineHeight / 2;
      } else {
        line = testLine;
      }
    }

    line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > width) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x, y);
    y += lineHeight;
  }
}

export function colorLuminance(hex, lum) {
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;
  let rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}

export function cloneObj(obj) {
  if (obj == null || typeof obj != "object") return obj;

  let temp = obj.constructor();

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = cloneObj(obj[key]);
    }
  }
  return temp;
}

export function trackTransforms(ctx) {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let xform = svg.createSVGMatrix();
  ctx.getTransform = function() {
    return xform;
  };

  let savedTransforms = [];
  let save = ctx.save;
  ctx.save = function() {
    savedTransforms.push(xform.translate(0, 0));
    return save.call(ctx);
  };
  let restore = ctx.restore;
  ctx.restore = function() {
    xform = savedTransforms.pop();
    return restore.call(ctx);
  };

  let scale = ctx.scale;
  ctx.scale = function(sx, sy) {
    xform = xform.scaleNonUniform(sx, sy);
    return scale.call(ctx, sx, sy);
  };
  let rotate = ctx.rotate;
  ctx.rotate = function(radians) {
    xform = xform.rotate((radians * 180) / Math.PI);
    return rotate.call(ctx, radians);
  };
  let translate = ctx.translate;
  ctx.translate = function(dx, dy) {
    xform = xform.translate(dx, dy);
    return translate.call(ctx, dx, dy);
  };
  let transform = ctx.transform;
  ctx.transform = function(a, b, c, d, e, f) {
    let m2 = svg.createSVGMatrix();
    m2.a = a;
    m2.b = b;
    m2.c = c;
    m2.d = d;
    m2.e = e;
    m2.f = f;
    xform = xform.multiply(m2);
    return transform.call(ctx, a, b, c, d, e, f);
  };
  let setTransform = ctx.setTransform;
  ctx.setTransform = function(a, b, c, d, e, f) {
    xform.a = a;
    xform.b = b;
    xform.c = c;
    xform.d = d;
    xform.e = e;
    xform.f = f;
    return setTransform.call(ctx, a, b, c, d, e, f);
  };
  let pt = svg.createSVGPoint();
  ctx.transformedPoint = function(x, y) {
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(xform.inverse());
  };
}

export function getObjById(listObj, idObj) {
  for (let i = 0; i < listObj.length; i++) {
    if (listObj[i].id == idObj) {
      return listObj[i];
    }
  }
  return null;
}
