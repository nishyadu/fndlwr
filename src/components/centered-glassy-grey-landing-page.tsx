'use client'

import { useState } from "react"
import Image from "next/image"
import { Search, MapPin, ArrowRight, Check, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Lawyer = {
  id: number;
  name: string;
  specialty: string;
  location: string;
  imageurl: string;
}

export function CenteredGlassyGreyLandingPage() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [searchResults, setSearchResults] = useState<Lawyer[]>([])

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

        <main className="container mx-auto px-4 py-20">
          <div className="max-w-[60%] mx-auto bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Find Your Perfect Legal Match</h1>
              <p className="text-xl text-gray-600 mb-8">Connect with top-rated lawyers tailored to your needs</p>
            </div>

            <div className="max-w-3xl mx-auto bg-white/60 rounded-lg p-2 shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="flex-grow flex items-center bg-white/80 rounded-lg p-2 mb-2 md:mb-0 md:mr-2 shadow-sm">
                  <Search className="text-gray-500 mr-2" />
                  <Input 
                    className="bg-transparent border-none text-gray-800 placeholder-gray-500" 
                    placeholder="Legal issue or lawyer name" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="flex-grow flex items-center bg-white/80 rounded-lg p-2 mb-2 md:mb-0 md:mr-2 shadow-sm">
                  <MapPin className="text-gray-500 mr-2" />
                  <Input 
                    className="bg-transparent border-none text-gray-800 placeholder-gray-500" 
                    placeholder="Location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <Button 
                  className="bg-gray-800 text-white hover:bg-gray-900 shadow-sm"
                  onClick={handleSearch}
                >
                  Search
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Display search results */}
            {searchResults.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Results</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((lawyer) => (
                    <div key={lawyer.id} className="bg-white/80 rounded-lg p-4 shadow-md">
                      <div className="mb-4 relative h-48 w-full">
                        <Image
                          src={`/lawyer-images/${lawyer.imageurl}`}
                          alt={lawyer.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{lawyer.name}</h3>
                      <p className="text-gray-600">{lawyer.specialty}</p>
                      <p className="text-gray-600">{lawyer.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {[
                { title: "Expert Lawyers", description: "Access to a network of verified, experienced attorneys" },
                { title: "Easy Booking", description: "Schedule consultations with just a few clicks" },
                { title: "Secure Platform", description: "Your information is protected with top-notch security" }
              ].map((item, index) => (
                <div key={index} className="bg-white/60 rounded-lg p-6 text-gray-800 shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose FNDLWR?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {[
                  "Verified Professionals",
                  "24/7 Support",
                  "Transparent Pricing",
                  "Tailored Matches",
                  "Secure Communication",
                  "Money-Back Guarantee"
                ].map((item, index) => (
                  <div key={index} className="flex items-center bg-white/60 rounded-lg p-4 shadow-sm">
                    <Check className="text-gray-800 mr-2" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Find Your Lawyer?</h2>
              <p className="text-xl text-gray-600 mb-8">Get started now and connect with a qualified lawyer in minutes.</p>
              <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-900 shadow-md">
                Get Started
              </Button>
            </div>
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