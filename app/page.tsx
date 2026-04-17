'use client'
import { useState } from 'react'
import { supabase } from './supabase'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email ou mot de passe incorrect')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '2rem',
        width: '100%',
        maxWidth: '360px',
        border: '0.5px solid #e0e0d8'
      }}>
        <div style={{
          background: '#1a1a2e',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '1.5rem'
        }}>
          <div style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>Planning App</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>Gestion d'équipes terrain</div>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '4px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '0.5px solid #ddd',
                fontSize: '13px'
              }}
              placeholder="votre@email.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '4px' }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '0.5px solid #ddd',
                fontSize: '13px'
              }}
              placeholder="••••••••"
            />
          </div>

          {error && <div style={{ color: '#A32D2D', fontSize: '11px', marginBottom: '1rem' }}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              background: '#1a1a2e',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
