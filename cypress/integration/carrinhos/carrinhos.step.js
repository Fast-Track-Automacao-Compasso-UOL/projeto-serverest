/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { Carrinhos } from '../../services/carrinhos.service';
import { Login } from '../../services/login.service';
import { ServeRest } from '../../services/serveRest.service'
import { Usuarios } from '../../services/usuarios.service'
import Rest from '../../services/_rest.service'
import { Produtos } from "../../services/produtos.service";

// GET Cenario: Listar Carrinhos
Given('que utilize query params {string}', (params) => {
  cy.fixture('carrinhos/query_params').then(query_params => {
    cy.log(query_params)
    
    ServeRest.adicionarQueryParams(params, query_params[params]);
  })
});

//GET Cenario: Buscar carrinhos por ID
Given('que utilize complemento de rota {string}', (id) => {
  cy.fixture('carrinhos/complemento').then(complemento => {
    cy.log(complemento)
    let aux = complemento.tipos[id];
    ServeRest.adicionarComplemento(aux)
  })

});

//POST Cenario: Cadastrar Carrinho
Given('que utilize body {string}', (body) => {
  cy.fixture('carrinhos/req_body').then(carrinhosBody => {
    cy.log(carrinhosBody)
    let aux = carrinhosBody.tipos[body];
    cy.wrap(aux).as('Body')
  })


});

//DELETE Cenario: Excluir carrinho concluir-compra/cancelar-compra
Given('{string} carrinho', (condicao) => {

  if (condicao == 'possua') {
    Usuarios.criarUsuario({ admin: 'true' })
    Login.realizarLogin()
    Produtos.criarProduto()
    cy.get('@Autenticacao').then(auth => {
      cy.wrap(auth).as('Token')
      Carrinhos.criarCarrinho()
    })

  }
});

Given('que utilize complemento de rota {string}', (complemento) => {
  ServeRest.adicionarComplemento(complemento);
});


