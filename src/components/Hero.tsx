import { useEffect, useState } from 'react'
import { profile, roles } from '../data'

type T = [string, string]
const code: T[][] = [
  [['const ', 'k'], ['chrisania ', 'v'], ['= {', 'p']],
  [['  role', 'n'], [': ', 'p'], ['"Engineering Graduate"', 's'], [',', 'p']],
  [['  studying', 'n'], [': ', 'p'], ['"B.E. Computer Science"', 's'], [',', 'p']],
  [['  college', 'n'], [': ', 'p'], ['"Sathyabama, Chennai"', 's'], [',', 'p']],
  [['  focus', 'n'], [': [', 'p'], ['"UI/UX"', 's'], [', ', 'p'], ['"Data viz"', 's'], [', ', 'p'], ['"Networking"', 's'], ['],', 'p']],
  [['  tools', 'n'], [': [', 'p'], ['"Figma"', 's'], [', ', 'p'], ['"Python"', 's'], [', ', 'p'], ['"MySQL"', 's'], ['],', 'p']],
  [['  building', 'n'], [': ', 'p'], ['"QueueLess"', 's'], [',', 'p']],
  [['};', 'p']],
]
const total = code.reduce((a, l) => a + l.reduce((b, t) => b + t[0].length, 0), 0)

function Editor() {
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(reduce ? total : 0)
  useEffect(() => {
    if (reduce) return
    let t: number
    const start = setTimeout(() => { t = window.setInterval(() => setN(c => { if (c >= total) { clearInterval(t); return c } return c + 1 }), 38) }, 900)
    return () => { clearTimeout(start); clearInterval(t) }
  }, [reduce])
  let left = n
  const lines = code.map(l => l.map(([s, c]) => { const part = s.slice(0, Math.max(0, left)); left -= s.length; return [part, c] as T }))
  const cur = Math.max(0, lines.findIndex(l => l.every(([s], i) => s.length === code[lines.indexOf(l)][i][0].length) === false))
  const row = n >= total ? code.length - 1 : cur
  return (
    <div className="editor in" style={{ '--d': 4 } as React.CSSProperties} role="img" aria-label="Code editor window showing a short summary of Chrisania: UI/UX designer, B.E. Computer Science student at Sathyabama, Chennai, building QueueLess">
      <div className="ed-top"><i /><i /><i /><span className="ed-tab">portfolio.ts</span></div>
      <div className="ed-body" aria-hidden="true">
        <div className="ed-ln">{code.map((_, i) => <div key={i}>{i + 1}</div>)}</div>
        <pre className="ed-code">{lines.map((l, i) => (
          <div key={i}>{l.map(([s, c], j) => s && <span key={j} className={`t-${c}`}>{s}</span>)}{i === row && <span className="cur" />}{!l.some(t => t[0]) && i !== row && ' '}</div>
        ))}</pre>
      </div>
      <div className="ed-status" aria-hidden="true"><span>main</span><span>TypeScript · UTF-8</span></div>
    </div>
  )
}

export default function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI(n => (n + 1) % roles.length), 2600)
    return () => clearInterval(t)
  }, [])
  const d = (n: number) => ({ '--d': n } as React.CSSProperties)
  return (
    <section id="home"><div className="wrap hero">
      <div>
        <p className="role in" style={d(0)}><span>{roles[i]}</span></p>
        <h1 className="in" style={d(1)}>{profile.name}</h1>
        <p className="intro in" style={d(2)}>Engineering graduate in Chennai who designs clear interfaces and builds the data and network systems behind them.</p>
        <div className="btns in" style={d(3)}>
          <a className="btn pri" href={`mailto:${profile.email}`}>Email me</a>
          <a className="btn sec" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn sec" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn sec" href="/Chrisania_Magdalane_Resume.pdf" download>Download resume</a>
          <a className="btn sec" href="#projects">View projects</a>
        </div>
      </div>
      <Editor />
    </div></section>
  )
}
