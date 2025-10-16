import { html } from 'lit';
import { useState, component } from '@pionjs/pion';

function CocktailSearch({ onSearch }) {
  const [input, setInput] = useState('margarita');

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSearch() {
    if (onSearch) onSearch(input);
    const event = new CustomEvent('cocktail-search', { detail: { query: input } });
    document.dispatchEvent(event);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

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
  <input type="text" placeholder="Margarita" .value="${input}" @input="${handleInput}" @keydown="${handleKeyDown}" />
      <button @click="${handleSearch}">Search</button>
    </div>`;
}

customElements.define('cocktail-search', component(CocktailSearch));