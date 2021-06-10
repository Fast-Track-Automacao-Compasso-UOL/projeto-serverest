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
    cy.wrap(rota).as('Rota');
    cy.wrap('').as('Body')
    cy.wrap('').as('Token')
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
          super.get(rota).then(res => {
            cy.wrap(res).as('Response')
            cy.wrap(res.body).as('Body')
            cy.wrap(res.status).as('Status')
          })
          break;
          case "POST":
            cy.get('@Token').then(token => {
                super.post(rota, body, { authorization: token }).then(res => {
                    cy.wrap(res).as('Response')
                    cy.wrap(res.body).as('Body')
                    cy.wrap(res.status).as('Status')
                })
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

  static adicionarBody(body) {
    cy.wrap(body).as('Body')
  }

  // Valida mensagem contida no body da requisição
  static validarMensagem(mensagem) {
    cy.get('@Body').then(body => {
      //let aux = Object.values(body);
      //expect(aux[0]).to.contain(mensagem)
      expect(Object.values(body)).to.contain(mensagem)
    })
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

  // Realiza Login com body recebido pelo cy.wrap()
  static realizar_login() {
    let body;
    cy.get('@TipoBody').then(tipo => {
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
        case 'campos vazios':
          body = {
            "email": "",
            "password": ""
          };
          break;
        case 'campos inválidos':
          body = {
            "email": 3,
            "password": 5
          };
          break;
        default:
          cy.log(`Tipo não reconhecido: ${tipo}`);
          break;
      }

      super.post(URL_BASE + URL_LOGIN, body).then(res => {
        cy.wrap(res.body).as('Body');
      });
    })
  }

  // Cria um usuário baseado em uma string enviada pelo parâmetro options
  static criarUsuario(options) {
    switch (options) {
      case "sem carrinho":
        super.post("/usuarios",
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
        super.post("/usuarios",
          {
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
          }
        ).then(res => {
          cy.wrap(res.body._id).as('Id')
          super.post("/login",
            {
              "email": email,
              "password": "teste"
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
}
