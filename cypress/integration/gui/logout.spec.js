/// <reference types="cypress" />

describe('Logout', () => {
  //para podermos testar o logout antes disso precisamos estar logados, então utilizamos o gancho do beforeEach para que antes de cada teste ele execute nossa função customizada de login;
  beforeEach(() => {
    cy.login();
  });
  it('sucessfully', () => {
    cy.logout()

    //utilizamos o comando 'cy.url' para capturar a url da página, após isso fazermos uma asserção esperando que o retornado seja igual ao nosso 'baseUrl' que foi setado em nosso arquivo 'cypress.json', para isso fazemos uma concatenação da nossa baseUrl com a rota 'users/sign_in';
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}users/sign_in`)
  });
});
