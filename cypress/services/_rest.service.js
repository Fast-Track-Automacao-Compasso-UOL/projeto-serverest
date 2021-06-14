/// <reference types="cypress" />

export default class Rest {
  static get(endpoint) {
    return cy.request({
      method: 'GET',
      url: endpoint,
      failOnStatusCode: false
    });
  }

  static post(endpoint, body, headers = null) {
    return cy.request({
      method: 'POST',
      url: endpoint,
      body: body,
      headers: headers,
      failOnStatusCode: false
    });
  }

  static put(endpoint, body, headers = null) {
    return cy.request({
      method: 'PUT',
      url: endpoint,
      body: body,
      headers: headers,
      failOnStatusCode: false
    });
  }

  static delete(endpoint, body = null, headers = null) {
    return cy.request({
      method: 'DELETE',
      url: endpoint,
      body: body,
      headers: headers,
      failOnStatusCode: false
    });
  }
}