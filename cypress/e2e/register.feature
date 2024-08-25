Feature: Event Registration

    Scenario: Submitting a registration with invalid Name input
        Given I am on the Event Referral SPA
        And the Full-name field has less than 3 characters
        When I click the submit button
        Then I should see "Nome completo deve ter pelo menos 3 letras." message below the Full-name field

    Scenario: Submitting a registration with invalid Email input
        Given I am on the Event Referral SPA
        And I have entered an invalid e-mail in the E-mail field
        When I click the submit button
        Then I should see "Por favor, insira um e-mail válido." message below the E-mail field

    Scenario: Submitting a registration when the registration API is offline
        Given I am on the Event Referral SPA
        And I have entered a valid full name in the Full-name field
        And I have entered a valid e-mail in the E-mail field
        When I click the submit button
        And the registration API is offline
        Then I should see an error message "Erro ao registrar. Tente novamente mais tarde."

    Scenario: Submitting a registration with valid inputs using enter key
        Given I am on the Event Referral SPA
        And I have entered valid values in the Full-name and E-mail fields
        When I press the "Enter" key
        Then the form should be submitted successfully
        And I should see a confirmation message "Seu cadastro foi realizado com sucesso."
