/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'
import { criarBodyUsuario } from '../../factories/dynamic';
import { Login } from '../../services/login.service';

Given('que utilize query params {string}', (param) => {
  ServeRest.criarUsuario()
  let valor;
  cy.get('@Usuario').then(usuario => {
    cy.get('@IdUsuario').then(id => {
      switch (param) {
        case "_id":
          valor = id
          break;
        case "nome":
          valor = usuario.nome
          break;
        case "email":
          valor = usuario.email
          break;
        case "password":
          valor = usuario.password
          break;
        case "administrador":
          valor = usuario.administrador
          break;
        default:
          param = ""
          valor = ""
          break;
      }
      ServeRest.adicionarQueryParams(param, valor);
    })
  })
});

Given('que utilize complemento de rota {string}', (id) => {
  switch (id) {
    case "existente":
      ServeRest.criarUsuario()
      cy.get('@IdUsuario').then(id => {
        ServeRest.adicionarComplemento(id)
      })
      break;
    case "existente com carrinho":
      cy.get('@UsuarioAdmin').then(usuarioAdmin => {
        cy.wrap(usuarioAdmin).as('Usuario')
      })
      Login.realizarLogin()
      ServeRest.criarProduto()
      ServeRest.criarUsuario()
      Login.realizarLogin()
      ServeRest.criarCarrinho()
      cy.get('@IdUsuario').then(id => {
        ServeRest.adicionarComplemento(id)
      })
      break;
    case "inexistente":
      id = "00000000000"
      ServeRest.adicionarComplemento(id)
      break;
    default:
      id = ""
      ServeRest.adicionarComplemento(id)
      break;
  }
});

Given('que utilize body {string}', (body) => {
  switch (body) {
    case "válido":
      body = criarBodyUsuario()
      ServeRest.adicionarBody(body)
      break;
    case "e-mail já utilizado":
      ServeRest.criarUsuario()
      cy.get('@Usuario').then(usuario => {
        body = criarBodyUsuario({ email: usuario.email })
        ServeRest.adicionarBody(body)
      })
      break;
    case "e-mail inválido":
      body = criarBodyUsuario({ email: "thatisnotanemail" })
      ServeRest.adicionarBody(body)
      break;
    case "campos vazios":
      body = criarBodyUsuario({ vazio: true })
      ServeRest.adicionarBody(body)
      break;
    case "campos inválidos":
      body = criarBodyUsuario({ nome: 123 })
      ServeRest.adicionarBody(body)
      break;
    default:
      body = ""
      break;
  }
});