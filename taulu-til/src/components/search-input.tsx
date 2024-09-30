"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { debounce } from "lodash";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// interface SearchFormProps {
//   initialQuery?: string
//   initialFilter?: string
//   searchParams?: { [key: string]: string | string[] | undefined }
// }

// export default function SearchForm({
//   initialQuery = "",
//   initialFilter = "kch",
// }: SearchFormProps) {
//   const router = useRouter();
//   const currentSearchParams = useSearchParams()
//   const [query, setQuery] = useState(initialQuery);
//   const [filter, setFilter] = useState(initialFilter);
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const isInitialMount = useRef(true)

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams)
//       params.set(name, value)
//       return params.toString()
//     },
//     [searchParams]
//   )


//   const debouncedSearch = useCallback(
//     debounce((newQuery: string, newFilter: string) => {
//       const params = new URLSearchParams(currentSearchParams.toString())
//       if (newQuery) {
//         params.set('query', newQuery)
//         params.set('filter', newFilter)
//       } else {
//         console.log('in here')
//         // params.delete('query')
//       }
//       if (isInputFocused) {
//         params.set('isInputFocused', 'true')
//       } else {
//         params.delete('isInputFocused')
//       }
//       router.push(`?${params.toString()}`, { scroll: false })
//     }, 300),
//     [router, isInputFocused, currentSearchParams]
//   )

//   useEffect(() => {
//     if (isInitialMount.current) {
//       isInitialMount.current = false
//     } else {
//       debouncedSearch(query, filter)
//     }
//   }, [query, filter, debouncedSearch]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         inputRef.current &&
//         !inputRef.current.contains(event.target as Node)
//       ) {
//         setIsInputFocused(false);
//         // debouncedSearch(query, filter);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [query, filter, debouncedSearch]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };

//   const handleInputFocus = () => {
//     setIsInputFocused(true);
//   };

// interface SearchFormProps {
//   initialQuery: string
//   initialFilter: string
// }

// export default function SearchForm({ initialQuery, initialFilter }: SearchFormProps) {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   const [query, setQuery] = useState(initialQuery)
//   const [filter, setFilter] = useState(initialFilter)
//   const [isInputFocused, setIsInputFocused] = useState(false)
//   const inputRef = useRef<HTMLInputElement>(null)

//   const createQueryString = useCallback(
//     (params: Record<string, string>) => {
//       const newSearchParams = new URLSearchParams(searchParams)
//       Object.entries(params).forEach(([key, value]) => {
//         if (value) {
//           newSearchParams.set(key, value)
//         } else {
//           newSearchParams.delete(key)
//         }
//       })
//       return newSearchParams.toString()
//     },
//     [searchParams]
//   )

//   const debouncedSearch = useCallback(
//     debounce((newQuery: string, newFilter: string) => {
//       if (newQuery) {
//         const newSearchParams = createQueryString({
//           query: newQuery,
//           filter: newFilter,
//           isInputFocused: isInputFocused.toString()
//         })
//         router.push(`${pathname}?${newSearchParams}`, { scroll: false })
//       }
//     }, 300),
//     [router, pathname, isInputFocused, createQueryString]
//   )

//   useEffect(() => {
//     if (query) {
      
//       debouncedSearch(query, filter)
//     }
//   }, [query, filter, debouncedSearch, isInputFocused])

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
//         console.log("BROOOOOO")
//         setIsInputFocused(false)
//         debouncedSearch(query, filter)

//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value)
//   }

//   const handleInputFocus = () => {
//     setIsInputFocused(true)
//   }

interface SearchFormProps {
  initialQuery: string
  initialFilter: string
}

export default function SearchForm({ initialQuery, initialFilter }: SearchFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const [filter, setFilter] = useState(initialFilter)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams)
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value)
        } else {
          newSearchParams.delete(key)
        }
      })
      return newSearchParams.toString()
    },
    [searchParams]
  )

  const updateSearchParams = useCallback(
    (newQuery: string, newFilter: string, focused: boolean) => {
      const newSearchParams = createQueryString({
        query: newQuery,
        filter: newFilter,
        isInputFocused: focused ? 'true' : ''
      })
      router.push(`${pathname}?${newSearchParams}`, { scroll: false, })
    },
    [router, pathname, createQueryString]
  )

  const debouncedSearch = useCallback(
    debounce((newQuery: string, newFilter: string, focused: boolean) => {
      if (newQuery) {
        updateSearchParams(newQuery, newFilter, focused)
      }
    }, 300),
    [updateSearchParams]
  )

  useEffect(() => {
    if (isInputFocused && query) {
      debouncedSearch(query, filter, isInputFocused)
    }
  }, [query, filter, debouncedSearch, isInputFocused])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsInputFocused(false)
        updateSearchParams(query, filter, false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [query, filter, updateSearchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
    updateSearchParams(query, filter, true)
  }

  return (
    <div ref={searchContainerRef} className="flex items-center w-full gap-1 rounded-lg ">
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className="w-full bg-white outline outline-white"
      />
      <div className="flex px-1 items-center bg-white rounded-lg">
        <p className="text-sm px-1">Search Language</p>
        <Select
          // type="single"
          value={filter}
          onValueChange={(value) => {
            if (value) {
              setFilter(value)
              updateSearchParams(query, value, isInputFocused)
            }
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select a fruit"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="kch" aria-label="Toggle kch">
                Karachay
              </SelectItem>
              <SelectItem value="tr" aria-label="Toggle tr">
                Turkish
              </SelectItem>
              <SelectItem value="en" aria-label="Toggle en">
                English
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
