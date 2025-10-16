import { html } from 'lit';
import { component } from '@pionjs/pion';

function ResultsContainer() {
  return html`
    <style>
      .results-container {
        flex: 3;
        border: 1px solid #ccc;
        padding: 16px;
        background: #fff;
      }
    </style>
    <div class="results-container">
      <!-- cocktail cards place holder -->
      <p>Search results</p>
    </div>
`;
}

customElements.define('results-container', component(ResultsContainer));