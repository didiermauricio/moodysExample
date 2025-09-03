Feature: Moodys Login

Scenario: Login Page with empty email field
    Given I access to login page
    And I accept the cookies
    When I click on sign in button
    And I leave the username field empty
    And I click on next button
    Then I should see the error message "Required"

Scenario Outline: Login Page with wrong email field
    Given I access to login page
    And I accept the cookies
    When I click on sign in button
    And I fill the username field with "<userName>" value
    And I click on next button
    Then I should see the error message "Please enter a valid email."

Examples:
|userName|
|test    | 

Scenario Outline: Login Page with empty password field
    Given I access to login page
    And I accept the cookies
    When I click on sign in button    
    And I fill the username field with "<userName>" value
    And I click on next button
    And I leave the password field empty
    And I click on next button
    Then I should see the error message "Required"

Examples:
|userName     |
|test@test.com| 

Scenario Outline: Login Page with wrong password field
    Given I access to login page
    And I accept the cookies
    When I click on sign in button
    And I fill the username field with "<userName>" value
    And I click on next button
    And I fill the password field with "<password>" value
    And I click on next button
    Then I should see the error message "Invalid email or password."

Examples:
|userName     |password   |
|test@test.com|12345      | 