# Wikidata Explorer

A web app to search and display Wikidata entries, built with React and SPARQL.

## Features

- Search box for querying Wikidata labels  
- List of matching items (label + Q-ID)  
- Clickable results that show a table of property–value pairs  

## Workflow

1, **Design and wireframe**  
   - Designed a simple UI with a search input, results list, and detail table  
   - Identified three main components: `SearchBox`, `ResultsList`, `DetailsPanel`  

2, **Project setup**  
   - Initialized with "create React App"  
   - Used `axios` for HTTP/SPARQL calls  

3, **API abstraction**  
   - Created `src/api.js` with two functions  
     - `searchItems(label)` builds and sends a SPARQL label‐search query  
     - `fetchProperties(itemId)` builds and sends a SPARQL property‐fetch query  
   - Declared RDF prefixes (`bd:`, `rdfs:`, `wd:`, `wikibase:`) and set correct Accept headers  

4, **UI components**  
   - **SearchBox** — controlled input and submit handler  
   - **ResultsList** — maps API results into buttons showing label and Q-ID  
   - **DetailsPanel** — renders selected item’s properties in a bordered table in the WEB UI.

5, **State management and UX polish**  
   - In `App.js`, managed `results`, `properties`, `loading`, `hasSearched` states  
   - Showed “Loading…” while fetching, “0 results” if none found  


7, **Version control & deployment**  
   - Committed code and pushed to both `master` and `main` branches on GitHub . The main branch has the final code for submission. 
   - Ensured `npm install` followed by `npm start` runs the app locally.

## Getting Started

```bash
git clone https://github.com/Swithinraj/wikidata-explorer.git
cd wikidata-explorer
npm install
npm start
