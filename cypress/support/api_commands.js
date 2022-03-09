/// <reference types="cypress" />

//armazenamos em uma constante o nosso token de acesso
const accessToken = Cypress.env('gitlab_access_token')

//comando para criar um projeto via API
Cypress.Commands.add('api_createProject', project =>{
  cy.request({
    method: "POST",
    url: `api/v4/projects/?private_token=${accessToken}`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: true
    }
  })
})

Cypress.Commands.add('api_createIssue', issue =>{
  //para criar uma issue primeiro devemos ter um projeto, então usamos nosso comando customizado para criar um projeto;
  cy.api_createProject(issue.project)
    //tal ação gera uma resposta que é armazenada em .then(), onde fazemos um POST passando os parametos de criação da issue que são o ENDPOINT, e o body da requisição que deve conter um titulo e uma descrição da issue;
    .then(response =>{
      cy.request({
        method: "POST",
        url: `api/v4/projects/${response.body.id}/issues?private_token=${accessToken}`,
        body: {
          title: issue.title,
          description: issue.description,
        }
      })
    })
})

Cypress.Commands.add('api_createLabel', (projectId, label) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/labels?private_token=${accessToken}`,
    body: {
      name: label.name,
      color: label.color
    }
  })
})

Cypress.Commands.add('api_createMilestone', (projectId, milestone) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/milestones?private_token=${accessToken}`,
    body: { title: milestone.title }
  })
})

