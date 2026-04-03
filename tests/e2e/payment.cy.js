describe('Payment Processing', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.createOrder();
    cy.visit('/payment');
  });

  it('should process successful payment with test card', () => {
    cy.get('input[name="cardName"]').type('TEST USER');
    cy.get('input[name="cardNumber"]').type('4242424242424242');
    cy.get('input[name="expiryDate"]').type('12/25');
    cy.get('input[name="cvv"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Payment successful').should('be.visible');
    cy.url().should('include', '/order-success');
  });

  it('should show error for failed payment', () => {
    cy.get('input[name="cardName"]').type('TEST USER');
    cy.get('input[name="cardNumber"]').type('0000000000000000');
    cy.get('input[name="expiryDate"]').type('12/25');
    cy.get('input[name="cvv"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Payment failed').should('be.visible');
  });
});