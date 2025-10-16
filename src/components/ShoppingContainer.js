import { html } from 'lit';
import { component } from '@pionjs/pion';

function ShoppingContainer({ items = [] }) {
  function handlePrint() {
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write(`
      <html><head><title>Print Shopping List</title></head><body>
        <h2>Shopping List</h2>
        <ul>
          <li>Tequila</li>
          <li>Lime juice</li>
        </ul>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
  return html`
    <style>
      .shopping-container {
        flex: 1;
        border: 1px solid #ccc;
        padding: 16px;
        background: #fff;
      }
    </style>
    <div class="shopping-container">
      <h2>Shopping List</h2>
      <ul>
        ${items.length === 0 ? html`<li>No items yet.</li>` : items.map(item => html`<li>${item}</li>`)}
      </ul>
      <button @click="${handlePrint}">Print</button>
    </div>
  `;
}

customElements.define('shopping-container', component(ShoppingContainer));