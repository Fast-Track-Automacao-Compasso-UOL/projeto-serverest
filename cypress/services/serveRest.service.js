/// <reference types="cypress" />
import Rest from "./_rest.service"
import faker from "faker"

export class ServeRest extends Rest {
  // Armazena rota baseado no parâmetro recebido
  static armazenarRota(rota) {
    cy.wrap(rota).as('Rota');
    cy.wrap('').as('Body')
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
          Rest.get(rota).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
          })
          break;
        case "POST":
          Rest.post(rota, body).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
          })
          break;
        case "DELETE":
          Rest.delete(rota, body).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
          })
          break;
        default:
          break;
      }
    })
  }

  // Valida schema e status com body da requisição recebido pelo cy.wrap() e parâmetros
  static validarSchemaEStatus(schema, status) {
    cy.get('@Body').then(body => {
      cy.validateSchema(body, `${schema}/${status}`)
    })
  }

  // Cria variável 'Body' com valor recebido pelo parâmetro
  static adicionarBody(body) {
    cy.wrap(body).as('Body')
  }

  // Valida mensagem contida no body da requisição
  static validarMensagem(mensagem) {
    cy.get('@Body').then(body => {
      expect(Object.values(body)).to.contain(mensagem)
    })
  }

  static criarUsuario(options) {
    switch (options) {
      case "sem carrinho":
        Rest.post("/usuarios",
          {
            "nome": "Fulano da Silva",
            "email": faker.internet.email(),
            "password": "teste",
            "administrador": "true"
          }
        ).then(res => {
          cy.wrap(res.body._id).as('Id')
        })
        break;

      case "com carrinho":
        let email = faker.internet.email()
        Rest.post("/usuarios",
          {
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
          }
        ).then(res => {
          cy.wrap(res.body._id).as('Id')
          Rest.post("/login",
            {
              "email": email,
              "password": "teste"
            }
          ).then(res => {
            Rest.post("/carrinhos",
              {
                "produtos":
                  [{
                    "idProduto": "BeeJh5lz3k6kSIzA",
                    "quantidade": 1
                  }]
              },
              { Authorization: res.body.authorization }
            )
          })
        });
        break;
      default:
        break;
    }
  }
}