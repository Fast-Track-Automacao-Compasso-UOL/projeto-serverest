/// <reference types="cypress" />
import Rest from "./_rest.service"
import { ServeRest } from "./serveRest.service";
import { criarBodyUsuario, criarBodyProduto, criarBodyLogin } from '../factories/dynamic';


const URL_CARRINHOS = "/carrinhos";

export class Carrinhos extends ServeRest {
// Cria um carrinho com id do produto recebido pelo cy.wrap()
static criarCarrinho() {
    cy.get('@IdProduto').then(idProduto => {
      cy.get('@Token').then(authorization => {
        super.post(URL_CARRINHOS, {
          produtos: [
            {
              "idProduto": idProduto,
              "quantidade": 1
            }
          ]
        },
          { authorization })
      })
    })
  }

}