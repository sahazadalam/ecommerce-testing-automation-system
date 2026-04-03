// Custom commands for testing
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('logout', () => {
  cy.get('button').contains('Logout').click();
  cy.contains('Login').should('be.visible');
});

Cypress.Commands.add('addToCart', () => {
  cy.visit('/products');
  cy.get('[class*="ProductCard"]').first().within(() => {
    cy.get('button').last().click();
  });
});

Cypress.Commands.add('createOrder', () => {
  cy.addToCart();
  cy.visit('/cart');
  cy.contains('Proceed to Checkout').click();
  cy.get('input[name="address"]').type('123 Test St');
  cy.get('input[name="city"]').type('Test City');
  cy.get('input[name="postalCode"]').type('12345');
  cy.get('input[name="country"]').type('Test Country');
  cy.get('button[type="submit"]').click();
});