import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Brain, TrendingUp, Users, Shield, Cpu, Activity, BarChart3, MessageSquare } from 'lucide-react';

const data = [
  { name: '00:00', sentiment: 40, volume: 2400 },
  { name: '04:00', sentiment: 30, volume: 1398 },
  { name: '08:00', sentiment: 80, volume: 9800 },
  { name: '12:00', sentiment: 55, volume: 3908 },
  { name: '16:00', sentiment: 90, volume: 4800 },
  { name: '20:00', sentiment: 70, volume: 3800 },
];

export default function App() {
  const [stats, setStats] = useState<any>(null);
  const [sentiment, setSentiment] = useState<any>(null);

  useEffect(() => {
    fetch('/api/vault/stats').then(res => res.json()).then(setStats);
    fetch('/api/sentiment').then(res => res.json()).then(setSentiment);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6">
      {/* Header */}
      <nav className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Brain className="w-10 h-10 text-solana-green" />
          <h1 className="text-2xl font-bold tracking-tight">SentientVault <span className="text-solana-purple">'Bag'</span></h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-all">
            Documentation
          </button>
          <button className="bg-solana-purple px-6 py-2 rounded-lg font-bold hover:bg-opacity-80 transition-all">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Stats & Sentiment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[ 
              { label: 'Total Value Locked', value: stats?.tvl || '$0', icon: Shield, color: 'text-solana-green' },
              { label: 'Current APY', value: stats?.apy || '0%', icon: TrendingUp, color: 'text-solana-purple' },
              { label: 'Active Positions', value: stats?.active_positions || '0', icon: Activity, color: 'text-blue-400' }
            ].map((item, i) => (
              <div key={i} className="glass-panel p-6">
                <item.icon className={`w-5 h-5 ${item.color} mb-3`} />
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6 h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="text-solana-green" /> 
                  Social Sentiment Engine
                </h2>
                <p className="text-sm text-gray-400">Real-time X analysis across 500+ Solana tokens</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-solana-green/20 text-solana-green px-2 py-1 rounded">Live Feed</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14F195" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14F195" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#4b5563" />
                  <YAxis stroke="#4b5563" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                  <Area type="monotone" dataKey="sentiment" stroke="#14F195" fillOpacity={1} fill="url(#colorSent)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Agent Status & DAO */}
        <div className="space-y-6">
          <div className="glass-panel p-6 border-solana-purple/30">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-solana-purple animate-pulse" />
              <h2 className="font-bold uppercase tracking-widest text-sm">Autonomous Agent: Bag</h2>
            </div>
            <div className="bg-black/40 p-4 rounded-lg font-mono text-xs text-solana-green border border-solana-green/20 h-48 overflow-y-auto">
              <p className="mb-2">> [08:12:01] Scanning On-chain DexScreener...</p>
              <p className="mb-2 text-white">> [08:12:05] Sentiment Spiked: $BONK (+12.4%)</p>
              <p className="mb-2">> [08:12:10] Rebalancing LP Pool: SOL-USDC to BONK-SOL</p>
              <p className="mb-2 animate-pulse">> [08:12:15] Monitoring community signals...</p>
              <p className="mb-2">> [08:12:20] Governance vote detected: Proposal #821</p>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-solana-purple" /> 
              Social-Governed Strategy
            </h2>
            <div className="space-y-3">
              {sentiment?.top_tickers.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <div>
                    <span className="font-bold">{item.ticker}</span>
                    <p className="text-xs text-gray-500">Vol: {item.volume}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded ${item.sentiment.includes('Bullish') ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {item.sentiment}
                    </span>
                    <button className="p-1 hover:bg-white/10 rounded">
                      <MessageSquare className="w-4 h-4 text-solana-purple" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-bold">
              Submit Trade Proposal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}