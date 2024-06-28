const eventoModel = require("../models/eventoModel");

class EventoController {

  readList(req, res) {
    const retorno = eventoModel.readList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhum evento encontrado")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  read(req, res) {
    const { id } = req.params;
    const retorno = eventoModel.read(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Evento não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  create(req, res) {
    const reqBody = req.body; 
    const retorno = eventoModel.create(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Evento criado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  update(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
    const retorno = eventoModel.update(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Evento atualizado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  delete(req, res) {
    const { id } = req.params;
    const retorno = eventoModel.delete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Evento deletado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }
  
}

module.exports = new EventoController();