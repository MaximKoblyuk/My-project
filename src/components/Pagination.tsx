'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}: PaginationProps) {
  const { language } = useLanguage()

  if (totalPages <= 1) return null

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: number[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Smart pagination logic
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i)
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Show current page in middle
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i)
        }
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-700">
          {language === 'en' 
            ? `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} results`
            : `Zobrazeno ${startIndex + 1} až ${endIndex} z ${totalItems} výsledků`
          }
        </div>
        <div className="text-sm text-gray-500">
          {language === 'en' 
            ? `Page ${currentPage} of ${totalPages}`
            : `Stránka ${currentPage} z ${totalPages}`
          }
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {language === 'en' ? 'Previous' : 'Předchozí'}
        </button>

        {/* First page + ellipsis */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg"
            >
              1
            </button>
            {pageNumbers[0] > 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              currentPage === pageNum
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
            }`}
          >
            {pageNum}
          </button>
        ))}

        {/* Last page + ellipsis */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
          }`}
        >
          {language === 'en' ? 'Next' : 'Další'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Quick Jump to Page (for large datasets) */}
      {totalPages > 10 && (
        <div className="mt-4 flex items-center justify-center space-x-2 text-sm">
          <span className="text-gray-500">
            {language === 'en' ? 'Go to page:' : 'Přejít na stránku:'}
          </span>
          <select
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}