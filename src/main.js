import { html } from 'lit';
import { component, useState } from '@pionjs/pion';

function CocktailApp() {
  const [ready] = useState(true);
  return html`
    <h1>Hello World</h1>
    ${ready ? html`<p>Testing pion component</p>` : ''}
  `;
}

customElements.define('cocktail-app', component(CocktailApp));