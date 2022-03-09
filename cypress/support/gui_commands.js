/// <reference types="cypress" />

//Criando um comando customizado para fazer todo o fluxo de login;
Cypress.Commands.add('login', () =>{
  //visitando o url de cadastro;
  cy.visit('users/sign_in');

  //preenchendo o campo de login com o usuário definido no objeto do arquivo 'cypress.env.json';
  cy.get('[data-qa-selector="login_field"]').type(Cypress.env('user_name'));
  //preenchendo o campo de senha com o password definido no objeto do arquivo 'cypress.env.json';
  cy.get('[data-qa-selector="password_field"]').type(Cypress.env('user_password'));
  //clicando no botão para fazer o login
  cy.get('[data-qa-selector="sign_in_button"]').click();
})

//criando uma função para fazer logout;
Cypress.Commands.add('logout', () =>{
  //clicando no avatar do usuario para abrir o menu suspenso;
  cy.get('.qa-user-avatar').click();
  //clicando no campo para fazer o logout da aplicação;
  cy.contains('Sign out').click();
})

//criando uma função para criar um projeto;
Cypress.Commands.add('gui_createProject', project =>{
  cy.visit('projects/new');

  //utilizamos o objeto project com o atributo name para preencher o nome do projeto;
  cy.get('#project_name').type(project.name);
  //utilizamos o objeto project com o description name para preencher a descrição do projeto;
  cy.get('#project_description').type(project.description);
  //marcamos o checkbox para inicializar o projeto com um arquivo README;
  cy.get('#project_initialize_with_readme').check();
  //depois clicamos no botão para criar o projeto;
  cy.contains('Create project').click();
})

//criando uma função para criar um projeto;
Cypress.Commands.add('gui_createIssue', issue =>{
  //concatena o nome de usuario + o nome do projeto /issues/new para acessar a url de criação de uma issue;
  cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/new`);

  //escreve no campo de titulo da issue através do nosso objeto issue que contém o atributo title;
  cy.get('.qa-issuable-form-title').type(issue.title);
  //escreve no campo de descrição da issue através do nosso objeto issue que contém o atributo description;
  cy.get('.qa-issuable-form-description').type(issue.description);
  //procura pelo elemento que contém o texto 'Submit issue' e clica nele;
  cy.contains('Submit issue').click();
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})


