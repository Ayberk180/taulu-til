"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import searchtest from '@/actions/searchtest'

// Mock search function (replace with actual API call)
const searchAPI = async (query: string, filter: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return [`${filter} Result 1 for ${query}`, `${filter} Result 2 for ${query}`, `${filter} Result 3 for ${query}`]
}

// Debounce function
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [results, setResults] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, searchFilter: string) => {
      if (searchQuery.trim() !== '') {
        const searchResults = await searchtest(searchQuery, searchFilter)
        // console.log(searchResults)
        // setResults(searchResults)
        setIsOpen(true)
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(query, filter)
  }, [query, filter, debouncedSearch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFocus = () => {
    if (query.trim() !== '' && results.length > 0) {
      setIsOpen(true)
    }
  }

  return (
    <div ref={searchRef} className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        <Input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className="w-full"
        />
        <ToggleGroup type="single" value={filter} onValueChange={(value) => value && setFilter(value)}>
          <ToggleGroupItem value="all" aria-label="Toggle all">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="products" aria-label="Toggle products">
            Products
          </ToggleGroupItem>
          <ToggleGroupItem value="categories" aria-label="Toggle categories">
            Categories
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {isOpen && results.length > 0 && (
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="text-sm">{result}</li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  )
}