/// <reference types="cypress" />

describe('Login', () => {
  it('sucessfully', () => {
    //utilizamos a função customizada que criamos para realizar o fluxo de login
    cy.login()

    //validamos o login se o avatar do usuário existir
    cy.get('.qa-user-avatar').should('exist');
  });
});