"use client"

import { useState } from "react"
import { RegistrationForm } from "@/components/registration-form"
import { SuccessMessage } from "@/components/success-message"
import { CountdownTimer } from "@/components/countdown-timer"

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmitSuccess = () => {
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 opacity-50 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/40 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(249,115,22,0.1) 1px, transparent 1px), linear-gradient(rgba(249,115,22,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600/30 to-red-600/30 border border-orange-500/60 backdrop-blur-xl hover:border-orange-400/80 transition-all duration-300 shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 group cursor-pointer">
              <span className="text-orange-300 text-sm sm:text-base font-bold tracking-widest uppercase group-hover:text-orange-200 transition-colors">
                🔥 Free Fire Championship 🔥
              </span>
            </div>
          </div>

          <div className="text-center space-y-6 mb-12">
            <div className="relative">
              <h1
                className="text-5xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-300 via-red-400 to-yellow-300 drop-shadow-2xl animate-pulse"
                style={{
                  textShadow:
                    "0 0 40px rgba(239, 68, 68, 0.8), 0 0 80px rgba(249, 115, 22, 0.6), 0 0 120px rgba(202, 138, 4, 0.3), inset 0 0 20px rgba(255,200,50,0.2)",
                  letterSpacing: "0.05em",
                }}
              >
                2X FIRE CUP
              </h1>
              <div
                className="absolute inset-0 opacity-30 blur-2xl"
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #ffa500)",
                }}
              ></div>
            </div>

            <div className="space-y-3">
              <p className="text-xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300 font-bold tracking-wide">
                Ultimate Free Fire Championship
              </p>
              <p className="text-sm sm:text-lg text-orange-200 font-medium tracking-wide max-w-2xl mx-auto">
                Register your elite team and compete for exclusive prizes. Limited slots available - Secure yours now!
              </p>
            </div>
          </div>

          <div className="mb-16 px-4">
            <div className="bg-gradient-to-br from-black/60 via-orange-900/10 to-black/60 border border-orange-500/30 rounded-2xl backdrop-blur-xl p-6 shadow-2xl shadow-orange-600/20">
              <CountdownTimer />
            </div>
          </div>

          <div className="mb-12 text-center">
            <div className="inline-block bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/40 rounded-xl px-6 py-3 backdrop-blur-sm">
              <p className="text-yellow-300 font-bold text-lg sm:text-xl">🏆 Limited Prize Pool - Register Now!</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-3xl px-4">
          <div className="rounded-3xl backdrop-blur-2xl bg-gradient-to-b from-black/70 via-orange-950/10 to-black/70 border border-orange-500/40 p-8 sm:p-12 shadow-2xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all duration-300">
            {isSubmitted ? <SuccessMessage /> : <RegistrationForm onSubmitSuccess={handleSubmitSuccess} />}
          </div>
        </div>

        <div className="relative z-10 mt-16 text-center space-y-3">
          <p className="text-orange-400/80 text-sm font-medium">© 2026 2X Fire Cup. All rights reserved.</p>
          <p className="text-orange-500/60 text-xs tracking-widest uppercase">Powered by Fire 🔥</p>
        </div>
      </section>
    </div>
  )
}
