function simpleLoader(content, map, meta) {
    console.log("我是 SimpleLoader");
  return `module.exports = "${content + 12344}"`
}
module.exports = simpleLoader;
