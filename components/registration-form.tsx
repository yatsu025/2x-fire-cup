"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"

interface FormData {
  teamName: string
  name: string
  contact: string
  playerType: "solo" | "duo" | "squad" | ""
  gameType: "bermuda" | "cs" | ""
  players: Array<{
    name: string
    uid: string
  }>
  paymentScreenshot: File | null
}

export function RegistrationForm({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    name: "",
    contact: "",
    playerType: "",
    gameType: "",
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

  const isTeamNameFilled = formData.teamName.trim().length > 0
  const isNameFilled = formData.name.trim().length > 0
  const isContactValid = /^\d{10}$/.test(formData.contact)
  const canShowName = isTeamNameFilled
  const canShowContact = isNameFilled
  const canShowPlayerType = isContactValid
  const canShowPlayerDetails = canShowPlayerType && formData.playerType !== ""
  const canShowGameType = canShowPlayerDetails
  const canShowPayment = canShowGameType && formData.gameType !== ""

  const getPaymentAmount = () => {
    if (formData.playerType === "solo") return 80
    if (formData.playerType === "duo") return 100
    if (formData.playerType === "squad") return 160
    return 0
  }

  const paymentAmount = getPaymentAmount()

  const getPaymentImage = () => {
    if (paymentAmount === 80) return "/payment-80.jpeg"
    if (paymentAmount === 100) return "/payment-100.jpeg"
    if (paymentAmount === 160) return "/payment.png"
    return "/payment.png"
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.teamName.trim()) newErrors.teamName = "Team name is required"
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required"
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be 10 digits"
    }

    if (!formData.playerType) newErrors.playerType = "Please select player type"
    if (!formData.gameType) newErrors.gameType = "Please select game type"

    if (formData.playerType === "solo") {
      if (!formData.players[0].uid.trim()) {
        newErrors.player0Uid = "Your UID is required"
      }
    }

    if (formData.playerType === "duo") {
      if (!formData.players[0].uid.trim()) {
        newErrors.player0Uid = "Player 1 UID is required"
      }
      if (!formData.players[1].name.trim()) {
        newErrors.player1Name = "Player 2 name is required"
      }
      if (!formData.players[1].uid.trim()) {
        newErrors.player1Uid = "Player 2 UID is required"
      }
    }

    if (formData.playerType === "squad") {
      if (!formData.players[0].uid.trim()) {
        newErrors.player0Uid = "Player 1 UID is required"
      }
      for (let idx = 1; idx <= 3; idx++) {
        if (!formData.players[idx].name.trim()) {
          newErrors[`player${idx}Name`] = `Player ${idx + 1} name is required`
        }
        if (!formData.players[idx].uid.trim()) {
          newErrors[`player${idx}Uid`] = `Player ${idx + 1} UID is required`
        }
      }
    }

    if (!formData.paymentScreenshot) newErrors.paymentScreenshot = "Payment screenshot is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/publish" , {...formData , paymentScreenshot : "You need pass link of sc"})
      if(response.data.success){
        onSubmitSuccess();
      }else{
        throw new Error("Please contact devloper !!!")
      }
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
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-orange-500/30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/50">
            1
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300">
            Team Details
          </h2>
        </div>

        <div className="space-y-6">
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

          {canShowName && (
            <div>
              <Label htmlFor="name" className="text-base text-orange-200 font-bold mb-3 block">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 text-lg py-3 rounded-xl backdrop-blur-sm transition-all"
              />
              {errors.name && <p className="text-red-400 text-sm mt-2 font-medium">{errors.name}</p>}
            </div>
          )}

          {canShowContact && (
            <div>
              <Label htmlFor="contact" className="text-base text-orange-200 font-bold mb-3 block">
                Contact Number
              </Label>
              <Input
                id="contact"
                placeholder="10-digit phone number"
                type="tel"
                maxLength={10}
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value.replace(/\D/g, "") })}
                className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 text-lg py-3 rounded-xl backdrop-blur-sm transition-all"
              />
              {errors.contact && <p className="text-red-400 text-sm mt-2 font-medium">{errors.contact}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-orange-500/30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/50">
            2
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300">
            Player Type
          </h2>
        </div>

        {canShowPlayerType && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {[
                { value: "solo", label: "Solo" },
                { value: "duo", label: "Duo" },
                { value: "squad", label: "Squad" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, playerType: option.value as FormData["playerType"] })}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                    formData.playerType === option.value
                      ? "bg-orange-500 text-white border-orange-400"
                      : "bg-black/40 text-orange-200 border-orange-500/40 hover:border-orange-400 hover:bg-black/60"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {errors.playerType && <p className="text-red-400 text-sm mt-2 font-medium">{errors.playerType}</p>}
          </div>
        )}

        {canShowPlayerDetails && (
          <div className="space-y-4">
            {formData.playerType === "solo" && (
              <div className="bg-black/30 border border-orange-500/20 rounded-xl p-5 backdrop-blur-sm">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="soloUid" className="text-sm text-orange-200 font-semibold mb-2 block">
                      Your Game UID
                    </Label>
                    <Input
                      id="soloUid"
                      placeholder="Enter your game UID"
                      value={formData.players[0].uid}
                      onChange={(e) => handlePlayerChange(0, "uid", e.target.value)}
                      className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 py-2 rounded-lg backdrop-blur-sm transition-all text-sm"
                    />
                    {errors.player0Uid && <p className="text-red-400 text-xs mt-1">{errors.player0Uid}</p>}
                  </div>
                </div>
              </div>
            )}

            {formData.playerType === "duo" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-black/30 border border-orange-500/20 rounded-xl p-5 backdrop-blur-sm">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="duoPlayer1Uid" className="text-sm text-orange-200 font-semibold mb-2 block">
                        Your UID (Player 1)
                      </Label>
                      <Input
                        id="duoPlayer1Uid"
                        placeholder="Enter your game UID"
                        value={formData.players[0].uid}
                        onChange={(e) => handlePlayerChange(0, "uid", e.target.value)}
                        className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 py-2 rounded-lg backdrop-blur-sm transition-all text-sm"
                      />
                      {errors.player0Uid && <p className="text-red-400 text-xs mt-1">{errors.player0Uid}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 border border-orange-500/20 rounded-xl p-5 backdrop-blur-sm">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="duoPlayer2Name" className="text-sm text-orange-200 font-semibold mb-2 block">
                        Player 2 Name
                      </Label>
                      <Input
                        id="duoPlayer2Name"
                        placeholder="Enter player 2 name"
                        value={formData.players[1].name}
                        onChange={(e) => handlePlayerChange(1, "name", e.target.value)}
                        className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 py-2 rounded-lg backdrop-blur-sm transition-all text-sm"
                      />
                      {errors.player1Name && <p className="text-red-400 text-xs mt-1">{errors.player1Name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="duoPlayer2Uid" className="text-sm text-orange-200 font-semibold mb-2 block">
                        Player 2 UID
                      </Label>
                      <Input
                        id="duoPlayer2Uid"
                        placeholder="Enter player 2 UID"
                        value={formData.players[1].uid}
                        onChange={(e) => handlePlayerChange(1, "uid", e.target.value)}
                        className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 py-2 rounded-lg backdrop-blur-sm transition-all text-sm"
                      />
                      {errors.player1Uid && <p className="text-red-400 text-xs mt-1">{errors.player1Uid}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.playerType === "squad" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-black/30 border border-orange-500/20 rounded-xl p-5 backdrop-blur-sm">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="squadPlayer1Uid" className="text-sm text-orange-200 font-semibold mb-2 block">
                        Your UID (Player 1)
                      </Label>
                      <Input
                        id="squadPlayer1Uid"
                        placeholder="Enter your game UID"
                        value={formData.players[0].uid}
                        onChange={(e) => handlePlayerChange(0, "uid", e.target.value)}
                        className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 py-2 rounded-lg backdrop-blur-sm transition-all text-sm"
                      />
                      {errors.player0Uid && <p className="text-red-400 text-xs mt-1">{errors.player0Uid}</p>}
                    </div>
                  </div>
                </div>

                {[1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="bg-black/30 border border-orange-500/20 rounded-xl p-5 backdrop-blur-sm"
                  >
                    <div className="space-y-3">
                      <div>
                        <Label
                          htmlFor={`squadPlayer${idx + 1}Name`}
                          className="text-sm text-orange-200 font-semibold mb-2 block"
                        >
                          Player {idx + 1} Name {idx === 3 && <span className="text-orange-300 text-xs ml-1">(Extra Player)</span>}
                        </Label>
                        <Input
                          id={`squadPlayer${idx + 1}Name`}
                          placeholder={`Enter player ${idx + 1} name`}
                          value={formData.players[idx].name}
                          onChange={(e) => handlePlayerChange(idx, "name", e.target.value)}
                          className="bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-500/30 py-2 rounded-lg backdrop-blur-sm transition-all text-sm"
                        />
                        {errors[`player${idx}Name`] && (
                          <p className="text-red-400 text-xs mt-1">{errors[`player${idx}Name`]}</p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor={`squadPlayer${idx + 1}Uid`}
                          className="text-sm text-orange-200 font-semibold mb-2 block"
                        >
                          Player {idx + 1} UID
                        </Label>
                        <Input
                          id={`squadPlayer${idx + 1}Uid`}
                          placeholder={`Enter player ${idx + 1} UID`}
                          value={formData.players[idx].uid}
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
            )}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-orange-500/30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/50">
            3
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300">
            Game Type
          </h2>
        </div>

        {canShowGameType && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {[
                { value: "bermuda", label: "Bermuda Full Map" },
                { value: "cs", label: "CS Custom" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, gameType: option.value as FormData["gameType"] })}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                    formData.gameType === option.value
                      ? "bg-orange-500 text-white border-orange-400"
                      : "bg-black/40 text-orange-200 border-orange-500/40 hover:border-orange-400 hover:bg-black/60"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {errors.gameType && <p className="text-red-400 text-sm mt-2 font-medium">{errors.gameType}</p>}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-orange-500/30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/50">
            4
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300">
            Payment Method
          </h2>
        </div>

        {canShowPayment && paymentAmount > 0 && (
          <div className="bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₹</span>
                </div>
                <h3 className="text-xl font-bold text-blue-300">
                  Registration Fee: ₹{paymentAmount}{" "}
                  {formData.playerType === "solo"
                    ? "(Solo)"
                    : formData.playerType === "duo"
                      ? "(Duo)"
                      : "(Squad)"}
                </h3>
              </div>

              <div className="flex justify-center my-6">
                <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg overflow-hidden">
                  <img
                    src={getPaymentImage()}
                    alt="Payment QR Code"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <p className="text-blue-200 font-semibold text-lg">📱 Scan QR Code to Pay ₹{paymentAmount}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-black/30 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-300 text-xl">📸</span>
              <h4 className="text-lg font-bold text-orange-200">Upload Payment Screenshot</h4>
            </div>
            
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-4">
              <p className="text-orange-200 text-sm font-medium mb-2">⚠️ Important Instructions:</p>
              <ul className="text-orange-200/80 text-sm space-y-1 list-disc list-inside">
                <li>
                  {paymentAmount > 0
                    ? <>Pay exactly ₹{paymentAmount} using the QR code above</>
                    : "Pay the registration fee using the QR code above"}
                </li>
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
