describe('Cart Management', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.visit('/products');
  });

  it('should add product to cart', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });

  it('should update quantity in cart', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.visit('/cart');
    cy.get('[data-testid="increase-quantity"]').click();
    cy.get('[data-testid="item-quantity"]').should('contain', '2');
  });

  it('should remove item from cart', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    cy.visit('/cart');
    cy.get('[data-testid="remove-item"]').click();
    cy.contains('Your cart is empty').should('be.visible');
  });
});