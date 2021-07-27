class kariModules {
  static randNumer (targetLevel) {
   if (isNaN(targetLevel) || isNaN(parseInt(targetLevel, 10))) throw new TypeError("número valido não encontrado.");
    if (isNaN(targetLevel)) targetLevel = parseInt(targetLevel, 10);
    if (targetLevel < 1) throw new RangeError("número positivo não encontrado.");
    let randomnumero = Math.floor(Math.random() * 10) + 1
    return Math.floor(Math.random() *targetLevel) + randomnumero
  }
  static normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
 }
}
module.exports = kariModules;