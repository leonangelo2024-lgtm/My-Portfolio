import { useState } from 'react'
import { profile, interests, skills, projects, contacts, socials } from './data'
import { MdEmail, MdPhone } from 'react-icons/md'
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const iconMap = {
  email:     MdEmail,
  phone:     MdPhone,
  facebook:  FaFacebook,
  instagram: FaInstagram,
  github:    FaGithub,
  linkedin:  FaLinkedin,
  twitter:   FaTwitter,
  x:         FaXTwitter,
}

function ContactIcon({ name }) {
  const Icon = iconMap[name]
  return Icon ? <Icon aria-hidden="true" /> : null
}

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo" onClick={() => setOpen(false)}>
          {profile.initials}
        </a>

        <div className="nav-right">
          <nav className={open ? 'nav-links open' : 'nav-links'}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)}>
                {s.label}
              </a>
            ))}

            {socials.length > 0 && (
              <div className="nav-mobile-socials">
                <span className="nav-mobile-socials-title">Connect</span>
                <div className="nav-mobile-social-pills">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="nav-mobile-social-pill"
                      onClick={() => setOpen(false)}
                    >
                      <ContactIcon name={s.icon} />
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {socials.length > 0 && (
            <div className="nav-socials" aria-label="Social media links">
              <span className="nav-divider" aria-hidden="true" />
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="nav-social-btn"
                  title={s.label}
                >
                  <ContactIcon name={s.icon} />
                </a>
              ))}
            </div>
          )}

          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="monogram" aria-hidden="true">
        {profile.initials}
      </div>
      <p className="eyebrow">Hello, I'm</p>
      <h1>{profile.name}</h1>
      <p className="tagline">{profile.tagline}</p>
      <div className="hero-actions">
        <a href="#projects" className="btn btn-primary">See my work</a>
        <a href="#contact" className="btn btn-ghost">Get in touch</a>
      </div>
    </section>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function App() {
  const visibleContacts = contacts.filter((c) => c.url)

  return (
    <>
      <Nav />
      <main>
        <Hero />

        <Section id="about" title="About me">
          <div className="about">
            <div>
              {profile.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="card">
              <h3>Things I enjoy</h3>
              <ul className="dot-list">
                {interests.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <ul className="chips">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid">
            {projects.map((p) => (
              <article key={p.name} className="card project">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="link">
                    View project →
                  </a>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="contact card">
            <p>Want to work together or just say hi? I'd love to hear from you.</p>
            {visibleContacts.length > 0 ? (
              <div className="contact-links">
                {visibleContacts.map((c) => (
                  <a key={c.label} href={c.url} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <ContactIcon name={c.icon} />
                    {c.label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="muted">Contact links coming soon.</p>
            )}
          </div>
        </Section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {profile.name}. Built with React.
      </footer>
    </>
  )
}

export default App
