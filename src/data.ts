export const profile = {
  name: 'Chrisania Magdalane',
  email: 'chrisaniamagdalane@gmail.com',
  phone: '+918903659418',
  phoneLabel: '+91 89036 59418',
  linkedin: 'https://linkedin.com/in/chrisania-magdalane-8634582a1',
  github: 'https://github.com/chrisania15',
}
export const roles = ['UI/UX Designer', 'Product Designer', 'Data Visualization', 'Engineering Graduate']
export const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact']

export type Row = { label: string; text?: string; list?: string[] }
export type Project = { id: 'queueless' | 'travel' | 'bluetooth' | 'cisco' | 'design'; cat: string; title: string; summary: string; status?: string; rows: Row[]; tech: string[]; github?: string; image?: { src: string; alt: string; caption: string; w: number; h: number } }
export const projects: Project[] = [
  { id: 'queueless', cat: 'Full-stack web app', title: 'QueueLess', summary: 'Smart queue and appointment management for educational institutions.', status: 'In development',
    rows: [
      { label: 'Problem', text: 'Students and staff at institutions lose time to unmanaged queues and unclear appointment slots.' },
      { label: 'Solution', text: 'A system where students book appointments and track queue status, and staff manage services.' },
      { label: 'My contribution', list: ['Designing student and staff workflows for booking, queue tracking and service management.', 'Building backend APIs and database structures for bookings and service requests.'] },
      { label: 'Current progress', text: 'Core features are under development and testing. No live demo yet.' }],
    tech: ['React', 'Node.js', 'Express.js', 'MySQL'] },
  { id: 'travel', cat: 'Data analytics', title: 'Travel & Logistics Dashboard', summary: 'An interactive dashboard connecting a MySQL database to live charts.',
    rows: [
      { label: 'What it does', text: 'Visualizes deliveries, routes, drivers and fuel usage so patterns in logistics data are easy to spot.' },
      { label: 'Data', text: 'Synthetic logistics data generated with Faker and stored in a relational database.' },
      { label: 'My contribution', list: ['Developed the interactive dashboard in Python.', 'Integrated the MySQL database with the frontend visualizations.'] }],
    tech: ['Python', 'Dash', 'Plotly', 'Flask', 'Pandas', 'MySQL'], github: 'https://github.com/chrisania15/Tranpsort-and-logistics-dashboard' },
  { id: 'bluetooth', cat: 'Embedded systems / IoT', title: 'Bluetooth Home Automation', summary: 'Control household appliances from an Android app over Bluetooth.',
    rows: [
      { label: 'What it does', text: 'Switches electrical appliances remotely in real time using a microcontroller, relay modules and a Bluetooth module.' },
      { label: 'My contribution', list: ['Designed and developed the hardware setup and Android application.', 'Applied embedded systems, IoT fundamentals and mobile-to-hardware communication.'] }],
    tech: ['Microcontroller', 'Relay modules', 'Bluetooth module', 'Android'] },
  { id: 'cisco', cat: 'Networking', title: 'Cisco Networking Stream Project', summary: 'Network architectures designed and simulated in Packet Tracer.',
    rows: [{ label: 'My contribution', list: ['Designed and simulated network architectures.', 'Implemented routing, switching and IP addressing.'] }],
    tech: ['Cisco Packet Tracer'], github: 'https://github.com/chrisania15/cisco-networking-project',
    image: { src: '/cisco-topology.png', w: 1200, h: 429, alt: 'Cisco Packet Tracer topology: three 2811 routers connected to each other, with Router0 serving a switch, a PC and a laptop, and Router1 serving a switch, a PC and a server.', caption: 'Topology from my Packet Tracer project: three routers linked together, with a PC and laptop on one side and a PC and server on the other.' } },
  { id: 'design', cat: 'Visual design', title: 'Identity & Print Design', summary: 'Visiting cards and identity cards.',
    rows: [{ label: 'My contribution', text: 'Applied typography, color theory and layout principles to cards that need to be read quickly.' }],
    tech: ['Figma', 'Canva', 'Adobe Photoshop'] },
]
export const experience = [
  { title: 'UI/UX Intern', meta: 'Navricon, Sathyabama Institute of Science and Technology · Feb 2026 – present', points: ['Designed an identity card tag with better usability and visual clarity.', 'Applied UI/UX principles to improve layout and user experience.'] },
  { title: 'Product Designer', meta: 'NxtHive (remote) · Jun 2026 – Aug 2026', points: ['Created UI designs for applications and scheduling.', 'Designed client and interviewer access pages.'] },
  { title: 'Networking Intern / Student', meta: 'Cisco Networking Academy (online) · Jun 2026 – Jul 2026', points: ['Studied IP addressing, routing and protocols.', 'Built and simulated network topologies in Packet Tracer.'] },
  { title: 'Remote Assistant', meta: 'Skyward Products (remote) · Nov 2025 – Mar 2026', points: ['Generated PDF reports from YouTube data.', 'Managed and structured digital content.'] },
]
export const skills = [
  ['Design and UI/UX', 'Figma, Canva, Adobe Photoshop, wireframing, prototyping'],
  ['Programming', 'Python, Java, HTML/CSS (basic), Flutter (beginner)'],
  ['Data and databases', 'MySQL, SQL, Power BI (beginner), Tableau (beginner), Google Looker Studio'],
  ['Tools', 'Firebase, GitHub, Microsoft Excel, Cisco Packet Tracer'],
  ['Other', 'User research, data visualization, problem-solving'],
]
export const education = [
  ['B.E. Computer Science and Engineering', 'Sathyabama Institute of Science and Technology, Chennai · 2023 – 2027 · CGPA 7.70'],
  ['Higher Secondary (Class XII)', 'Holy Cross Anglo Indian Higher Secondary School, Thoothukudi · 73%'],
  ['Secondary School (Class X)', 'Holy Cross Anglo Indian Higher Secondary School, Thoothukudi'],
]
export const certs = [
  ['Programming in Java', 'NPTEL · 2024'], ['Relational Database Systems', 'NPTEL · 2025'],
  ['CCNA: Introduction to Networks', 'Cisco'], ['Network Technician Career Path', 'Cisco'], ['Getting Started with Packet Tracer', 'Cisco'],
]
