import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

type Tk = { id: string; svc: string; slot: number }
const SERVICES = ['Bonafide certificate', 'Fee enquiry', 'Library card']
const SLOTS = ['9:00–10:00 AM', '10:00–11:00 AM', '11:00 AM–12:00 PM', '12:00–1:00 PM', '1:00–2:00 PM', '2:00–3:00 PM']
const tid = (n: number) => `A-${String(n).padStart(3, '0')}`

function Qr({ id }: { id: string }) {
  const [src, setSrc] = useState('')
  useEffect(() => { QRCode.toDataURL(`QUEUELESS-DEMO:${id}`, { margin: 1, width: 120, color: { dark: '#1f2a3a', light: '#ffffff' } }).then(setSrc) }, [id])
  return src ? <img className="qr" src={src} width={120} height={120} alt={`QR code for token ${id}`} /> : null
}

export function QueueDemo() {
  const [svc, setSvc] = useState(SERVICES[0])
  const [q, setQ] = useState<Tk[]>([{ id: tid(11), svc: SERVICES[1], slot: 0 }, { id: tid(12), svc: SERVICES[2], slot: 1 }])
  const [n, setN] = useState(12)
  const [slot, setSlot] = useState(0)
  const [mine, setMine] = useState<string | null>(null)
  const [serving, setServing] = useState<Tk | null>(null)
  const [done, setDone] = useState<string[]>([tid(10)])
  const [t0, setT0] = useState(0)
  const [now, setNow] = useState(0)
  const pos = mine ? q.findIndex(t => t.id === mine) : -1
  const state = !mine ? '' : serving?.id === mine ? 'called' : pos >= 0 ? 'waiting' : done.includes(mine) ? 'done' : ''
  const active = state === 'waiting' || state === 'called'
  useEffect(() => {
    if (state !== 'waiting') return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [state])
  const ins = (t: Tk) => [...q, t].sort((a, b) => a.slot - b.slot)
  const book = () => { const id = tid(n + 1); setN(n + 1); setQ(ins({ id, svc, slot })); setMine(id); setT0(Date.now()); setNow(Date.now()) }
  const walkin = () => { setN(n + 1); setQ(ins({ id: tid(n + 1), svc: SERVICES[n % 3], slot: n % 6 })) }
  const next = () => { if (serving || !q.length) return; setServing(q[0]); setQ(q.slice(1)) }
  const complete = () => { if (!serving) return; setDone([...done, serving.id]); setServing(null) }
  const sec = Math.max(0, Math.floor((now - t0) / 1000))
  const label = state === 'waiting' ? 'Waiting' : state === 'called' ? 'Your turn' : 'Completed'
  return (
    <div className="demo"><h4>Try the student booking flow</h4>
      <span className="note">Simulation with sample services and tokens, not the real app. Appointment slots run 9 AM to 3 PM. Wait time assumes 5 minutes per person.</span>
      <div className="qgrid">
        <div className="phone"><div className="bar" /><b>Student</b>
          <p style={{ margin: '8px 0 6px', fontSize: '.9rem' }}>Choose a service</p>
          {SERVICES.map(s => <button key={s} type="button" className="dbtn full" aria-pressed={svc === s} disabled={active} onClick={() => setSvc(s)}>{s}</button>)}
          <p style={{ margin: '8px 0 6px', fontSize: '.9rem' }}>Choose a time slot</p>
          <div className="slots">{SLOTS.map((t, i) => <button key={t} type="button" className="dbtn" aria-pressed={slot === i} disabled={active} onClick={() => setSlot(i)}>{t}</button>)}</div>
          <button type="button" className="dbtn full go" disabled={active} onClick={book}>Get my token</button>
          {mine && <div className="ticket" key={mine}>
            <Qr id={mine} /><strong>{mine}</strong><small className="live">Slot {SLOTS[q.find(t => t.id === mine)?.slot ?? slot]}</small>
            <span className={`badge ${state}`}>{label}</span>
            <span aria-live="polite" className="live">
              {state === 'waiting' && `Position ${pos + 1} · about ${(pos + 1) * 5} min · waiting ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`}
              {state === 'called' && 'Go to the counter and show your QR code.'}
              {state === 'done' && 'Thank you. Book again if needed.'}
            </span></div>}
        </div>
        <div className="staff"><b>Staff dashboard</b>
          <div className="now"><small>Now serving</small><strong key={serving?.id ?? 'none'}>{serving ? serving.id : 'None'}</strong></div>
          <button className="dbtn" type="button" disabled={!!serving || !q.length} onClick={next}>Call next</button>
          <button className="dbtn" type="button" disabled={!serving} onClick={complete}>Complete</button>
          <button className="dbtn" type="button" onClick={walkin}>Add another student</button>
          <p className="note" style={{ margin: '4px 0' }}>Waiting: {q.length} · Completed: {done.length}</p>
          <ul className="ql">{q.length ? q.map(t => <li key={t.id}>{t.id} · {t.svc} · {SLOTS[t.slot].split('–')[0].replace(' ', '')}</li>) : <li>Queue is empty</li>}</ul>
        </div>
      </div>
    </div>
  )
}

const data: Record<string, [string, number][]> = {
  'Deliveries': [['Driver A', 42], ['Driver B', 35], ['Driver C', 51], ['Driver D', 28]],
  'Fuel (L)': [['Driver A', 120], ['Driver B', 96], ['Driver C', 140], ['Driver D', 75]],
}
const STATUS: [string, number, string][] = [['Delivered', 68, '#3e5f8f'], ['In transit', 22, '#8fb0e0'], ['Delayed', 10, '#c0604a']]

function Pie() {
  let a = -Math.PI / 2
  const cx = 70, cy = 70, r = 62
  const paths = STATUS.map(([name, v, c]) => {
    const a1 = a + (v / 100) * 2 * Math.PI
    const d = `M${cx} ${cy}L${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}A${r} ${r} 0 ${v > 50 ? 1 : 0} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}Z`
    a = a1
    return <path key={name} d={d} fill={c} stroke="var(--panel)" strokeWidth="2" className="slice" />
  })
  return (
    <div className="pie">
      <svg viewBox="0 0 140 140" width="150" role="img" aria-label="Pie chart of sample delivery status: 68% delivered, 22% in transit, 10% delayed">{paths}</svg>
      <ul>{STATUS.map(([name, v, c]) => <li key={name}><i style={{ background: c }} />{name}: {v}%</li>)}</ul>
    </div>
  )
}

export function TravelDemo() {
  const [m, setM] = useState('Deliveries')
  const rows = data[m]
  const mx = rows ? Math.max(...rows.map(r => r[1])) : 1
  return (
    <div className="demo"><h4>Explore the dashboard idea</h4>
      <span className="note">Illustration with made-up sample numbers, not data from the real project.</span>
      {[...Object.keys(data), 'Status'].map(k => <button key={k} type="button" className="dbtn" aria-pressed={m === k} onClick={() => setM(k)}>{k}</button>)}
      {m === 'Status' ? <Pie /> : (
        <svg className="chart" viewBox="0 0 360 150" role="img" aria-label="Bar chart of sample values by driver" width="100%">
          {rows.map(([name, v], i) => {
            const h = (v / mx) * 100, x = 20 + i * 85
            return <g key={name}><rect x={x} y={115 - h} width={55} height={h} rx={2} />
              <text x={x + 27} y={108 - h} textAnchor="middle">{v}</text>
              <text x={x + 27} y={137} textAnchor="middle">{name}</text></g>
          })}
        </svg>)}
    </div>
  )
}

export function HardwareDemo() {
  const [conn, setConn] = useState(false)
  const [on, setOn] = useState([false, false])
  const flip = (i: number) => setOn(on.map((v, j) => (j === i ? !v : v)))
  const msg = !conn ? 'Phone is not connected.' : `Connected. Lamp ${on[0] ? 'on' : 'off'}, fan ${on[1] ? 'on' : 'off'}.`
  const row = (i: number, label: string) => (
    <button type="button" role="switch" aria-checked={on[i]} disabled={!conn} className="sw" onClick={() => flip(i)}>{label}<i /></button>
  )
  return (
    <div className="demo"><h4>Bluetooth control demo</h4>
      <span className="note">Simulation of the idea: a phone switching a lamp and a fan over Bluetooth. Not the real app.</span>
      <div className="pgrid">
        <div className="phone"><div className="bar" /><b>Home control</b>
          <p className="bt"><span className={conn ? 'pd live' : 'pd'} />{conn ? 'Bluetooth connected' : 'Bluetooth off'}</p>
          <button type="button" className="dbtn full go" onClick={() => { setConn(!conn); if (conn) setOn([false, false]) }}>{conn ? 'Disconnect' : 'Connect'}</button>
          {row(0, 'Lamp')}{row(1, 'Fan')}
        </div>
        <div className={conn ? 'beam live' : 'beam'} aria-hidden="true" />
        <div className="appl">
          <figure className={`lamp${on[0] ? ' on' : ''}`}>
            <svg viewBox="0 0 80 100" width="110" role="img" aria-label={`Lamp ${on[0] ? 'on' : 'off'}`}>
              <circle className="halo" cx="40" cy="38" r="36" /><circle className="bulb" cx="40" cy="38" r="16" />
              <rect x="33" y="52" width="14" height="8" fill="#56667e" /><rect x="38" y="60" width="4" height="26" fill="#56667e" /><rect x="24" y="86" width="32" height="6" rx="3" fill="#56667e" />
            </svg><figcaption>Lamp</figcaption></figure>
          <figure className={`fan${on[1] ? ' on' : ''}`}>
            <svg viewBox="0 0 100 100" width="110" role="img" aria-label={`Fan ${on[1] ? 'on' : 'off'}`}>
              <g className="blades">{[0, 90, 180, 270].map(r => <ellipse key={r} cx="50" cy="20" rx="9" ry="19" fill="#5d8bbd" transform={`rotate(${r} 50 40)`} />)}<circle cx="50" cy="40" r="7" fill="#26364d" /></g>
              <rect x="47" y="60" width="6" height="26" fill="#56667e" /><rect x="30" y="86" width="40" height="6" rx="3" fill="#56667e" />
            </svg><figcaption>Fan</figcaption></figure>
        </div>
      </div>
      <p aria-live="polite" style={{ margin: '12px 0 0', color: 'var(--mute)' }}>{msg}</p>
    </div>
  )
}
