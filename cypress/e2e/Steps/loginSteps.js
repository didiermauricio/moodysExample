
import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps";

const loginBaseUrl = "https://login.moodys.com/";
const locators = {
  acceptCookiesButton: '#onetrust-accept-btn-handler',
  signInButton: '[data-testid="sign-in"]',
  nextButton: '[type="submit"]',
  emailField: '[inputmode="email"]',
  errorMessage: '[data-slot="error"]',
  acceptCookiesButton: '#onetrust-accept-btn-handler'
};

Given('I access to login page', () => {
  cy.visit("/")

})

And('I accept the cookies', () => {
  cy.get("body").then(($body) => {
     cy.get(locators.acceptCookiesButton,{timeout:10000}).click();    
  });
});

When('I click on sign in button', () => {
  cy.get(locators.signInButton).should("be.visible").click();
})

And('I click on next button', () => {
  cy.origin(loginBaseUrl,{args:{locators}}, ({locators}) => {
    cy.get(locators.nextButton,{timeout:20000}).click();
  });
})

And('I leave the username field empty', () => {
  cy.origin(loginBaseUrl,{args:{locators}}, ({locators}) => {
    cy.get(locators.emailField).should("be.visible");
  } );
 })

 And('I fill the username field with a wrong value', () => {
  cy.origin(loginBaseUrl,{args:{locators}}, ({locators}) => {
    cy.get(locators.emailField).should("be.visible").type("12345");
  } );
 })

Then('I should see the error message {string}', (errorMessage) => {
  cy.origin(loginBaseUrl,{args:{errorMessage, locators}}, ({errorMessage,locators}) => {
    cy.get(locators.errorMessage).should("be.visible").and('have.text', errorMessage);
  } );
})