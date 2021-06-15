/// <reference types="cypress" />
import { Given } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'
import { criarBodyUsuario } from '../../factories/dynamic';
import { Carrinhos } from '../../services/carrinhos.service';
import { Usuarios } from '../../services/usuarios.service'

Given('que utilize query params {string}', (param) => {
  Usuarios.criarUsuario()
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
      Usuarios.criarUsuario()
      cy.get('@IdUsuario').then(id => {
        ServeRest.adicionarComplemento(id)
      })
      break;
    case "existente com carrinho":
      cy.get('@UsuarioAdmin').then(usuarioAdmin => {
        cy.wrap(usuarioAdmin).as('Usuario')
      })
      ServeRest.realizarLogin()
      ServeRest.criarProduto()
      Usuarios.criarUsuario()
      ServeRest.realizarLogin()
      Carrinhos.criarCarrinho()
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
      cy.wrap(body).as('Body')
      break;
    case "e-mail já utilizado":
      Usuarios.criarUsuario()
      cy.get('@Usuario').then(usuario => {
        body = criarBodyUsuario({ email: usuario.email })
        cy.wrap(body).as('Body')
      })
      break;
    case "e-mail inválido":
      body = criarBodyUsuario({ email: "thatisnotanemail" })
      cy.wrap(body).as('Body')
      break;
    case "campos vazios":
      body = criarBodyUsuario({ vazio: true })
      cy.wrap(body).as('Body')
      break;
    case "campos inválidos":
      body = criarBodyUsuario({ nome: 123 })
      cy.wrap(body).as('Body')
      break;
    default:
      body = ""
      break;
  }
});