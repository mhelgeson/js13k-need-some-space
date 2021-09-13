/*
  Converts SVG Path definitions to canvas paths.
  Would rather user Path2D but there is no MSIE support
  https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D
*/

// static regular expressions
const COMMANDS = /\s*([MLHVCSQTAEZ][\s,-\d\.]*)/gi;
const ABSOLUTE = /[A-Z]/;
const VALUES = /(-?\d+(\.\d+(e-?\d)?)?)/g;
const COMMAS = /,/g;

const parse = (cmd) => (cmd.match(VALUES) || []).map(parseFloat);

const canvasPath = (ctx, pathString) => {
  // keep track of absolute position for relative coordinates
  let x = 0;
  let y = 0;
  let cp1 = { x, y };
  let cp2 = { x, y };
  if (Array.isArray(pathString)) {
    return canvasPath(ctx, pathString.join());
  }
  if (typeof pathString == "string") {
    ctx.beginPath();
    // console.group(pathString);
    pathString
      .replace(COMMAS, " ")
      .split(COMMANDS)
      .forEach((cmd) => {
        const [a, b, c, d, e, f, g, h] = parse(cmd || "");
        // cmd && console.log(cmd, { a, b, c, d, e, f, g, h });
        // detect absolute vs relative commands
        const isAbsolute = ABSOLUTE.test(cmd);
        // switch case insensitive commands
        switch ((cmd[0] || "").toUpperCase()) {
          case "M": // move
            x = isAbsolute ? a : x + a;
            y = isAbsolute ? b : y + b;
            ctx.moveTo(x, y);
            break;
          case "L": // line
            x = isAbsolute ? a : x + a;
            y = isAbsolute ? b : y + b;
            ctx.lineTo(x, y);
            break;
          case "H": // horiz line
            x = isAbsolute ? a : x + a;
            ctx.lineTo(x, y);
            break;
          case "V": // vert line
            y = isAbsolute ? a : y + a;
            ctx.lineTo(x, y);
            break;
          case "C": // cubic bezier
            cp1.type = "C";
            cp1.x = isAbsolute ? a : x + a;
            cp1.y = isAbsolute ? b : y + b;
            cp2.type = "C";
            cp2.x = isAbsolute ? c : x + c;
            cp2.y = isAbsolute ? d : y + d;
            x = isAbsolute ? e : x + e;
            y = isAbsolute ? f : y + f;
            ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, x, y);
            break;
          case "S": // smooth cubic bezier
            cp1.type = "C";
            cp1.x = cp2.type === "C" ? cp2.x : x;
            cp1.y = cp2.type === "C" ? cp2.y : y;
            cp2.type = "C";
            cp2.x = isAbsolute ? a : x + a;
            cp2.y = isAbsolute ? b : y + b;
            x = isAbsolute ? c : x + c;
            y = isAbsolute ? d : y + d;
            ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, x, y);
            break;
          case "Q": // quadratic bezier
            cp1.type = "Q";
            cp1.x = isAbsolute ? a : x + a;
            cp1.y = isAbsolute ? b : y + b;
            x = isAbsolute ? c : x + c;
            y = isAbsolute ? d : y + d;
            ctx.quadraticCurveTo(cp1.x, cp1.y, x, y);
            break;
          case "T": // smooth quadratic bezier
            cp1.type = "Q";
            cp1.x = cp1.type === "Q" ? cp1.x : x;
            cp1.y = cp1.type === "Q" ? cp1.y : y;
            x = isAbsolute ? a : x + a;
            y = isAbsolute ? b : y + b;
            ctx.quadraticCurveTo(cp1.x, cp1.y, x, y);
            break;
          case "A": // elliptical arc
            // svg path arc is too hard to use and too much trouble to implement
            // https://observablehq.com/@awhitty/svg-2-elliptical-arc-to-canvas-path2d
            break;
          case "E": // CUSTOM ellipse command for straight canvas method
            x = isAbsolute ? a : x + a;
            y = isAbsolute ? b : y + b;
            ctx.ellipse(x, y, c, d, e, f, g, h);
            break;
          case "Z": // close path
            ctx.closePath();
            break;
          default:
            // nothing
            break;
        }
      });
    // console.groupEnd();
  }
};

export default canvasPath;
