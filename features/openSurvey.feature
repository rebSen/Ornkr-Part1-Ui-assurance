Feature:  Access to survey "estimate my rate"

Scenario: Access to survey 
    Given I visit ornikar homepage
    When I accept cookies
    Then I can click on the estimate my rate button
    Then I can see the first question of the survey
