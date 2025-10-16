import { html } from 'lit';
import { component, useState } from '@pionjs/pion';
import './components/SearchBar.js';
import './components/ResultsContainer.js';
import './components/ShoppingContainer.js';

function CocktailApp() {
  const [ready] = useState(true);
  return html`
    <cocktail-search></cocktail-search>

    <div class="app-container" style="display: flex;">
      <results-container style="flex: 3; border: 1px solid #ccc; padding: 16px; background: #fff;"></results-container>
      <shopping-container style="flex: 1; border: 1px solid #ccc; padding: 16px; background: #fff;"></shopping-container>
    </div>
    <div style="position: fixed; bottom: 24px; right: 24px; min-width: 200px; background: #333; color: #fff; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.25); font-size: 1rem; z-index: 1000; opacity: 0; animation: fadeInToaster 0.7s forwards;">
      Searching...
    </div>
    <style>
      @keyframes fadeInToaster {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0);}
      }
    </style>
   `;
}

customElements.define('cocktail-app', component(CocktailApp));