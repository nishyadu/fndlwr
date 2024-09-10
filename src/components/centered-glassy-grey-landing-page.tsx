'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Lawyer {
  id: number
  name: string
  specialty: string
  location: string
  imageurl: string
}

const getImageSrc = (imageUrl: string) => {
  if (!imageUrl) return '/default-lawyer-image.jpg';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  return `/lawyer-images/${imageUrl}`;
};

export function CenteredGlassyGreyLandingPage() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [searchResults, setSearchResults] = useState<Lawyer[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const suggestionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`)
      if (!response.ok) {
        throw new Error('Search failed')
      }
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error searching lawyers:', error)
      setSearchResults([])
    }
  }

  const fetchSuggestions = async (input: string) => {
    if (input.length < 2) {
      setSuggestions([])
      return
    }
    try {
      const response = await fetch(`/api/suggestions?query=${encodeURIComponent(input)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }
      const data = await response.json()
      setSuggestions(data)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    }
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    fetchSuggestions(value)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setSuggestions([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400">
      <div className="backdrop-blur-sm bg-white/30 min-h-screen">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">FNDLWR</div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-black transition-colors">How It Works</a>
              <a href="#" className="text-gray-700 hover:text-black transition-colors">For Lawyers</a>
              <a href="#" className="text-gray-700 hover:text-black transition-colors">About Us</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="text-gray-800 border-gray-800 hover:bg-gray-100">
                Login
              </Button>
              <Button className="md:hidden text-gray-800" variant="ghost">
                <Menu />
              </Button>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
            Find the Right Lawyer for You
          </h1>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-grow relative w-full md:w-2/5">
                <Input
                  type="text"
                  placeholder="Search by name or specialty"
                  value={query}
                  onChange={handleQueryChange}
                  className="w-full"
                />
                {suggestions.length > 0 && (
                  <div 
                    ref={suggestionRef} 
                    className="absolute z-10 w-full bg-white/80 backdrop-blur-sm border border-gray-300 mt-1 rounded-md shadow-lg"
                  >
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100/80 cursor-pointer text-gray-800"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-grow w-full md:w-2/5"
              />
              <Button 
                onClick={handleSearch} 
                className="w-full md:w-1/5 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Search
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((lawyer) => (
                  <Link href={`/lawyer/${lawyer.id}`} key={lawyer.id}>
                    <div className="rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                      <div className="relative h-48">
                        <Image
                          src={getImageSrc(lawyer.imageurl)}
                          alt={lawyer.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4 bg-white/60 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{lawyer.name}</h3>
                        <p className="text-gray-700 mb-1">{lawyer.specialty}</p>
                        <p className="text-gray-600 text-sm">{lawyer.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>

        <footer className="container mx-auto px-4 py-8 mt-20">
          <div className="max-w-[60%] mx-auto border-t border-gray-300 pt-8">
            <div className="grid md:grid-cols-4 gap-8 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">FNDLWR</h3>
                <p className="text-sm">Connecting you with the legal help you need, when you need it.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Quick Links</h4>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="hover:text-gray-900">How It Works</a></li>
                  <li><a href="#" className="hover:text-gray-900">For Lawyers</a></li>
                  <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                  <li><a href="#" className="hover:text-gray-900">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal</h4>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-gray-900">Cookie Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-gray-900">Facebook</a>
                  <a href="#" className="hover:text-gray-900">Twitter</a>
                  <a href="#" className="hover:text-gray-900">LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-600">
              © 2023 FNDLWR. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}