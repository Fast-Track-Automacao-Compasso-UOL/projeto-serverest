/// <reference types="cypress" />
import Rest from "./_rest.service"
import { criarBodyUsuario } from '../factories/dynamic';

const URL_BASE = Cypress.config("baseUrl");
const URL_USUARIOS = "/usuarios";
const URL_LOGIN = "/login";
const URL_PRODUTOS = "/produtos";
const URL_CARRINOS = "/carrinhos";

export class ServeRest extends Rest {
  // Armazena rota baseado no parâmetro recebido
  static armazenarRota(rota) {
    cy.wrap(rota).as('Rota');
    cy.wrap('').as('Body')
  }

  // Adiciona query params à rota recebida pelo cy.wrap()
  static adicionarQueryParams(param, valor) {
    cy.log(param, valor)
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
          super.get(rota).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
          })
          break;
        case "POST":
          super.post(rota, body).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
          })
          break;
        case "DELETE":
          super.delete(rota, body).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
          })
          break;
        case "PUT":
          super.put(rota, body).then(res => {
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

  // Cria um usuário baseado no objeto do parâmetro options
  static criarUsuario(options = { carrinho: false }) {
    switch (options.carrinho) {
      case false:
        super.post("/usuarios",
          criarBodyUsuario()
        ).then(res => {
          cy.wrap(res.body._id).as('Id')
          cy.wrap(JSON.parse(res.requestBody)).as('Usuario')
        })
        break;

      case true:
        let bodyUsuario = criarBodyUsuario()
        super.post("/usuarios",
          bodyUsuario
        ).then(res => {
          cy.wrap(res.body._id).as('Id')
          cy.wrap(res.requestBody).as('Usuario')
          super.post("/login",
            {
              "email": bodyUsuario.email,
              "password": bodyUsuario.password
            }
          ).then(res => {
            super.post("/carrinhos",
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

  // Realiza Login com body recebido pelo cy.wrap()
  static realizar_login() {
    let body;
    cy.get('@tipoBody').then(tipo => {
      switch (tipo) {
        case 'válido':
          body = {
            "email": "fulano@qa.com",
            "password": "teste"
          };
          break;
        case 'e-mail inválido':
          body = {
            "email": "fulano",
            "password": "teste"
          };
          break;
        case 'senha inválida':
          body = {
            "email": "fulano@qa.com",
            "password": "senha errada"
          };
          break;
        case 'vazio':
          body = {};
          break;
        default:
          cy.log(`Tipo não reconhecido: ${tipo}`);
          break;
      }

      super.post(URL_BASE + URL_LOGIN, body).then(res => {
        cy.wrap(res.body).as('body');
      });
    })
  }
}