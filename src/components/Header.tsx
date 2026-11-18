import { useEffect, useState } from 'react'
import { profile, sections } from '../data'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header><nav aria-label="Main">
      <a className="logo" href="#home">{profile.name}</a>
      <button className="menu" aria-expanded={open} aria-controls="links" onClick={() => setOpen(!open)}>Menu</button>
      <ul id="links" className={open ? 'open' : ''}>
        {sections.map(id => (
          <li key={id}><a href={`#${id}`} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{id[0].toUpperCase() + id.slice(1)}</a></li>
        ))}
      </ul>
    </nav></header>
  )
}
