'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface FavoriteService {
  id: string
  name: string
  category: string
  dateAdded: string
}

interface FavoritesContextType {
  favorites: FavoriteService[]
  addToFavorites: (service: FavoriteService) => void
  removeFromFavorites: (serviceId: string) => void
  isFavorite: (serviceId: string) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteService[]>([])

  // Load favorites from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fixpoints-favorites')
      if (saved) {
        try {
          setFavorites(JSON.parse(saved))
        } catch (error) {
          console.error('Error loading favorites:', error)
        }
      }
    }
  }, [])

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fixpoints-favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const addToFavorites = (service: FavoriteService) => {
    setFavorites(prev => {
      // Check if already exists
      if (prev.some(fav => fav.id === service.id)) {
        return prev
      }
      return [...prev, { ...service, dateAdded: new Date().toISOString() }]
    })
  }

  const removeFromFavorites = (serviceId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== serviceId))
  }

  const isFavorite = (serviceId: string) => {
    return favorites.some(fav => fav.id === serviceId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}