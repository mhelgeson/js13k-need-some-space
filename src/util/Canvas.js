const Canvas = (width, height, parent) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  if (parent) {
    parent.appendChild(canvas);
  }
  return { canvas, ctx };
};

export default Canvas;
