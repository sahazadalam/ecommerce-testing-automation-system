describe('Cart Management E2E Tests', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.visit('/products');
  });

  it('Should add product to cart', () => {
    cy.addToCart();
    cy.get('[class*="Navbar"]').find('[class*="relative"]').first().click();
    cy.visit('/cart');
    cy.get('[class*="Cart"]').should('exist');
  });

  it('Should update quantity in cart', () => {
    cy.addToCart();
    cy.visit('/cart');
    cy.get('button').contains('+').click();
    cy.get('[class*="item-quantity"]').should('contain', '2');
  });

  it('Should remove item from cart', () => {
    cy.addToCart();
    cy.visit('/cart');
    cy.get('button').contains('Remove').click();
    cy.contains('Your cart is empty').should('be.visible');
  });
});