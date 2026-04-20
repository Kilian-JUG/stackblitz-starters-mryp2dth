'use client'
import { useState } from 'react'
import { supabase } from './supabase'

export default function Home() {
  const [mode, setMode] = useState<'admin' | 'chef'>('admin')
  const [identifiant, setIdentifiant] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const email = mode === 'chef' ? `${identifiant}@kanning.internal` : identifiant
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Identifiant ou mot de passe incorrect')
    } else {
      alert('Connexion réussie ! Bienvenue ' + data.user?.email)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '340px', border: '.5px solid #d4e4d4' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#2D5C2E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="4" y="2" width="18" height="22" rx="3" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3"/><rect x="9" y="1" width="8" height="4" rx="2" fill="white"/><rect x="8" y="10" width="3" height="3" rx="1" fill="#F5C518"/><rect x="13" y="11" width="5" height="1.5" rx="1" fill="white" opacity="0.8"/><rect x="8" y="15" width="3" height="3" rx="1" fill="white" opacity="0.3"/><rect x="13" y="16" width="5" height="1.5" rx="1" fill="white" opacity="0.5"/></svg>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#2D5C2E' }}>Kanning</div>
            <div style={{ fontSize: '10px', color: '#8aa48a', marginTop: '1px' }}>Groupe Loiseleur · Grand Paris Est</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', background: '#f6faf6', borderRadius: '10px', padding: '4px' }}>
          <button onClick={() => { setMode('admin'); setError('') }} style={{ flex: 1, padding: '7px 4px', borderRadius: '7px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', border: 'none', background: mode === 'admin' ? '#2D5C2E' : 'transparent', color: mode === 'admin' ? '#fff' : '#6a7a6a' }}>
            Administrateur
          </button>
          <button onClick={() => { setMode('chef'); setError('') }} style={{ flex: 1, padding: '7px 4px', borderRadius: '7px', fontSize: '11px', fontWeight: '500', cursor: 'pointer', border: 'none', background: mode === 'chef' ? '#2D5C2E' : 'transparent', color: mode === 'chef' ? '#fff' : '#6a7a6a' }}>
            Chef d&apos;équipe
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '11px', color: '#6a7a6a', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              {mode === 'admin' ? 'Email' : 'Identifiant'}
            </label>
            <input
              type={mode === 'admin' ? 'email' : 'text'}
              value={identifiant}
              onChange={e => setIdentifiant(e.target.value)}
              placeholder={mode === 'admin' ? 'votre@groupeloiseleur.com' : 'ex: dupont.eq3'}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #d4e4d4', fontSize: '13px', color: '#2D5C2E', background: '#f6faf6' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '11px', color: '#6a7a6a', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #d4e4d4', fontSize: '13px', color: '#2D5C2E', background: '#f6faf6' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', cursor: 'pointer' }} onClick={() => setRemember(!remember)}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: remember ? '#F5C518' : '#f6faf6', border: remember ? 'none' : '1.5px solid #d4e4d4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {remember && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#2D5C2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span style={{ fontSize: '12px', color: '#6a7a6a' }}>Rester connecté</span>
          </div>

          {error && <div style={{ color: '#A32D2D', fontSize: '11px', marginBottom: '1rem', padding: '8px', background: '#FCEBEB', borderRadius: '8px' }}>{error}</div>}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#2D5C2E', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          {mode === 'chef' && (
            <div style={{ fontSize: '10px', color: '#8aa48a', textAlign: 'center', marginTop: '1rem', padding: '8px', background: '#f6faf6', borderRadius: '8px' }}>
              Identifiant fourni par votre administrateur
            </div>
          )}
          {mode === 'admin' && (
            <div style={{ textAlign: 'center', marginTop: '.75rem', fontSize: '12px', color: '#6AAF3D', cursor: 'pointer' }}>
              Mot de passe oublié ?
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
