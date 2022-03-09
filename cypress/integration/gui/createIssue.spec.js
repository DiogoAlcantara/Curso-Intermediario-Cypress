/// <reference types="cypress" />

import faker from '@faker-js/faker'

// 1 - para criar uma issue, primeiro devemos estar logados, utilizamos a função customizada cy.login();
// 2 - apos isso, devemos criar um projeto, pois para criar uma issue precisamos de um projeto existente, para isso utilizamos a função customizada cy.gui_createProject();
describe('Create Issue', () => {
  //criando uma constante  que recebe um objeto responsável por criar a issue;
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
  //antes de cada teste o gancho abaixo é executado para que possamos logar na aplicação e também criar um projeto
  beforeEach(() => {
    cy.login();
    cy.api_createProject(issue.project);
  });
  it('sucessfully', () => {
    //usando a função customizada para criar uma issue;
    cy.gui_createIssue(issue);

    //validando se a issue possui titulo e descrição
    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description);
  });
});
