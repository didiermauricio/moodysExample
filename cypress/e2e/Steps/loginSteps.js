
import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps";

const loginBaseUrl = "https://login.moodys.com/";
const locators = {
  acceptCookiesButton: '#onetrust-accept-btn-handler',
  signInButton: '[data-testid="sign-in"]',
  nextButton: '[type="submit"]',
  emailField: '[inputmode="email"]',
  passwordField: ' //input[@id="«r1»-password"]',
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

 And('I leave the password field empty', () => {
  cy.origin(loginBaseUrl,{args:{locators}}, ({locators}) => {
    cy.get(locators.passwordField).should("be.visible");
  } );
 })

 And('I fill the username field with {string} value', (userName) => {
  cy.origin(loginBaseUrl,{args:{locators, userName}}, ({locators,userName}) => {
    cy.get(locators.emailField).should("be.visible").type(userName);
  } );
 })

 And('I fill the password field with {string} value', (password) => {
  cy.origin(loginBaseUrl,{args:{locators, password}}, ({locators, password}) => {
    cy.get(locators.passwordField).should("be.visible").type(password);
  } );
 })

Then('I should see the error message {string}', (errorMessage) => {
  cy.origin(loginBaseUrl,{args:{errorMessage, locators}}, ({errorMessage,locators}) => {
    cy.get(locators.errorMessage).should("be.visible").and('have.text', errorMessage);
  } );
})