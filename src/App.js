import React, { useState } from 'react'
import { searchItems, fetchProperties } from './api'
import SearchBox from './components/SearchBox'
import ResultsList from './components/ResultsList'
import DetailsPanel from './components/DetailsPanel'

export default function App() {
  const [lang, setLang] = useState('en')
  const [results, setResults] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async term => {
    setHasSearched(true)
    setProperties([])
    setLoading(true)
    try {
      const items = await searchItems(term, lang)
      setResults(items)
    } catch (err) {
      console.error(err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = async id => {
    setLoading(true)
    try {
      const props = await fetchProperties(id, lang)
      setProperties(props)
    } catch (err) {
      console.error(err)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Wikidata Explorer</h1>


      <SearchBox onSearch={handleSearch} />

      <div style={{ marginTop: '1rem' }}>
        {loading && <p>Loading…</p>}

        {!loading && hasSearched && results.length === 0 && (
          <p>0 results</p>
        )}

        {!loading && results.length > 0 && (
          <ResultsList items={results} onSelect={handleSelect} />
        )}
      </div>

      <DetailsPanel props={properties} />
    </div>
  )
}
