describe("Event Registration", () => {
  describe("Submitting a registration with invalid Name input", () => {
    it("Given I am on the Event Referral SPA", () => {
      cy.visit("/");
    });

    it("And the Full-name field has less than 3 characters", () => {
      cy.get("input[name='name']").type("Ab");
    });

    it("When I click the submit button", () => {
      cy.get("button[type='submit']").click();
    });

    it('Then I should see "Nome completo deve ter pelo menos 3 letras." message below the Full-name field', () => {
      cy.get("input[name='name']")
        .siblings("p")
        .should("be.visible")
        .should("have.text", "Nome completo deve ter pelo menos 3 letras.");
    });
  });

  describe("Submitting a registration with invalid Email input", () => {
    it("Given I am on the Event Referral SPA", () => {
      cy.visit("/");
    });

    it("And I have entered an invalid e-mail in the E-mail field", () => {
      cy.get("input[name='email']").type("invalid-email");
    });

    it("When I click the submit button", () => {
      cy.get("button[type='submit']").click();
    });

    it('Then I should see "Por favor, insira um e-mail válido." message below the E-mail field', () => {
      cy.get("input[name='email']")
        .siblings("p")
        .should("be.visible")
        .should("have.text", "Por favor, insira um e-mail válido.");
    });
  });

  describe("Submitting a registration when the registration API is offline", () => {
    beforeEach(() => {
      cy.intercept("POST", "http://localhost:8080/event/members", {
        forceNetworkError: true,
      }).as("registrationRequest");
    });

    it("Given I am on the Event Referral SPA", () => {
      cy.visit("/");
    });

    it("And I have entered a valid full name in the Full-name field", () => {
      cy.get("input[name='name']").type("John Doe");
    });

    it("And I have entered a valid e-mail in the E-mail field", () => {
      const uniqueEmail = `testuser+${Date.now()}@example.com`;

      cy.get("input[name='email']").type(uniqueEmail);
    });

    it("When I click the submit button", () => {
      cy.get("button[type='submit']").click();
    });

    it('Then I should see an error message "Erro ao registrar. Tente novamente mais tarde."', () => {
      cy.get("button[type='submit']")
        .siblings("p")
        .should("be.visible")
        .should("have.text", "Erro ao registrar. Tente novamente mais tarde.");
    });
  });

  describe("Submitting a registration with valid inputs using enter key", () => {
    beforeEach(() => {
      cy.intercept("POST", "http://localhost:8080/event/members", (req) => {
        req.reply({
          statusCode: 200,
          body: {
            name: "John Doe",
            points: 0,
            referralId: "123456789",
          },
        });
      }).as("registrationRequest");
    });

    it("Given I am on the Event Referral SPA", () => {
      cy.visit("/");
    });

    it("And I have entered valid values in the Full-name and E-mail fields", () => {
      const uniqueEmail = `testuser+${Date.now()}@example.com`;

      cy.get("input[name='name']").type("John Doe");
      cy.get("input[name='email']").type(uniqueEmail);
    });

    it('When I press the "Enter" key', () => {
      cy.get("input[name='email']").type("{enter}");

      cy.wait("@registrationRequest")
        .its("response.statusCode")
        .should("eq", 200);
    });

    it("Then the form should be submitted successfully", () => {
      cy.get("button[type='submit']")
        .siblings("p")
        .should(
          "not.contain",
          "Erro ao registrar. Tente novamente mais tarde."
        );
    });

    it('And I should see a confirmation message "Seu cadastro foi realizado com sucesso."', () => {
      cy.get("button[type='submit']")
        .siblings("p")
        .should("be.visible")
        .should("contain.text", "Seu cadastro foi realizado com sucesso.");
    });
  });
});
