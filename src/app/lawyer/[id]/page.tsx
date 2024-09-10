'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

interface Lawyer {
  id: number
  name: string
  specialty: string
  location: string
  imageurl: string
  phone: string
  email: string
  website: string
  experience: string
  rate_range: string
  bio: string
  education: string
  certifications: string
  expertise: string[]
}

const getImageSrc = (imageUrl: string) => {
  if (!imageUrl) return '/default-lawyer-image.jpg';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  return `/lawyer-images/${imageUrl}`;
};

export default function LawyerDetailsPage() {
  const [lawyer, setLawyer] = useState<Lawyer | null>(null)
  const params = useParams()

  useEffect(() => {
    const fetchLawyerDetails = async () => {
      try {
        const response = await fetch(`/api/lawyer/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch lawyer details')
        }
        const data = await response.json()
        setLawyer(data)
      } catch (error) {
        console.error('Error fetching lawyer details:', error)
      }
    }

    if (params.id) {
      fetchLawyerDetails()
    }
  }, [params.id])

  if (!lawyer) {
    return <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 flex items-center justify-center">
      <div className="text-2xl text-white">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400">
      <div className="backdrop-blur-sm bg-white/30 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <Image
                  src={getImageSrc(lawyer.imageurl)}
                  alt={lawyer.name}
                  width={300}
                  height={300}
                  objectFit="cover"
                  className="h-full w-full object-cover md:w-48"
                />
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{lawyer.name}</h1>
                <p className="text-gray-600 text-xl mb-4">{lawyer.specialty}</p>
                <p className="text-gray-700 mb-2"><strong>Location:</strong> {lawyer.location}</p>
                <p className="text-gray-700 mb-2"><strong>Experience:</strong> {lawyer.experience}</p>
                <p className="text-gray-700 mb-2"><strong>Rate Range:</strong> {lawyer.rate_range}</p>
                <p className="text-gray-700 mb-4"><strong>Contact:</strong> {lawyer.phone} | {lawyer.email}</p>
                <a href={lawyer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
              </div>
            </div>
            <div className="p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {lawyer.name}</h2>
              <p className="text-gray-700 mb-4">{lawyer.bio}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
              <p className="text-gray-700 mb-4">{lawyer.education}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Certifications</h3>
              <p className="text-gray-700 mb-4">{lawyer.certifications}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Areas of Expertise</h3>
              <ul className="list-disc list-inside text-gray-700">
                {lawyer.expertise.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}