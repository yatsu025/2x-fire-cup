"use client"

export function SuccessMessage() {
  return (
    <div className="text-center space-y-10 py-12">
      {/* Trophy Animation Container */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute inset-0 opacity-50 blur-2xl"
          style={{
            background: "linear-gradient(135deg, #ff6b35, #ffa500)",
            animation: "spin 6s linear infinite",
          }}
        ></div>

        <div className="relative inline-block p-8 rounded-3xl bg-gradient-to-br from-orange-950/40 to-red-950/40 border-2 border-orange-500/60 backdrop-blur-xl hover:border-orange-400/80 transition-all duration-300 shadow-2xl shadow-orange-600/40">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="text-7xl drop-shadow-2xl animate-bounce" style={{ animationDuration: "1.5s" }}>
              🏆
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-6">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-300 via-red-300 to-yellow-300 drop-shadow-lg">
          Registration Successful! 🔥
        </h2>

        <div className="space-y-4">
          <p className="text-xl sm:text-2xl text-orange-300 font-bold tracking-wide">
            Your team is locked in for 2X Fire Cup!
          </p>

          <div className="bg-gradient-to-r from-black/40 to-orange-950/20 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-orange-200/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Congratulations! Your team registration has been confirmed. We've sent a confirmation message to your
              contact number. Prepare your squad, strategize your gameplay, and get ready to dominate the battlefield!
            </p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-black/30 border border-orange-500/20 rounded-xl p-4 backdrop-blur-sm hover:border-orange-500/40 transition-all">
              <p className="text-orange-400/70 text-xs font-bold uppercase tracking-widest mb-2">Tournament Date</p>
              <p className="text-orange-200 font-bold text-lg">January 18, 2026</p>
            </div>
            <div className="bg-black/30 border border-orange-500/20 rounded-xl p-4 backdrop-blur-sm hover:border-orange-500/40 transition-all">
              <p className="text-orange-400/70 text-xs font-bold uppercase tracking-widest mb-2">Team Status</p>
              <p className="text-green-400 font-bold text-lg">✓ Registered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-8 space-y-4">
        <button
          onClick={() => window.location.reload()}
          className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/50 hover:shadow-orange-600/80 uppercase tracking-widest transform hover:scale-105 active:scale-95"
        >
          Register Another Team
        </button>

        <p className="text-orange-400/60 text-sm font-semibold">
          Tournament starts on January 18th • May the best team win! 🔥
        </p>
      </div>
    </div>
  )
}
