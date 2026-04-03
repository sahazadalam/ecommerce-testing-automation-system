describe('Checkout E2E Tests', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.addToCart();
    cy.visit('/cart');
    cy.contains('Proceed to Checkout').click();
  });

  it('Should complete checkout with valid details', () => {
    cy.get('input[name="address"]').type('123 Test Street');
    cy.get('input[name="city"]').type('Test City');
    cy.get('input[name="postalCode"]').type('12345');
    cy.get('input[name="country"]').type('Test Country');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/payment');
  });

  it('Should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Please fill in all shipping details').should('be.visible');
  });
});