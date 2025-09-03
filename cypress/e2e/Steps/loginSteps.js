
import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps";

const loginBaseUrl = "https://login.moodys.com/";
const locators = {
  acceptCookiesButton: '#onetrust-accept-btn-handler',
  signInButton: 'button[data-testid="sign-in"]',
  nextButton: '[type="submit"]',
  emailField: '[inputmode="email"]',
  passwordField: 'input[type="password"]',
  errorMessage: '[data-slot="error"]',
  acceptCookiesButton: '#onetrust-accept-btn-handler'
};

Given('I access to login page', () => {
  cy.visit("/")

})

And('I accept the cookies', () => {
  cy.get("body").then(($body) => {
     cy.get(locators.acceptCookiesButton,{timeout:10000}).should("be.visible");
     cy.get(locators.acceptCookiesButton,{timeout:10000}).click();    
  });
});

When('I click on sign in button', () => { 
  cy.get(locators.signInButton).should("be.visible").and("be.enabled");
  cy.get(locators.signInButton).click(); 
  cy.wait(5000);
});


And('I click on next button', () => {  
    cy.origin(loginBaseUrl,{args:{locators}}, ({locators})  =>{
    cy.get(locators.nextButton,).should("be.visible").and("be.enabled");
    cy.get(locators.nextButton,).click();   
  });
})

And('I leave the username field empty', () => {
  cy.origin(loginBaseUrl,{args:{locators}}, ({locators}) => {
    cy.get(locators.emailField).should("be.visible").and("be.enabled");
  } );
 })

 And('I leave the password field empty', () => {
  cy.origin(loginBaseUrl,{args:{locators}}, ({locators}) => {
    cy.get(locators.passwordField).should("be.visible").and("be.enabled");
  } );
 })

 And('I fill the username field with {string} value', (userName) => {
  cy.origin(loginBaseUrl,{args:{locators, userName}}, ({locators,userName}) => {
    cy.get(locators.emailField).should("be.visible");
    cy.get(locators.emailField).should("be.enabled");
    cy.get(locators.emailField).type(userName);
  } );
 })

 And('I fill the password field with {string} value', (password) => {
  cy.origin(loginBaseUrl,{args:{locators, password}}, ({locators, password}) => {
    cy.get(locators.passwordField).should("be.visible").should("be.enabled");
    cy.get(locators.passwordField).type(password);
  } );
 })

Then('I should see the error message {string}', (errorMessage) => {
  cy.origin(loginBaseUrl,{args:{errorMessage, locators}}, ({errorMessage,locators}) => {
    cy.get(locators.errorMessage).should("be.visible").and('have.text', errorMessage);
  } );
})