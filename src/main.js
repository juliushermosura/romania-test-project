import { html } from 'lit';
import { component, useState, useEffect } from '@pionjs/pion';
import './components/SearchBar.js';
import './components/ResultsContainer.js';
import './components/ShoppingContainer.js';

function CocktailApp() {
  const [query, setQuery] = useState('margarita');
  const [toasterMsg, setToasterMsg] = useState('');
  const [showToaster, setShowToaster] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    function handleSearchEvent(e) {
      setQuery(e.detail.query);
      setToasterMsg('Searching...');
      setShowToaster(true);
      setResultsReady(false);
    }
    document.addEventListener('cocktail-search', handleSearchEvent);
    return () => document.removeEventListener('cocktail-search', handleSearchEvent);
  }, []);

  useEffect(() => {
    function handleResultsEvent(e) {
      if (e.detail.loading) {
        setToasterMsg('Searching...');
        setShowToaster(true);
        setResultsReady(false);
      } else if (e.detail.results === 0) {
        setTimeout(() => {
          setToasterMsg('No results found.');
          setShowToaster(true);
          setResultsReady(true);
          setTimeout(() => setShowToaster(false), 2000);
        }, 3000);
      } else {
        setTimeout(() => {
          setToasterMsg('Here are the results.');
          setShowToaster(true);
          setResultsReady(true);
          setTimeout(() => setShowToaster(false), 2000);
        }, 3000);
      }
    }
    document.addEventListener('cocktail-results', handleResultsEvent);
    return () => document.removeEventListener('cocktail-results', handleResultsEvent);
  }, []);

  return html`
    <cocktail-search></cocktail-search>
    <div class="app-container" style="display: flex;">
  <results-container .query="${query}" .showResults="${resultsReady}" .onAddIngredients="${ingredients => setShoppingList(prev => Array.from(new Set([...prev, ...ingredients])))}" style="flex: 3; border: 1px solid #ccc; padding: 16px; background: #fff;"></results-container>
  <shopping-container .items="${shoppingList}" style="flex: 1; border: 1px solid #ccc; padding: 16px; background: #fff;"></shopping-container>
    </div>
    ${showToaster && toasterMsg ? html`
      <div style="position: fixed; bottom: 24px; right: 24px; min-width: 200px; background: #333; color: #fff; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.25); font-size: 1rem; z-index: 1000; opacity: 0; animation: fadeInToaster 0.7s forwards;">
        ${toasterMsg}
      </div>
    ` : ''}
    <style>
      @keyframes fadeInToaster {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0);}
      }
    </style>
   `;
}

customElements.define('cocktail-app', component(CocktailApp));