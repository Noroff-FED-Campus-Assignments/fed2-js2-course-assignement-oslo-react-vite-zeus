describe("Successfull Login Request Test", () => {
  it("Checks if the fetch request is OK", () => {
    // Intercept the POST request
    cy.intercept("POST", "https://api.noroff.dev/api/v1/social/auth/login").as(
      "loginRequest",
    );

    cy.visit("http://localhost:5173/login");

    // Input the email and password
    const email = "yoyoyo@noroff.no";
    const password = "Password";
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Wait for the '@loginRequest' to complete and verify its properties
    cy.wait("@loginRequest").then((interception) => {
      // Log the entire response body to see its structure
      cy.log(interception.response.body);

      // Check the response status code
      expect(interception.response.statusCode).to.eq(200);

      // Verify the request body
      expect(interception.request.body).to.deep.equal({
        email: email,
        password: password, // Ensure you're checking the correct property for the password
      });

      // Check if the expected property exists in the response body
    });
  });
});

describe("Declined Login Request Test", () => {
  it("Submits invalid login credentials and expects failure", () => {
    // Intercept the POST request and alias it
    cy.intercept("POST", "https://api.noroff.dev/api/v1/social/auth/login").as(
      "failedLoginRequest",
    );

    // Input the email and password
    const email = "yoyoyo@noroff.no"; // This email is registered in the API
    const incorrectPassword = "wrongpassword"; // Deliberately incorrect password.

    // Visit the login page
    cy.visit("http://localhost:5173/login");

    // Enter the email and incorrect password
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(incorrectPassword);

    // Click the submit button
    cy.get('button[type="submit"]').click();

    // Wait for the '@failedLoginRequest' to complete and verify its properties
    cy.wait("@failedLoginRequest").then((interception) => {
      // Expect the status code to be 401 for unauthorized
      expect(interception.response.statusCode).to.eq(401);

      // Verify the structure and content of the response body
      expect(interception.response.body).to.have.property("errors");
      expect(interception.response.body.errors[0]).to.have.property(
        "message",
        "Invalid email or password",
      );
      expect(interception.response.body).to.have.property(
        "status",
        "Unauthorized",
      );
    });

    // Add assertions to verify the UI behavior after form submission
    // Checking for an error message on the screen
    cy.contains(
      "Invalid credentials. Please check your email and password.",
    ).should("be.visible");

    // Check that the user is not redirected to the profile page
    cy.url().should("include", "/login"); // The user should still be on the login page
    cy.get('input[type="email"]').should("be.visible"); // The login form should still be visible
  });
});
