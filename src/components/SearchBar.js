import { html } from 'lit';
import { component } from '@pionjs/pion';

function CocktailSearch() {
  return html`
    <style>
      .search-bar {
        display: flex;
        padding: 16px;
        gap: 8px;
        background: #f5f5f5;
        border: 1px solid #cccccc;
        justify-content: center;
      }
      .search-bar input {
        padding: 8px;
        width: 500px;
      }
      .search-bar button {
        padding: 8px 16px;
      }
    </style>
    <div class="search-bar">
      <input type="text" placeholder="Margarita" />
      <button>Search</button>
    </div>`;
}

customElements.define('cocktail-search', component(CocktailSearch));