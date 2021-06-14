import { ServeRest } from "./serveRest.service"
import { criarBodyUsuario } from '../factories/dynamic';

const URL_USUARIOS = "/usuarios";

export class Usuarios extends ServeRest {
  // Busca dados de usuários já existentes e envia pelo cy.wrap()
  static buscarDadosUsuario(tipo = false) {
    let admin;
    if (tipo == 'admin') {
      admin = true;
    } else {
      admin = false;
    }
    super.get(`${URL_USUARIOS}?administrador=${admin}`).then((res) => {
      cy.wrap(res.body.usuarios[0].email).as("Email");
      cy.wrap(res.body.usuarios[0].password).as("Password");
    });
  }

  // Cria usuário(admin ou não), baseado no parâmetro recebido
  static criarUsuario(options = { admin: 'false' }) {
    super.post(URL_USUARIOS, criarBodyUsuario({ administrador: options.admin })).then(res => {
      cy.wrap(res.body._id).as('IdUsuario')
      cy.wrap(JSON.parse(res.requestBody)).as('Usuario')
    })
  }
}