/// <reference types="cypress" />

import Rest from './_rest.service';
import req_body from '../fixtures/login/req_body.json'

const URL_BASE = Cypress.config("baseUrl");
const URL_USUARIOS = "/usuarios";
const URL_LOGIN = "/login";
const URL_PRODUTOS = "/produtos";
const URL_CARRINOS = "/carrinhos";

export class ServeRest extends Rest {

    static realizar_login() {
        //ajustar seleção de body
        let body = {
            "email": "fulano@qa.com",
            "password": "teste"
        }
            
        super.post(URL_BASE + URL_LOGIN, body).then(res => {
            cy.wrap(res.body).as('body');
        });
    }

    static validar_esquema(schema, status) {
        cy.get('@body').then(body => {
            cy.validateSchema(body, `${schema}/${status}`);
        })
    }

    static validar_mensagem(atributo, mensagem) {
        cy.get('@body').its(atributo).should('eq', mensagem)
    }

}
