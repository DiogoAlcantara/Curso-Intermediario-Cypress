/// <reference types="cypress" />

import faker from '@faker-js/faker'

describe('Create Project', () => {
  it('Succesfully', () => {
    //criando um objeto project com nome e descrição gerados pela biblioteca faker;
    const project = {
      //gerando o nome do objeto de forma dinâmica com a biblioteca faker;
      name: `project-${faker.random.uuid()}`,
      //gerando a descrição do projeto de forma randomica com 5 palavras;
      description: faker.random.words(5)
    }

    //nosso comando customizado recebe como parametro o objeto project;
    cy.api_createProject(project)
      .then(response =>{
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(project.name)
        expect(response.body.description).to.equal(project.description)
      })
  });
});