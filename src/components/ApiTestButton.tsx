'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export function ApiTestButton() {
  const { language } = useLanguage()
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<any>(null)

  const testApi = async () => {
    setTesting(true)
    setResults(null)

    try {
      console.log('🧪 Testování Google Places API...')
      
      const response = await fetch('/api/places?category=autoopravna&location=Praha,%20Czech%20Republic')
      const data = await response.json()
      
      console.log('✅ API Response:', data)
      setResults(data)
      
    } catch (error) {
      console.error('❌ API Error:', error)
      setResults({ error: error.message })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-yellow-800 mb-2">
        🧪 Google Places API Test
      </h3>
      
      <button
        onClick={testApi}
        disabled={testing}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
      >
        {testing ? 'Testování...' : 'Test Autoopravny v Praze'}
      </button>

      {results && (
        <div className="mt-4 p-3 bg-white rounded border">
          <h4 className="font-medium mb-2">Výsledky:</h4>
          {results.error ? (
            <p className="text-red-600">❌ Chyba: {results.error}</p>
          ) : (
            <div>
              <p className="text-green-600">✅ Úspěch!</p>
              <p>📍 Lokace: {results.location}</p>
              <p>📊 Počet služeb: {results.total}</p>
              {results.services && results.services.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">První služba:</p>
                  <p>🏪 {results.services[0].name}</p>
                  <p>⭐ {results.services[0].rating}/5</p>
                  <p>📍 {results.services[0].address}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}