
import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('I access to login page', () => {
  cy.visit("/")

})

And('I accept the cookies', () => {
  cy.get("body").then(($body) => {
     cy.get("#onetrust-accept-btn-handler",{timeout:10000}).click();    
  });
});

When('I click on sign in button', () => {
  cy.get('[data-testid="sign-in"]').should("be.visible").click();
})

And('I click on next button', () => {
  cy.origin('https://login.moodys.com/', () => {
    cy.get('[type="submit"]',{timeout:20000}).click();
  });
})

And('I leave the username and password fields empty', () => {
  cy.origin('https://login.moodys.com/', () => {
    cy.get('[inputmode="email"]').should("be.visible");
  } );
 })

Then('I should see the error message {string}', (errorMessage) => {
  cy.origin('https://login.moodys.com/',{args:{error:errorMessage}}, ({error}) => {
    cy.get('[data-slot="error"]').should("be.visible").and('have.text', error);
  } );
})