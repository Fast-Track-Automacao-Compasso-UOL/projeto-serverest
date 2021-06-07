/// <reference types="cypress" />

import Rest from './_rest.service';

const URL_BASE = Cypress.config("baseUrl");
const URL_USUARIOS = "/usuarios";
const URL_LOGIN = "/login";
const URL_PRODUTOS = "/produtos";
const URL_CARRINOS = "/carrinhos";

export class ServeRest extends Rest {

    static realizar_login() {
        let body = {
            "email": "fulano@qa.com",
            "password": "teste"
          };
        
        super.post(URL_BASE + URL_LOGIN, body).then(res => {
            cy.wrap(res.body).as('body');
        });
    }

    static armazenar_resposta(res) {
        cy.wrap(res).as('res');
    }
    static validar_esquema(res, schema) {

        cy.validateSchema(res, schema);
    }

    static validar_mensagem(mensagem) {
        cy.get('@res.message').should('contain', mensagem)
    }

}
