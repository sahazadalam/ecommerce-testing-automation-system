describe('Checkout Process', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.addToCart();
    cy.visit('/cart');
    cy.contains('Proceed to Checkout').click();
  });

  it('should complete checkout with valid details', () => {
    cy.get('input[name="address"]').type('123 Test St');
    cy.get('input[name="city"]').type('Test City');
    cy.get('input[name="postalCode"]').type('12345');
    cy.get('input[name="country"]').type('Test Country');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/payment');
  });

  it('should show error with missing fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Please fill in all shipping details').should('be.visible');
  });
});