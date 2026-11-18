import { projects } from '../data'
import { QueueDemo, TravelDemo, HardwareDemo } from './Demos'

const demos = { queueless: <QueueDemo />, travel: <TravelDemo />, bluetooth: <HardwareDemo /> } as const

export default function Projects() {
  return (
    <section id="projects"><div className="wrap">
      <h2>Projects</h2>
      <p className="lede">Open any project to read the problem, my part in it and the tools involved. Details come from my resume; I've left out anything not yet documented.</p>
      {projects.map((p, k) => (
        <details className="proj" key={p.id} open={k === 0}>
          <summary><span className="cat">{p.cat}</span>
            <span className="sum"><h3>{p.title}</h3><p>{p.summary}</p>{p.status && <span className="status">{p.status}</span>}</span>
            <span className="plus" aria-hidden="true">+</span></summary>
          <div className="case"><span /><dl>
            {p.rows.map(r => (
              <div key={r.label}><dt>{r.label}</dt>
                <dd>{r.text}{r.list && <ul>{r.list.map(x => <li key={x}>{x}</li>)}</ul>}</dd></div>
            ))}
            <div className="tech">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
            {p.github && <div><a className="btn sec" href={p.github} target="_blank" rel="noopener noreferrer">View on GitHub</a></div>}
            {p.id in demos && demos[p.id as keyof typeof demos]}
          </dl></div>
        </details>
      ))}
    </div></section>
  )
}
