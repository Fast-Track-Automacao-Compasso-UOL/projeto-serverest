/// <reference types="cypress" />
import Rest from "./_rest.service"
import { criarBodyUsuario, criarBodyProduto, criarBodyLogin } from '../factories/dynamic';
import {ServeRest} from "./serveRest.service";

//const URL_USUARIOS = "/usuarios";
//const URL_LOGIN = "/login";
const URL_PRODUTOS = "/produtos";
//const URL_CARRINHOS = "/carrinhos";

export class Produtos extends ServeRest {
 
  // Cria um produto aleatório com Token recebido pelo cy.wrap()
  static criarProduto() {
    cy.get('@Token').then(authorization => {
      super.post(URL_PRODUTOS, criarBodyProduto(), { authorization }).then(res => {
        cy.wrap(res.body._id).as('IdProduto')
        cy.wrap(JSON.parse(res.requestBody)).as('Produto')
      })
    })
  }
}