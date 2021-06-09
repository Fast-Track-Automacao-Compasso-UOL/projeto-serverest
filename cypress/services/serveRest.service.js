/// <reference types="cypress" />
import Rest from "./_rest.service"
import faker from "faker"

const URL_BASE = Cypress.config("baseUrl");
const URL_USUARIOS = "/usuarios";
const URL_LOGIN = "/login";
const URL_PRODUTOS = "/produtos";
const URL_CARRINOS = "/carrinhos";

export class ServeRest extends Rest {
  // Armazena rota baseado no parâmetro recebido
  static armazenarRota(rota) {
    cy.wrap(rota).as("Rota");
    cy.wrap("").as("Token");
    cy.wrap("").as("Body");
  }

  //Adiciona complemento recebido pelo parâmetro na rota recebida pelo cy.wrap()
  static adicionarComplemento(id) {
    cy.get("@Rota").then((rota) => {
      switch (id) {
        case "válido":
          id = "BeeJh5lz3k6kSIzA";
          break;
        case "inválido":
          id = "BeeJh5lz3k6kSIzA1";
          break;
      }
      cy.wrap(`${rota}/${id}`).as("Rota");
    });
  }

  // Adiciona query params à rota recebida pelo cy.wrap()
  static adicionarQueryParams(param, valor) {
    cy.get('@Rota').then(rota => {
      if (param && valor) {
        cy.wrap(`${rota}?${param}=${valor}`).as('Rota')
      } else {
        cy.wrap(rota).as('Rota')
      }
    })
  }

  // Adiciona complemento recebido pelo parâmetro na rota recebida pelo cy.wrap()
  static adicionarComplemento(complemento) {
    cy.get('@Rota').then(rota => {
      cy.wrap(`${rota}/${complemento}`).as('Rota')
    })
  }

  // Realiza requisição com rota recebida pelo cy.wrap() e tipo recebido no parâmetro
  static realizarRequisicao(tipo, body = "") {
    cy.get('@Rota').then(rota => {
      switch (tipo) {
        case "GET":
          super.get(rota).then((res) => {
            cy.wrap(res).as("Response");
            cy.wrap(res.body).as("Body");
            cy.wrap(res.status).as("Status");
          });
          break;
        case "POST":
          cy.get("@Token").then((token) => {
            super.post(rota, body, { authorization: token }).then((res) => {
              cy.wrap(res).as("Response");
              cy.wrap(res.body).as("Body");
              cy.wrap(res.status).as("Status");
            });
          });
          break;
        case "DELETE":
          super.delete(rota, body).then((res) => {
            cy.wrap(res).as("Response");
            cy.wrap(res.body).as("Body");
            cy.wrap(res.status).as("Status");
          });
          break;
        case "PUT":
          super.put(rota, body).then((res) => {
            cy.wrap(res).as("Response");
            cy.wrap(res.body).as("Body");
            cy.wrap(res.status).as("Status");
          });
          break;
        default:
          break;
      }
    });
  }

  // Valida schema e status com body da requisição recebido pelo cy.wrap() e parâmetros
  static validarSchemaEStatus(schema, status) {
    cy.get("@Body").then((body) => {
      cy.validateSchema(body, `${schema}/${status}`);
    });
  }

  static adicionarBody(body) {
    cy.wrap(body).as("Body");
  }

  // static validarAuthorization (auth){
  //   switch (Token) {
  //     case "válida":
  //       token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNjIzMTgyMjY5LCJleHAiOjE2MjMxODI4Njl9.C2LPuX9wKCGGDzjitoHaTuNgQk8sVe6InFGbdooVgKc" // Terminar esse caso
  //       break;
  //     case "inválida":
  //       token = "AUTHJIUzI1NiIsInRINVALIDA"
  //       break;
  //   }
  //   cy.wrap(token).as('Token');

  // }

  static validarMensagem(mensagem) {
    cy.get("@Body").then((body) => {
      expect(Object.values(body)).to.contain(mensagem);
    });
  }
}