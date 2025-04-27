// src/api.js
import axios from 'axios';

const SEARCH_PREFIXES = `
  PREFIX bd:      <http://www.bigdata.com/rdf#>
  PREFIX rdfs:    <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX wd:      <http://www.wikidata.org/entity/>
  PREFIX wikibase:<http://wikiba.se/ontology#>
`;

const PROP_PREFIXES = `
  PREFIX wd:      <http://www.wikidata.org/entity/>
  PREFIX wikibase:<http://wikiba.se/ontology#>
  PREFIX rdfs:    <http://www.w3.org/2000/01/rdf-schema#>
`;


const ENDPOINT = 'https://query.wikidata.org/sparql';




export async function searchItems(label) {
    const query = `
      ${SEARCH_PREFIXES}
      SELECT ?item ?itemLabel WHERE {
        ?item rdfs:label ?itemLabel .
        FILTER(LANG(?itemLabel)="en" && CONTAINS(LCASE(?itemLabel), LCASE("${label}")))
      }
      LIMIT 10
    `;
    const url = ENDPOINT
    + '?format=json'
    + '&query=' + encodeURIComponent(query);

    console.log('SPARQL URL →', url);
    const res = await axios.get(url, {
      headers: { Accept: 'application/sparql-results+json' }
    });
    return res.data.results.bindings.map(b => ({
      id:    b.item.value.split('/').pop(),
      label: b.itemLabel.value
    }));
  }
  
  export async function fetchProperties(itemId) {
    const query = `
      ${PROP_PREFIXES}
      SELECT ?propLabel ?value ?valueLabel WHERE {
        wd:${itemId} ?p ?value .
        ?property wikibase:directClaim ?p ;
                  rdfs:label ?propLabel .
        FILTER(LANG(?propLabel)="en")
        OPTIONAL {
          ?value rdfs:label ?valueLabel .
          FILTER(LANG(?valueLabel)="en")
        }
      }
      LIMIT 20
    `;
    const url = ENDPOINT + '?query=' + encodeURIComponent(query) + '&format=json';
    const res = await axios.get(url, {
      headers: { Accept: 'application/sparql-results+json' }
    });
    return res.data.results.bindings.map(b => ({
      property: b.propLabel.value,
      value:    b.valueLabel
                ? b.valueLabel.value
                : b.value.value
    }));
  }
  