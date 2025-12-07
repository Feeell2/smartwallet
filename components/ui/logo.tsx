import { Wallet } from "lucide-react";


function Logo() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-2xl shadow-emerald-500/40 mb-4">
        <Wallet className="w-8 h-8 text-slate-950" />
      </div>
      <h1 className="text-4xl font-bold text-white">SmartWallet</h1>
    </div>
  )
} 

export { Logo }