'use client'

import { useEffect, useRef } from 'react'

interface VideoBackgroundProps {
  src: string
  poster?: string
  className?: string
  children?: React.ReactNode
}

export function VideoBackground({ src, poster, className = '', children }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Ensure video plays on mobile devices
      video.muted = true
      video.playsInline = true
      
      // Handle video load errors gracefully
      const handleError = () => {
        console.warn('Video failed to load, using fallback background')
        if (video.parentElement) {
          video.parentElement.style.background = 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)'
        }
      }
      
      video.addEventListener('error', handleError)
      
      // Attempt to play video
      const playVideo = async () => {
        try {
          await video.play()
        } catch (error) {
          console.warn('Video autoplay failed:', error)
        }
      }
      
      if (video.readyState >= 2) {
        playVideo()
      } else {
        video.addEventListener('loadeddata', playVideo)
      }
      
      return () => {
        video.removeEventListener('error', handleError)
        video.removeEventListener('loadeddata', playVideo)
      }
    }
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      >
        <source src={src} type="video/mp4" />
        {/* Fallback message for unsupported browsers */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800" />
      </video>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-purple-800/80" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}