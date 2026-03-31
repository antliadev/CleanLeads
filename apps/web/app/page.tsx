'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Loader2, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[480px] w-full bg-white rounded-[48px] shadow-2xl shadow-indigo-100 p-12 border border-slate-100 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Networking Elite</h1>
          <p className="text-slate-500 mt-2 font-medium">Automação Comercial Multicanal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">E-mail Corporativo</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@network.com.br"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl py-4 pl-14 pr-6 text-slate-900 font-semibold transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Senha</label>
              <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Esqueceu?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl py-4 pl-14 pr-6 text-slate-900 font-semibold transition-all outline-none"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-sm font-bold border border-rose-100 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              {error}
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-5 rounded-3xl font-bold hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 group"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Acessar Plataforma
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-center gap-2 text-sm text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          Sistema Protegido & Criptografado
        </div>

        <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
                admin@network.com.br / admin123
            </p>
        </div>
      </motion.div>
    </div>
  );
}
