'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useRouter } from 'next/navigation'

const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven']

const planningData = [
  { equipe: 'Éq. 1', jours: ['Beaumont', 'Beaumont', 'Leconte', 'Leconte', '–'], couleurs: ['g', 'g', 'b', 'b', ''] },
  { equipe: 'Éq. 2', jours: ['Rénov.', 'Rénov.', 'Rénov.', 'Dupuis', 'Dupuis'], couleurs: ['y', 'y', 'y', 'g', 'g'] },
  { equipe: 'Éq. 3', jours: ['Beaumont', 'Beaumont', 'Beaumont', 'Leclerc', 'Leclerc'], couleurs: ['g', 'g', 'g', 'b', 'b'] },
  { equipe: 'PL', jours: ['Livr. N', '–', 'Livr. S', '–', 'Livr. E'], couleurs: ['y', '', 'y', '', 'y'] },
]

const notes: Record<string, string> = {
  'Éq. 1-0': 'RDV client lundi prochain à 14h',
  'Éq. 3-3': 'Attention accès chantier difficile jeudi',
}

const couleurClass: Record<string, { bg: string; color: string }> = {
  g: { bg: '#e8f5e9', color: '#2D5C2E' },
  y: { bg: '#fff8e1', color: '#B8860B' },
  b: { bg: '#e3f2fd', color: '#1565C0' },
  '': { bg: '#f6faf6', color: '#8aa48a' },
}

