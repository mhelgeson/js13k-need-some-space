/**
 * Embeds streamed script content into a minimal html page
 */

process.stdout.write(
  '<!doctype html><html><head><meta charset="utf-8"></head>' +
    '<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />' +
    "<body><script>"
);
process.stdin
  .on("data", (data) => process.stdout.write(data.toString()))
  .on("end", () => process.stdout.write("</script></body></html>"));
