/// <reference types="cypress" />
import { Given } from "cypress-cucumber-preprocessor/steps";
import { ServeRest } from "../../services/serveRest.service";
import { criarBodyProduto } from "../../factories/dynamic";
import { Usuarios } from '../../services/usuarios.service'

// Listar Produtos
Given("que utilize query params {string}", (param) => {
  cy.get('@UsuarioAdmin').then(admin => {
    cy.wrap(admin).as('Usuario')
  })
  ServeRest.realizarLogin()
  ServeRest.criarProduto()
  let valor;
  cy.get('@Produto').then(produto => {
    cy.get('@IdProduto').then(id => {
      switch (param) {
        case "_id":
          valor = id
          break;
        case "nome":
          valor = produto.nome
          break;
        case "preco":
          valor = produto.preco
          break;
        case "descricao":
          valor = produto.descricao
          // cy.log(produto.descricao)
          break;
        case "quantidade":
          valor = produto.quantidade
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

// Buscar produtos por ID
Given('que utilize complemento de rota {string}', (id) => {
  switch (id) {
    case "existente":
      Usuarios.criarUsuario({ admin: 'true' })
      ServeRest.realizarLogin()
      ServeRest.criarProduto()
      cy.get('@IdProduto').then(id => {
        ServeRest.adicionarComplemento(id)
      })
      break;
    case "existente com carrinho":
      Usuarios.criarUsuario({ admin: 'true' })
      ServeRest.realizarLogin()
      ServeRest.criarProduto()
      ServeRest.criarCarrinho()
      cy.get('@IdProduto').then(id => {
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

// Cadastrar Produto
Given("que utilize body {string}", (body) => {
  switch (body) {
    case "válido":
      body = criarBodyProduto();
      cy.wrap(body).as('Body')
      break;

    case "nome já utilizado":
      ServeRest.criarProduto();
      cy.get('@Produto').then(produto => {
        body = criarBodyProduto({ nome: produto.nome })
        cy.wrap(body).as('Body')
      })
      break;

    case "campo ausente":
      body = criarBodyProduto({ vazio: true });
      cy.wrap(body).as('Body')
      break;

    case "campos vazios":
      body = criarBodyProduto({ vazio: true });
      cy.wrap(body).as('Body')
      break;

    case "campos inválidos":
      body = criarBodyProduto({ nome: 1234 });
      cy.wrap(body).as('Body')
      break;

    case "inválido":
      body = criarBodyProduto();
      cy.wrap(body).as('Body')
      break;

    case "válida comum":
      body = criarBodyProduto();
      cy.wrap(body).as('Body')
      break;
  }
});
