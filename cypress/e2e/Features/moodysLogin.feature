Feature: Moodys Login

Scenario: Login Page with empty credentials
    Given I access to login page
    And I accept the cookies
    When I click on sign in button
    And I click on next button
    And I leave the username and password fields empty
    Then I should see the error message "Required"
    
