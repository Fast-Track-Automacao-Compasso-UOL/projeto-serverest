/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { ServeRest } from '../../services/serveRest.service'
import Rest from '../../services/_rest.service'


Given('a rota {string}', (rota) => {
  ServeRest.armazenarRota(rota);
});
// GET Cenario: Listar Carrinhos
Given('que utilize query params {string}', (params) => {
  ServeRest.adicionarQueryParams(params);
});

When('realizar uma requisição do tipo {string}', (tipo) => {
  ServeRest.realizarRequisicao(tipo);
});

Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
  ServeRest.validarSchemaEStatus(schema, status);
});
//GET Cenario: Buscar carrinhos por ID
// Given('a rota {string}', (rota) => {
//  ServeRest.armazenarRota(rota);

Given ('que utilize complemento de rota {string}', (id) => {
  ServeRest.adicionarComplemento(id);
// When('realizar uma requisição do tipo {string}', (tipo) => {
//  ServeRest.realizarRequisicao(tipo);

//Then('deverá ser retornado o schema {string} e status {int}', (schema, status) => {
//  ServeRest.validarSchemaEStatus(schema, status);
})