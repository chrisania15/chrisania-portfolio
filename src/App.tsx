import { useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import { About, Experience, Skills, Contact, Footer } from './components/Sections'

export default function App() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const els = document.querySelectorAll('main section:not(#home) h2, .lede, .proj, .tl li, .cell, .list li, .facts div, .about p')
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target) } }), { threshold: 0.12 })
    els.forEach((el, i) => { el.classList.add('rv'); (el as HTMLElement).style.setProperty('--rd', `${(i % 4) * 90}ms`); io.observe(el) })
    const onScroll = () => { const h = document.documentElement; if (bar.current) bar.current.style.width = `${(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100}%` }
    addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', onScroll) }
  }, [])
  return (<>
    <div className="prog" ref={bar} aria-hidden="true" />
    <Header />
    <main><Hero /><About /><Projects /><Experience /><Skills /><Contact /></main>
    <Footer />
  </>)
}
