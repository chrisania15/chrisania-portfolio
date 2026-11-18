import { profile, experience, skills, education, certs } from '../data'

export function About() {
  return (
    <section id="about"><div className="wrap about">
      <div><h2>About</h2>
        <p>I'm a B.E. Computer Science student at Sathyabama Institute of Science and Technology. My interests sit where design meets data: interfaces people can use without instructions, and dashboards that make numbers readable.</p>
        <p>My work so far spans a Bluetooth home automation build, a logistics dashboard in Python and MySQL, Cisco network simulations, and QueueLess, a queue and appointment system I'm developing for educational institutions.</p>
        <p>I'm looking for internships and early roles in UI/UX, product design and data-driven development.</p></div>
      <dl className="facts">
        <div><dt>Studying</dt><dd>B.E. Computer Science and Engineering, 2023 – 2027</dd></div>
        <div><dt>CGPA</dt><dd>7.70</dd></div>
        <div><dt>Based in</dt><dd>Chennai, Tamil Nadu</dd></div>
        <div><dt>Languages</dt><dd>English (fluent), Tamil (native)</dd></div>
        <div><dt>Interests</dt><dd>UI/UX design, data visualization, networking, product thinking, emerging technologies</dd></div>
      </dl>
    </div></section>
  )
}

export function Experience() {
  return (
    <section id="experience"><div className="wrap">
      <h2>Experience</h2><p className="lede">Internships and remote roles, newest first.</p>
      <ol className="tl">{experience.map(e => (
        <li key={e.title}><h3>{e.title}</h3><p className="meta">{e.meta}</p><ul>{e.points.map(p => <li key={p}>{p}</li>)}</ul></li>
      ))}</ol>
    </div></section>
  )
}

const List = ({ items }: { items: string[][] }) => (
  <ul className="list">{items.map(([a, b]) => <li key={a}><b>{a}</b><span>{b}</span></li>)}</ul>
)

export function Skills() {
  return (
    <section id="skills"><div className="wrap">
      <h2>Skills</h2><p className="lede">Listed as they appear on my resume, including where I'm still a beginner.</p>
      <div className="grid">{skills.map(([a, b]) => <div className="cell" key={a}><h3>{a}</h3><p>{b}</p></div>)}</div>
      <div className="cols" style={{ marginTop: 72 }}>
        <div><h2>Education</h2><List items={education} /></div>
        <div><h2>Certifications</h2><List items={certs} /></div>
      </div>
    </div></section>
  )
}

export function Contact() {
  return (
    <section id="contact"><div className="wrap">
      <h2>Have an opportunity or idea? Let's talk.</h2>
      <p className="lede">I reply to email fastest.</p>
      <ul className="cl">
        <li>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
        <li>Phone: <a href={`tel:${profile.phone}`}>{profile.phoneLabel}</a></li>
        <li>GitHub: <a href={profile.github} target="_blank" rel="noopener noreferrer">chrisania15</a></li>
        <li>LinkedIn: <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">chrisania-magdalane-8634582a1</a></li>
      </ul>
      <div className="btns">
        <a className="btn pri" href={`mailto:${profile.email}`}>Email me</a>
        <a className="btn" href={`tel:${profile.phone}`}>Call</a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="btn" href="/Chrisania_Magdalane_Resume.pdf" download>Download resume</a>
      </div>
    </div></section>
  )
}

export function Footer() {
  const toggle = () => {
    const r = document.documentElement
    const cur = r.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    r.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark')
  }
  return (
    <footer>
      <span>© {new Date().getFullYear()} {profile.name}. Thanks for visiting.</span>
      <span><a href="#about">About</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#contact">Contact</a></span>
      <button className="theme" type="button" onClick={toggle}>Switch theme</button>
    </footer>
  )
}
