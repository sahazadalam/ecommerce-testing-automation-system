# Bug Tracking Report - ShopHub E-Commerce Application

## Bug #001: Cart Count Not Updating Immediately

**Severity:** Medium  
**Priority:** High  
**Status:** Open  

**Title:** Cart count badge doesn't update immediately after adding item

**Steps to Reproduce:**
1. Login to application
2. Navigate to Products page
3. Click "Add to Cart" on any product
4. Observe the cart icon in navbar

**Expected Result:** Cart count badge should increment immediately from 0 to 1

**Actual Result:** Cart count remains at 0 until page refresh

**Environment:** Chrome 120, Windows 11

---

## Bug #002: Payment Success Shows Error Toast

**Severity:** Low  
**Priority:** Medium  
**Status:** In Progress  

**Title:** Payment success shows error message before success message

**Steps to Reproduce:**
1. Add items to cart
2. Proceed to checkout
3. Fill shipping details
4. Complete payment with test card 4242

**Expected Result:** Only success message appears

**Actual Result:** Error toast appears briefly, then success message

**Environment:** All browsers

---

## Bug #003: Negative Quantity in Cart

**Severity:** High  
**Priority:** High  
**Status:** Fixed  

**Title:** Users can set negative quantity in cart

**Steps to Reproduce:**
1. Add item to cart
2. Click quantity decrease button multiple times

**Expected Result:** Quantity cannot go below 1

**Actual Result:** Quantity can go to 0 or negative numbers

**Fix:** Added validation in updateCartItem function

---

## Bug #004: Search Filter Not Working on Products Page

**Severity:** Medium  
**Priority:** Medium  
**Status:** Open  

**Title:** Product search filter returns incorrect results

**Steps to Reproduce:**
1. Go to Products page
2. Type "iPhone" in search box
3. Press Enter

**Expected Result:** Only iPhone products displayed

**Actual Result:** Shows all products or no results

**Environment:** Firefox 120