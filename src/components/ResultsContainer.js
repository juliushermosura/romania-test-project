import { html } from 'lit';
import { component, useState, useEffect } from '@pionjs/pion';

function ResultsContainer({ query = "margarita", showResults = true }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    document.dispatchEvent(new CustomEvent('cocktail-results', { detail: { loading: true } }));
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.drinks || []);
        setLoading(false);
        document.dispatchEvent(new CustomEvent('cocktail-results', { detail: { loading: false, results: (data.drinks ? data.drinks.length : 0) } }));
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
        document.dispatchEvent(new CustomEvent('cocktail-results', { detail: { loading: false, results: 0 } }));
      });
  }, [query]);

  return html`
    <style>
      .results-container {
        flex: 3;
        border: 1px solid #cccccc;
        padding: 16px;
        background: #ffffff;
      }
      .card {
        display: flex;
        align-items: stretch;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        margin-bottom: 20px;
        background: #fafafa;
        overflow: hidden;
        position: relative;
        min-height: 140px;
      }
      .card-image {
        flex: 1;
        max-width: 33%;
        object-fit: cover;
        height: 100%;
      }
      .card-content {
        flex: 2;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .card-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .card-desc {
        font-size: 1rem;
        color: #555;
        margin-bottom: 16px;
      }
      .card-add-btn {
        position: absolute;
        bottom: 12px;
        right: 16px;
        background: steelbue;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.12);
        transition: background 0.2s;
      }
      .card-add-btn:hover {
        background: lightsteelblue;
      }
    </style>
    <div class="results-container">
      ${loading ? html`<p>Loading...</p>` : !showResults ? '' : results.length === 0 ? html`<p>No results found.</p>` : results.map(drink => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
          const ingredient = drink[`strIngredient${i}`];
          const measure = drink[`strMeasure${i}`];
          if (ingredient) {
            ingredients.push(measure ? `${measure.trim()} ${ingredient}` : ingredient);
          }
        }
        return html`
          <div class="card">
            <img class="card-image" src="${drink.strDrinkThumb || '/img/marga.jpg'}" alt="${drink.strDrink}" />
            <div class="card-content">
              <div>
                <div class="card-title">${drink.strDrink}</div>
                <div class="card-desc">${drink.strInstructions || 'No description available.'}</div>
                <div class="card-ingredients">
                  <strong>Ingredients:</strong>
                  <ul>
                    ${ingredients.map(item => html`<li>${item}</li>`)}
                  </ul>
                </div>
              </div>
            </div>
            <button class="card-add-btn">+</button>
          </div>
        `;
      })}
    </div>
  `;
}

customElements.define('results-container', component(ResultsContainer));