/// <reference types="cypress" />

import faker from '@faker-js/faker'

describe('Set label on issue', () => {
  const issue = {
    //titulo gerado de forma randomica através da biblioteca faker;
    title: `issue-${faker.random.uuid()}`,
    //descrição gera de forma randomica através da biblioteca faker;
    description: faker.random.words(3),
    //a constante issue recebe um outro objeto de nome project que será responsável por criar um projeto;
    project: {
      name: `project-${faker.random.uuid()}`,
      description: faker.random.words(5)
    }
  }
  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }
  beforeEach(() => {
    cy.login()
    cy.api_createIssue(issue)
      .then(response => {
        cy.api_createLabel(response.body.project_id, label)
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`);
      })
  });
  it('sucessfully', () => {
    cy.gui_setLabelOnIssue(label)
    cy.get('.qa-labels-block').should('contain', label.name); 
    cy.get('.qa-labels-block span')
      .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
  });
});