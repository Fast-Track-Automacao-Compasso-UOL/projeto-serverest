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
<<<<<<< HEAD
  }

  // Adiciona query params à rota recebida pelo cy.wrap()
  static adicionarQueryParams(params) {
    cy.get('@Rota').then(rota => {
      switch (params) {
        case "_id":
         cy.wrap(`${rota}?_id=BeeJh5lz3k6kSIzA`).as('Rota')
          break;
        case "nome":
          cy.wrap (`${rota}?nome=Logitech%MX%Vertical`).as('Rota')
           break;
        case "preco":
          cy.wrap (`${rota}?preco=470`)
           break;
        case "descricao":
          cy.wrap (`${rota}?descricao=Mouse`).as('Rota')
           break;
        case "quantidade":
          cy.wrap (`${rota}?quantidade=382`).as('Rota')
            break;
        default:
          cy.wrap(rota).as('Rota')
           break;
      }
    })
  }   

  //Adiciona complemento recebido pelo parâmetro na rota recebida pelo cy.wrap()
  static adicionarComplemento(id) {
    cy.get('@Rota').then(rota => {
      switch (id) {
        case "válido":
           id = "BeeJh5lz3k6kSIzA"
           break;
        case "inválido":
           id = "BeeJh5lz3k6kSIzA1"
           break;
                   
  };
   cy.wrap(`${rota}/${id}`).as('Rota')    
    
  })
  }
  // Realiza requisição com rota recebida pelo cy.wrap() e tipo recebido no parâmetro
  static realizarRequisicao(tipo) {
=======
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
>>>>>>> origin/develop
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
