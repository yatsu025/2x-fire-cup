"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormData {
  teamName: string
  leaderName: string
  leaderContact: string
  players: Array<{
    name: string
    uid: string
  }>
  paymentScreenshot: File | null
}

export function RegistrationForm({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    leaderName: "",
    leaderContact: "",
    players: [
      { name: "", uid: "" },
      { name: "", uid: "" },
      { name: "", uid: "" },
      { name: "", uid: "" },
    ],
    paymentScreenshot: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.teamName.trim()) newErrors.teamName = "Team name is required"
    if (!formData.leaderName.trim()) newErrors.leaderName = "Leader name is required"
    if (!formData.leaderContact.trim()) newErrors.leaderContact = "Contact number is required"
    if (!/^\d{10}$/.test(formData.leaderContact)) newErrors.leaderContact = "Contact must be 10 digits"

    formData.players.forEach((player, idx) => {
      if (!player.name.trim()) newErrors[`player${idx}Name`] = "Player name is required"
      if (!player.uid.trim()) newErrors[`player${idx}Uid`] = "Game UID is required"
    })

    if (!formData.paymentScreenshot) newErrors.paymentScreenshot = "Payment screenshot is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSubmitSuccess()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePlayerChange = (index: number, field: "name" | "uid", value: string) => {
    const newPlayers = [...formData.players]
    newPlayers[index][field] = value
    setFormData({ ...formData, players: newPlayers })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      setErrors({ ...errors, paymentScreenshot: "Only JPG and PNG files are allowed" })
      return
    }
    setFormData({ ...formData, paymentScreenshot: file })
    setErrors({ ...errors, paymentScreenshot: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Team Information Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-orange-500/30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/50">
            1
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300">
            Team Information
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="teamName" className="text-base text-orange-200 font-bold mb-3 block">
              Team Name
            </Label>
            <Input
              id="teamName"
              placeholder="Enter your team name"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 text-lg py-3 rounded-xl backdrop-blur-sm transition-all"
            />
            {errors.teamName && <p className="text-red-400 text-sm mt-2 font-medium">{errors.teamName}</p>}
          </div>
        </div>
      </div>

      {/* Leader Information Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-orange-500/30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/50">
            2
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300">
            Team Leader Details
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="leaderName" className="text-base text-orange-200 font-bold mb-3 block">
              Leader Name
            </Label>
            <Input
              id="leaderName"
              placeholder="Enter leader name"
              value={formData.leaderName}
              onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
              className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 text-lg py-3 rounded-xl backdrop-blur-sm transition-all"
            />
            {errors.leaderName && <p className="text-red-400 text-sm mt-2 font-medium">{errors.leaderName}</p>}
          </div>

          <div>
            <Label htmlFor="leaderContact" className="text-base text-orange-200 font-bold mb-3 block">
              Contact Number
            </Label>
            <Input
              id="leaderContact"
              placeholder="10-digit phone number"
              type="tel"
              maxLength={10}
              value={formData.leaderContact}
              onChange={(e) => setFormData({ ...formData, leaderContact: e.target.value.replace(/\D/g, "") })}
              className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 text-lg py-3 rounded-xl backdrop-blur-sm transition-all"
            />
            {errors.leaderContact && <p className="text-red-400 text-sm mt-2 font-medium">{errors.leaderContact}</p>}
          </div>
        </div>
      </div>

      {/* Players Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-orange-500/30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/50">
            3
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300">
            Squad Members
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.players.map((player, idx) => (
            <div
              key={idx}
              className="bg-black/30 border border-orange-500/20 rounded-xl p-5 backdrop-blur-sm hover:border-orange-500/40 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                  {idx + 1}
                </div>
                <span className="text-orange-200 font-bold">Player {idx + 1}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor={`player${idx}Name`} className="text-sm text-orange-200 font-semibold mb-2 block">
                    Player Name
                  </Label>
                  <Input
                    id={`player${idx}Name`}
                    placeholder="Enter player name"
                    value={player.name}
                    onChange={(e) => handlePlayerChange(idx, "name", e.target.value)}
                    className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 py-2 rounded-lg backdrop-blur-sm transition-all text-sm"
                  />
                  {errors[`player${idx}Name`] && (
                    <p className="text-red-400 text-xs mt-1">{errors[`player${idx}Name`]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`player${idx}Uid`} className="text-sm text-orange-200 font-semibold mb-2 block">
                    Game UID
                  </Label>
                  <Input
                    id={`player${idx}Uid`}
                    placeholder="Enter game UID"
                    value={player.uid}
                    onChange={(e) => handlePlayerChange(idx, "uid", e.target.value)}
                    className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 py-2 rounded-lg backdrop-blur-sm transition-all text-sm"
                  />
                  {errors[`player${idx}Uid`] && (
                    <p className="text-red-400 text-xs mt-1">{errors[`player${idx}Uid`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-orange-500/30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/50">
            4
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300">
            Payment Method
          </h2>
        </div>

        {/* Payment Instructions */}
        <div className="bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">₹</span>
              </div>
              <h3 className="text-xl font-bold text-blue-300">Registration Fee: ₹160 per team</h3>
            </div>
            
            <div className="flex justify-center my-6">
              <div className="w-64 h-64 bg-white rounded-lg overflow-hidden shadow-xl shadow-blue-500/20">
                <img 
                  src="/payment.png" 
                  alt="Payment QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <p className="text-blue-200 font-semibold text-lg">📱 Scan QR Code to Pay ₹160</p>
            </div>
          </div>
        </div>

        {/* Payment Screenshot Upload */}
        <div className="bg-black/30 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-300 text-xl">📸</span>
              <h4 className="text-lg font-bold text-orange-200">Upload Payment Screenshot</h4>
            </div>
            
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-4">
              <p className="text-orange-200 text-sm font-medium mb-2">⚠️ Important Instructions:</p>
              <ul className="text-orange-200/80 text-sm space-y-1 list-disc list-inside">
                <li>Pay exactly ₹160 using the QR code above</li>
                <li>Take a clear screenshot of the payment confirmation</li>
                <li>Upload the screenshot below to complete registration</li>
                <li>Only JPG/PNG files are accepted (Max 5MB)</li>
              </ul>
            </div>

            <label className="block border-2 border-dashed border-orange-500/50 rounded-xl p-8 hover:border-orange-400 transition-all cursor-pointer bg-black/20 hover:bg-black/40 text-center group">
              <input type="file" onChange={handleFileChange} accept="image/jpeg,image/png" className="hidden" />
              <div className="space-y-3">
                <div className="text-4xl group-hover:scale-110 transition-transform">📱</div>
                <div className="text-orange-300 font-bold text-lg">Click to Upload Payment Screenshot</div>
                <p className="text-orange-200/60 text-sm">JPG or PNG (Max 5MB)</p>
                {formData.paymentScreenshot && (
                  <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3 mt-4">
                    <p className="text-green-400 text-sm font-semibold flex items-center justify-center gap-2">
                      <span>✓</span>
                      <span>{formData.paymentScreenshot.name}</span>
                    </p>
                  </div>
                )}
              </div>
            </label>
            {errors.paymentScreenshot && (
              <p className="text-red-400 text-sm mt-3 font-medium flex items-center gap-2">
                <span>⚠️</span>
                {errors.paymentScreenshot}
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black text-lg py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/50 hover:shadow-orange-600/80 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest transform hover:scale-105 active:scale-95"
      >
        {isSubmitting ? "Registering..." : "Register Your Team"}
      </button>

      <p className="text-center text-orange-200/60 text-xs">
        All fields are required. By registering, you accept our terms & conditions.
      </p>
    </form>
  )
}
