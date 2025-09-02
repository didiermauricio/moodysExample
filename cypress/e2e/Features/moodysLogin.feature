Feature: Moodys Login

Scenario: Login Page with empty email field
    Given I access to login page
    And I accept the cookies
    When I click on sign in button
    And I click on next button
    And I leave the username field empty
    Then I should see the error message "Required"

Scenario: Login Page with wrong email field
    Given I access to login page
    And I accept the cookies
    When I click on sign in button
    And I click on next button
    And I fill the username field with a wrong value
    Then I should see the error message "Required"
    