export default function Dashboard() {
  const [onglet, setOnglet] = useState('planning')
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/')
      else setUser(data.user)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f0', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto' }}>

      {/* Topbar */}
      <div style={{ background: '#2D5C2E', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 26 26" fill="none"><rect x="4" y="2" width="18" height="22" rx="3" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5"/><rect x="9" y="1" width="8" height="4" rx="2" fill="white"/><rect x="8" y="10" width="3" height="3" rx="1" fill="#F5C518"/><rect x="13" y="11" width="5" height="1.5" rx="1" fill="white" opacity="0.8"/></svg>
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>Kanning</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>Administrateur · Sem. 17</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="white" opacity="0.8"/></svg>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F5C518', position: 'absolute', top: '5px', right: '5px', border: '1.5px solid #2D5C2E' }}></div>
          </div>
          <div onClick={handleLogout} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5C518', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#2D5C2E', cursor: 'pointer' }}>
            {user?.email?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
        </div>
      </div>

      {/* Barre semaine */}
      <div style={{ background: '#fff', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '.5px solid #d4e4d4' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#2D5C2E' }}>Semaine 17 — 14 au 18 Avr</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['‹', '›'].map(c => (
            <div key={c} style={{ width: '26px', height: '26px', borderRadius: '7px', border: '.5px solid #d4e4d4', background: '#f6faf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#6a7a6a', cursor: 'pointer' }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Onglets */}
      <div style={{ display: 'flex', background: '#fff', borderBottom: '.5px solid #d4e4d4', overflowX: 'auto' }}>
        {[
          { id: 'planning', label: 'Planning' },
          { id: 'recap', label: 'Récap' },
          { id: 'presences', label: 'Présences' },
          { id: 'historique', label: 'Historique' },
          { id: 'justif', label: 'Justif.' },
          { id: 'agenda', label: 'Agenda' },
        ].map(o => (
          <div key={o.id} onClick={() => setOnglet(o.id)} style={{ flex: 1, textAlign: 'center', fontSize: '10px', padding: '8px 4px', cursor: 'pointer', whiteSpace: 'nowrap', color: onglet === o.id ? (o.id === 'justif' ? '#B8860B' : '#2D5C2E') : '#8aa48a', borderBottom: onglet === o.id ? `2px solid ${o.id === 'justif' ? '#F5C518' : '#2D5C2E'}` : '2px solid transparent', fontWeight: onglet === o.id ? '600' : '400' }}>
            {o.label}
          </div>
        ))}
      </div>

      {/* Contenu */}
      <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>

        {onglet === 'planning' && (
          <>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: '#fff', borderRadius: '10px', border: '.5px solid #d4e4d4' }}>
              <span style={{ fontSize: '10px', color: editMode ? '#2D5C2E' : '#8aa48a', fontWeight: editMode ? '600' : '400' }}>
                {editMode ? 'Mode édition' : 'Mode lecture seule'}
              </span>
              <div onClick={() => setEditMode(!editMode)} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', padding: '4px 10px', borderRadius: '7px', border: '.5px solid #d4e4d4', background: editMode ? '#2D5C2E' : '#f6faf6', color: editMode ? '#fff' : '#2D5C2E', cursor: 'pointer' }}>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5.5 12.5H3.5V10.5L11.5 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M10 4L12 6" stroke="currentColor" strokeWidth="1.2"/></svg>
                {editMode ? 'Terminer' : 'Modifier'}
              </div>
            </div>

            {/* Tableau planning */}
            <div style={{ background: '#fff', borderRadius: '10px', border: '.5px solid #d4e4d4', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
                <thead>
                  <tr>
                    <th style={{ fontSize: '8px', color: '#8aa48a', fontWeight: '500', textAlign: 'left', padding: '6px 4px 6px 8px', borderBottom: '.5px solid #d4e4d4', background: '#f6faf6' }}>Équipe</th>
                    {JOURS.map(j => <th key={j} style={{ fontSize: '8px', color: '#8aa48a', fontWeight: '500', textAlign: 'center', padding: '6px 2px', borderBottom: '.5px solid #d4e4d4', background: '#f6faf6' }}>{j}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {planningData.map((row, ri) => (
                    <tr key={ri}>
                      <td style={{ fontSize: '9px', fontWeight: '600', color: '#2D5C2E', whiteSpace: 'nowrap', padding: '3px 4px 3px 8px', borderBottom: '.5px solid #f0f4f0' }}>{row.equipe}</td>
                      {row.jours.map((cell, ci) => {
                        const hasNote = notes[`${row.equipe}-${ci}`]
                        const c = couleurClass[row.couleurs[ci]]
                        return (
                          <td key={ci} style={{ padding: '2px', borderBottom: '.5px solid #f0f4f0', verticalAlign: 'top' }}>
                            <div style={{ borderRadius: '5px', padding: '3px 4px', fontSize: '8px', lineHeight: '1.3', background: c.bg, color: c.color, border: editMode ? '1px dashed #6AAF3D' : 'none', cursor: editMode ? 'pointer' : 'default', position: 'relative' }}>
                              {cell}
                              {hasNote && (
                                <span style={{ position: 'absolute', top: '1px', right: '2px', fontSize: '8px' }} title={hasNote}>📝</span>
                              )}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Récap mini */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { title: 'Sous-traitants', items: [{ label: 'Élec Pro', badge: 'Lun–Mer', bg: '#fff8e1', color: '#B8860B' }, { label: 'Plombex', badge: 'Jeu–Ven', bg: '#fff8e1', color: '#B8860B' }] },
                { title: 'Locations', items: [{ label: 'Nacelle', badge: 'Jeu mat.', bg: '#e3f2fd', color: '#1565C0' }, { label: 'Mini-pelle', badge: 'Mer–Jeu', bg: '#e3f2fd', color: '#1565C0' }] },
              ].map((card, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '10px', border: '.5px solid #d4e4d4', padding: '10px' }}>
                  <div style={{ fontSize: '9px', fontWeight: '600', color: '#8aa48a', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '6px' }}>{card.title}</div>
                  {card.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: j < card.items.length - 1 ? '.5px solid #f0f4f0' : 'none', fontSize: '10px', color: '#2D5C2E' }}>
                      <span>{item.label}</span>
                      <span style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '20px', background: item.bg, color: item.color, fontWeight: '500' }}>{item.badge}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        {onglet !== 'planning' && (
          <div style={{ background: '#fff', borderRadius: '10px', border: '.5px solid #d4e4d4', padding: '2rem', textAlign: 'center', color: '#8aa48a', fontSize: '13px' }}>
            Onglet &quot;{onglet}&quot; — à venir 🚧
          </div>
        )}
      </div>

      {/* Navigation bas */}
      <div style={{ background: '#fff', borderTop: '.5px solid #d4e4d4', display: 'flex', padding: '8px 0 4px' }}>
        {[
          { label: 'Planning', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5"/></svg> },
          { label: 'Équipes', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/></svg> },
          { label: 'Notifs', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor"/></svg> },
          { label: 'Profil', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5"/></svg> },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', color: i === 0 ? '#2D5C2E' : '#8aa48a' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: i === 0 ? '#e8f5e9' : 'transparent' }}>
              {item.icon}
            </div>
            <span style={{ fontSize: '9px', fontWeight: i === 0 ? '600' : '400' }}>{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
