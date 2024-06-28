const perfilRouters = require("./perfilRouter.js");
const usuarioRouters = require("./usuarioRouter.js");
const espacoRouters = require("./espacoRouter.js");
const arquivoRouters = require("./arquivoRouter.js");
const eventoRouters = require("./eventoRouter.js");
const linkRouters = require("./linkRouter.js");
const imagemRouters = require("./imagemRouter.js");
const categoriaRouters = require("./categoriaRouter.js");
const categoriaEventoRouters = require("./categoriaEventoRouter.js");
const reacaoRouters = require("./reacaoRouter.js");
const reacaoUsuarioRouters = require("./reacaoUsuarioRouter.js");

module.exports = function (app, express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(perfilRouters);
  app.use(usuarioRouters);
  app.use(espacoRouters);
  app.use(arquivoRouters);
  app.use(eventoRouters);
  app.use(linkRouters);
  app.use(imagemRouters);
  app.use(categoriaRouters);
  app.use(categoriaEventoRouters);
  app.use(reacaoRouters);
  app.use(reacaoUsuarioRouters);
};