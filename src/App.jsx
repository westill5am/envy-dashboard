import React, { useEffect, useState } from 'react'

export default function App() {
  const [live, setLive] = useState([])
  const [top, setTop] = useState([])

  useEffect(() => {
    fetch('/live.json').then(r => r.json()).then(setLive)
    fetch('/topstreamers.json').then(r => r.json()).then(setTop)
  }, [])

  return (
    <main style={{ fontFamily: 'Arial', padding: '2rem', maxWidth: 900, margin: 'auto' }}>
      <h1>🎥 Envy Rust Stream Dashboard</h1>

      <section>
        <h2>🔴 Currently Live</h2>
        {live.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {live.map(s => (
              <iframe
                key={s.name}
                src={`https://player.twitch.tv/?channel=${s.name}&parent=localhost`}
                height="300"
                width="500"
                allowFullScreen
              />
            ))}
          </div>
        ) : <p>No one is live right now.</p>}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>🏆 Top Streamers</h2>
        <ol>
          {top.slice(0, 10).map((s, i) => (
            <li key={s.name}>
              <strong>{i + 1}. {s.name}</strong> — {s.hours.toFixed(2)} hrs
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}