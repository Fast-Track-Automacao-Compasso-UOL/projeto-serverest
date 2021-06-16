import { ServeRest } from "./serveRest.service"
import { criarBodyUsuario } from '../factories/dynamic';

const URL_USUARIOS = "/usuarios";

export class Usuarios extends ServeRest {
  // Cria usuário(admin ou não), baseado no parâmetro recebido
  static criarUsuario(options = { admin: 'false' }) {
    super.post(URL_USUARIOS, criarBodyUsuario({ administrador: options.admin })).then(res => {
      cy.wrap(res.body._id).as('IdUsuario')
      cy.wrap(JSON.parse(res.requestBody)).as('Usuario')
    })
  }
}