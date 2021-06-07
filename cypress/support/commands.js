/// <reference types="cypress" />

import { validate } from 'jsonschema'

Cypress.Commands.add('validateSchema', (res, schema) => {
  cy.fixture(`schema/${schema}`).as('dataLoader').then(schema => {
    const validation = validate(res, schema, { required: true, nestedErrors: true });
    let errors = ''
    if (!validation.valid) {
      errors += validation.errors.map(err => {
        return '\n' + err.message
      })
      throw new Error('SCHEMA VALIDATION EROR: ' + errors);
    }
  })
})