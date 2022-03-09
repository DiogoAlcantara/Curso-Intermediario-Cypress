/// <reference types="cypress" />

import faker from '@faker-js/faker'

describe('Create Project', () => {
  before(() => cy.login());
  it('Succesfully', () => {
    //criando um objeto project com nome e descrição gerados pela biblioteca faker;
    const project = {
      //gerando o nome do objeto de forma dinâmica com a biblioteca faker;
      name: `project-${faker.random.uuid()}`,
      //gerando a descrição do projeto de forma randomica com 5 palavras;
      description: faker.random.words(5)
    }

    //nosso comando customizado recebe como parametro o objeto project;
    cy.gui_createProject(project)

    //realizando a asserção para verificar se a 'url' possui o 'user_name' que foi setado no arquivo 'cypress.env.json' e o 'name' do projeto que foi criado de forma randomica pela biblioteca faker;
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}${Cypress.env('user_name')}/${project.name}`)

    //verificando se o nome do projeto está visivel, dessa forma validamos se o mesmo foi criado com sucesso;
    cy.contains(project.name).should('be.visible');
    //verificando se a descrição do projeto está visivel, dessa forma validamos se o mesmo foi criado com sucesso;
    cy.contains(project.description).should('be.visible');
  });
});