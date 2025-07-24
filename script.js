/*
 * Simple checkout script for MasalaMarket NL.
 *
 * This script constructs an order summary from a hard‑coded set of
 * products, calculates VAT and delivery fees based on user settings,
 * and updates the totals whenever the VAT toggle is changed.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sample cart data. In a real application this would be dynamic.
  const items = [
    { name: 'Garam Masala Blend', price: 3.50, qty: 1 },
    { name: 'Spicy Bhujiya', price: 1.80, qty: 2 },
    { name: 'Herbal Detox Tea', price: 4.10, qty: 1 }
  ];

  const vatToggle = document.getElementById('vat-toggle');
  const orderSummary = document.getElementById('order-summary');
  const totalsDiv = document.getElementById('totals');

  function renderTable() {
    let table = '<table style="width:100%; border-collapse: collapse;">';
    table += '<thead><tr><th style="text-align:left; padding:8px; border-bottom:1px solid #ddd;">Product</th>';
    table += '<th style="text-align:center; padding:8px; border-bottom:1px solid #ddd;">Qty</th>';
    table += '<th style="text-align:right; padding:8px; border-bottom:1px solid #ddd;">Unit (€)</th>';
    table += '<th style="text-align:right; padding:8px; border-bottom:1px solid #ddd;">Total (€)</th></tr></thead><tbody>';
    items.forEach(item => {
      const lineTotal = (item.price * item.qty).toFixed(2);
      table += `<tr><td style="padding:8px; border-bottom:1px solid #eee;">${item.name}</td>`;
      table += `<td style="text-align:center; padding:8px; border-bottom:1px solid #eee;">${item.qty}</td>`;
      table += `<td style="text-align:right; padding:8px; border-bottom:1px solid #eee;">${item.price.toFixed(2)}</td>`;
      table += `<td style="text-align:right; padding:8px; border-bottom:1px solid #eee;">${lineTotal}</td></tr>`;
    });
    table += '</tbody></table>';
    orderSummary.innerHTML = table;
  }

  function updateTotals() {
    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    // Calculate VAT if enabled (21%)
    const includeVat = vatToggle.checked;
    const vatAmount = includeVat ? subtotal * 0.21 : 0;
    // Determine shipping: free if subtotal >= 25, otherwise €4.95
    const shipping = subtotal >= 25 ? 0 : 4.95;
    const total = subtotal + vatAmount + shipping;
    // Format numbers
    const toMoney = (n) => n.toFixed(2);
    totalsDiv.innerHTML = `
      <p>Subtotal: €${toMoney(subtotal)}</p>
      <p>VAT (21%): €${toMoney(vatAmount)}</p>
      <p>Delivery Fee: €${toMoney(shipping)}</p>
      <p><strong>Total: €${toMoney(total)}</strong></p>
    `;
  }

  // Initial render
  renderTable();
  updateTotals();

  // Event listener for VAT toggle
  vatToggle.addEventListener('change', () => {
    updateTotals();
  });
});