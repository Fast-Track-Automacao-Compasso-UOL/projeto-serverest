/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

Given('a rota {string}', (_string) => {
  return true
});

Given('que utilize body {string}', (_string) => {
  return true
});

When('realizar uma requisição do tipo {string}', (_string) => {
  return true
});

Then('deverá ser retornado o schema {string} e status {int}', (_string, _int) => {
  return true
})

Then('deverá ser retornada a mensagem {string}', (_string) => {
  return true
})