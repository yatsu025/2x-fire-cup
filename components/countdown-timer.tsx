"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Registration ends at 12:00 AM on January 17th (end of January 16th)
      const eventDate = new Date("2026-01-17T00:00:00").getTime()
      const now = new Date().getTime()
      const difference = eventDate - now

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)), // Total hours, not modulo 24
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
      setIsLoaded(true)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isLoaded) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-12 sm:mb-16 px-4">
      <div className="text-center space-y-2 sm:space-y-3">
        <p className="text-sm sm:text-base lg:text-lg font-bold tracking-widest text-orange-400 uppercase">
          ⏰ Registration Closes In
        </p>
        <p className="text-xs sm:text-sm text-red-400/70 font-semibold tracking-wide">
          Registration closes January 17, 2026 • 12:00 AM
        </p>
      </div>

      <div className="flex gap-1 sm:gap-2 md:gap-4 lg:gap-6 justify-center items-center">
        {/* Hours Box */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-red-600/40 blur-xl sm:blur-2xl rounded-xl sm:rounded-2xl animate-pulse group-hover:animate-pulse"></div>
            <div className="absolute inset-0 bg-red-500/20 blur-lg sm:blur-xl rounded-xl sm:rounded-2xl"></div>

            <div className="relative bg-gradient-to-br from-red-950/80 via-red-900/60 to-orange-900/50 border-2 border-red-500/60 rounded-xl sm:rounded-2xl px-3 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 backdrop-blur-xl hover:border-red-400/80 transition-all duration-300 shadow-2xl">
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-300 via-red-400 to-orange-300 drop-shadow-lg animate-pulse">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm lg:text-base font-bold text-red-400 uppercase tracking-widest">Hours</p>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-b from-orange-400 to-red-400 text-transparent bg-clip-text opacity-70 animate-pulse">
            :
          </div>
        </div>

        {/* Minutes Box */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-600/40 blur-xl sm:blur-2xl rounded-xl sm:rounded-2xl animate-pulse group-hover:animate-pulse"></div>
            <div className="absolute inset-0 bg-orange-500/20 blur-lg sm:blur-xl rounded-xl sm:rounded-2xl"></div>

            <div className="relative bg-gradient-to-br from-orange-950/80 via-orange-900/60 to-yellow-900/50 border-2 border-orange-500/60 rounded-xl sm:rounded-2xl px-3 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 backdrop-blur-xl hover:border-orange-400/80 transition-all duration-300 shadow-2xl">
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-300 via-orange-400 to-yellow-300 drop-shadow-lg animate-pulse">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm lg:text-base font-bold text-orange-400 uppercase tracking-widest">Minutes</p>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-b from-orange-400 to-red-400 text-transparent bg-clip-text opacity-70 animate-pulse">
            :
          </div>
        </div>

        {/* Seconds Box */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-600/40 blur-xl sm:blur-2xl rounded-xl sm:rounded-2xl animate-pulse group-hover:animate-pulse"></div>
            <div className="absolute inset-0 bg-yellow-500/20 blur-lg sm:blur-xl rounded-xl sm:rounded-2xl"></div>

            <div className="relative bg-gradient-to-br from-yellow-950/80 via-yellow-900/60 to-orange-900/50 border-2 border-yellow-500/60 rounded-xl sm:rounded-2xl px-3 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 backdrop-blur-xl hover:border-yellow-400/80 transition-all duration-300 shadow-2xl">
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-300 drop-shadow-lg animate-pulse">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm lg:text-base font-bold text-yellow-400 uppercase tracking-widest">Seconds</p>
        </div>
      </div>

      <div className="text-center px-4">
        <p className="text-sm sm:text-base text-orange-300/80 font-semibold tracking-wide">
          Get ready to dominate. Register now before registrations close!
        </p>
      </div>
    </div>
  )
}
