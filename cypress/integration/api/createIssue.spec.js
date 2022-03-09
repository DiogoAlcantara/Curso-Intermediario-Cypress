/// <reference types="cypress" />

import faker from '@faker-js/faker'

// 1 - para criar uma issue, primeiro devemos estar logados, utilizamos a função customizada cy.login();
// 2 - apos isso, devemos criar um projeto, pois para criar uma issue precisamos de um projeto existente, para isso utilizamos a função customizada cy.gui_createProject();
describe('Create Issue', () => {
  it('sucessfully', () => {
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
  cy.api_createIssue(issue)
    .then(response =>{
      //esperamos que o status seja 201 que significa que a issue foi criada com sucesso;
      expect(response.status).to.equal(201)
      //esperamos que o titulo que vem no body da requisição seja igual ao titulo da issue;
      expect(response.body.title).to.equal(issue.title)
      //esperamos que a descrição que vem no body da requisição seja igual a descrição da issue;
      expect(response.body.description).to.equal(issue.description)
    })
  });
});


