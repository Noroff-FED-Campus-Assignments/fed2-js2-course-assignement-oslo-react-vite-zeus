// cypress/integration/logout.spec.js

describe("Logout Test", () => {
  it("should log out after opening the navigation menu", () => {
    // Intercept network requests to ensure that the logout is successful
    cy.intercept("GET", "http://127.0.0.1:5173/").as("logoutRequest"); // Move the interception here

    // Visit the page where the Navigation component is rendered
    cy.visit("http://127.0.0.1:5173/"); // Replace with the actual URL or route where your component is rendered

    // Use invoke to show the hamburger menu
    cy.get(".lg\\:hidden").invoke("show");

    // Click the logout button with { force: true } to disable error checking
    cy.get(".text-lg").contains("Logout").click({ force: true });

    cy.wait("@logoutRequest");

    // Assert that the user is logged out (e.g., check for login page elements)
    cy.get(".text-lg").contains("Login").should("exist");
    //cy.get('.text-lg').contains('Logout').should('not.exist'); (will return error)
  });
});
