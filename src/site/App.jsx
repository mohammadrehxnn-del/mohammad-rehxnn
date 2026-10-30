
import React, { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Check, Code2,
  Command, Film, Layers3, Menu, Plus, Send, ShieldCheck, Sparkles, X,
  LockKeyhole, LogOut, Trash2, Pencil, Upload, ExternalLink, Mail,
  Instagram, Globe, MoveUpRight
} from 'lucide-react';
import './style.css';

const t1 = { url: '/reel-thumb-1.png' };
const t2 = { url: '/reel-thumb-2.png' };
const t3 = { url: '/reel-thumb-3.png' };

import { SplineScene } from './components/ui/splite.jsx';
import { Spotlight } from './components/ui/spotlight.jsx';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const reels = [
  {
    title: 'Abu Zaman',
    thumb: t1.url,
    url: 'https://www.instagram.com/reel/De60UFyPHN6/',
    website: '',
    category: 'VIDEO EDITING',
    label: 'VISUAL STORYTELLING'
  },
  {
    title: 'Xpart Photography',
    thumb: t2.url,
    url: 'https://www.instagram.com/reel/De9-gSbIIVX/',
    website: 'https://xpart-photography.lovable.app',
    category: 'VIDEO EDITING',
    label: 'BRAND FILM'
  },
  {
    title: 'Honey Photography',
    thumb: t3.url,
    url: 'https://www.instagram.com/reel/De9YC4HIfGp/',
    website: 'https://honey-studio-portfolio.netlify.app/',
    category: 'BEHIND THE SCENES',
    label: 'BEHIND THE SCENES'
  }
];

const initialProjects = [
  {
    id: 'local-1',
    title: 'Portfolio Experience',
    category: 'WEB DEVELOPMENT',
    description: 'A polished portfolio concept focused on visual storytelling, clear hierarchy and immersive presentation.',
    link: '',
    cover: '',
    local: true
  },
  {
    id: 'local-2',
    title: 'Studio Website',
    category: 'WEB DEVELOPMENT',
    description: 'A creative studio website built to present a brand and its work with a distinctive digital identity.',
    link: '',
    cover: '',
    local: true
  },
  {
    id: 'local-3',
    title: 'Creative Studio Portfolio',
    category: 'WEB DEVELOPMENT',
    description: 'A portfolio and studio website concept developed with an AI-assisted workflow.',
    link: '',
    cover: '',
    local: true
  }
];

const name = 'Mᴏʜᴀᴍᴍᴀᴅ RᴇʜXɴɴ';

function GlassButton({
  children,
  href,
  onClick,
  icon: Icon = ArrowRight,
  type = 'button',
  className = ''
}) {
  const inner = (
    <>
      {children}
      <span className="button-icon"><Icon size={17} /></span>
    </>
  );

  return href
    ? <a className={`glass-button ${className}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{inner}</a>
    : <button type={type} className={`glass-button ${className}`} onClick={onClick}>{inner}</button>;
}

function IconButton({ children, ...props }) {
  return <button className="icon-glass" {...props}>{children}</button>;
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="#home" className="brand-mark" aria-label="Mohammad Rehxnn home">
        <span className="brand-word">MOHAMMAD REHXNN<span>®</span></span>
      </a>

      <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
        {[
          ['About', '#about'],
          ['Expertise', '#expertise'],
          ['Selected work', '#work'],
          ['Contact', '#contact']
        ].map(([l, h]) => (
          <a key={l} href={h} onClick={() => setOpen(false)}>{l}</a>
        ))}
      </nav>

      <a href="#contact" className="header-cta">
        LET'S TALK <ArrowUpRight size={14} />
      </a>

      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grain" />

      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" />
          INDEPENDENT CREATIVE DEVELOPER
          <span className="eyebrow-line" />
        </div>

        <h1><span>Mohammad</span><span>Rehxnn</span></h1>

        <div className="hero-role">
          FRONTEND DEVELOPER <span>×</span> DIGITAL CREATIVE
        </div>

        <p className="hero-description">
          I build cinematic websites and thoughtful digital experiences.
          <br />
          I combine design, AI tools, and visual storytelling to turn ideas into work that stands out.
        </p>

        <div className="hero-actions">
          <GlassButton href="#work">Explore my work</GlassButton>
          <a className="round-spark" href="#expertise" aria-label="Explore skills">
            <Sparkles size={19} />
          </a>
        </div>

        <div className="hero-footnote">
          <span>BASED IN INDIA</span>
          <span>AVAILABLE FOR SELECT PROJECTS <span className="availability-dot" /></span>
        </div>
      </div>

      <div className="robot-wrap spline-hero">
        <div className="robot-halo" />
        <Spotlight className="hero-spotlight" size={260} />
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="robot-spline-canvas"
        />
        <div className="robot-label">
          <span>FIG. 001</span>
          <span>INTERACTIVE 3D EXPERIENCE</span>
        </div>
      </div>

      <div className="hero-index">01 <span>/</span> 05</div>
      <div className="hero-bottom-rule" />

      <a className="scroll-cue" href="#about">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDownRight size={15} />
      </a>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-label="Creative disciplines">
      <div className="marquee-track">
        {Array.from({ length: 2 }, (_, i) => (
          <div className="marquee-group" key={i}>
            {[
              'DIGITAL EXPERIENCES',
              'WEB DEVELOPMENT',
              'VISUAL STORYTELLING',
              'AI CREATIVITY',
              'DESIGN WITH INTENT'
            ].map(t => (
              <span key={t}>{t}<Asterisk size={15} /></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-kicker">
        <span>01 / ABOUT</span>
        <span>THE PERSON BEHIND THE PIXELS</span>
      </div>

      <div className="about-grid">
        <h2>Different skills.<br /><em>One creative mind.</em></h2>

        <div className="about-copy">
          <p className="large-copy">
            I'm Mohammad Rehan, professionally known as <strong>Mohammad Rehxnn</strong> — a creative developer and digital designer drawn to the intersection of technology, design, and storytelling.
          </p>

          <p>
            With 2 years of video-editing experience and 1 year in web development and graphic design, I turn ideas into engaging digital experiences. I've developed and sold three portfolio and studio websites, using AI-assisted tools to support my creative workflow.
          </p>

          <p>
            I believe every project is a chance to experiment, learn something new, and make something more meaningful.
          </p>

          <a className="text-link" href="#contact">
            A little more about working together <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="stats-row">
        <div><strong>02<span>+</span></strong><span>YEARS · VIDEO EDITING</span></div>
        <div><strong>01<span>+</span></strong><span>YEAR · WEB & GRAPHIC DESIGN</span></div>
        <div><strong>03</strong><span>WEBSITES DEVELOPED & SOLD</span></div>
        <div><strong>∞</strong><span>IDEAS TO EXPLORE</span></div>
      </div>
    </section>
  );
}

const services = [
  {
    n: '01',
    icon: Code2,
    title: 'Web Development',
    desc: 'Responsive portfolio, studio, and business websites with clean structure, polished interactions, and performance in mind.',
    tags: ['Frontend development', 'Responsive design', 'SEO basics']
  },
  {
    n: '02',
    icon: Layers3,
    title: 'UI/UX & Visual Design',
    desc: 'User-focused layouts, visual hierarchy, and consistent digital design systems for modern brands.',
    tags: ['UI/UX design', 'Graphic design', 'Brand visuals']
  },
  {
    n: '03',
    icon: Film,
    title: 'Video Editing & Cinematic Storytelling',
    desc: 'Purposeful pacing, sound-led edits, cinematic visuals, and story-driven short-form content.',
    tags: ['Video editing', 'Cinematic edits', 'Reels']
  },
  {
    n: '04',
    icon: Sparkles,
    title: 'Creative Content & AI Workflows',
    desc: 'Thumbnails, content writing, social-first creative assets, and practical AI-assisted production.',
    tags: ['Thumbnail design', 'Content writing', 'AI-assisted creative']
  }
];

function Expertise() {
  return (
    <section className="section expertise-section" id="expertise">
      <div className="section-kicker">
        <span>02 / EXPERTISE</span>
        <span>WHAT I BRING TO THE TABLE</span>
      </div>

      <div className="section-heading-row">
        <h2>Crafted with <em>purpose.</em></h2>
        <p>Creative thinking meets practical execution.<br />Always learning. Always refining.</p>
      </div>

      <div className="service-list service-grid">
        {services.map(s => (
          <article className="service-row liquid-card" key={s.n}>
            <div className="service-num">{s.n}</div>
            <div className="service-icon"><s.icon size={22} strokeWidth={1.4} /></div>
            <div className="service-main">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="tag-row">
                {s.tags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
            <ArrowUpRight className="service-arrow" size={22} />
          </article>
        ))}
      </div>

      <div className="tool-strip">
        <span>TOOLS I EXPLORE</span>
        <div>
          {['CHATGPT', 'CLAUDE', 'HIGGSFIELD', 'LOVABLE', 'CANVA', 'PHOTOSHOP'].map(t => <b key={t}>{t}</b>)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <a
        className="project-visual"
        href={project.link || '#contact'}
        target={project.link ? '_blank' : undefined}
        rel="noreferrer"
      >
        <div className={`project-art art-${index % 3}`}>
          {(project.cover || project.cover_url) ? (
            <img
              className="project-cover-image"
              src={project.cover || project.cover_url}
              alt={project.title + ' project cover'}
              loading="lazy"
              decoding="async"
            />
          ) : null}

          <span className="art-index">0{index + 1}</span>

          <div className="art-window">
            <div className="window-top">
              <i /><i /><i />
              <span>{project.category || 'CREATIVE PROJECT'}</span>
            </div>
            <div className="window-content">
              <span className="window-label">DIGITAL / EXPERIENCE</span>
              <div className="window-big">
                {index === 0 ? 'PORTFOLIO' : index === 1 ? 'STUDIO' : 'CREATIVE'}
                <br />
                <em>{index === 0 ? 'DESIGN' : index === 1 ? 'SYSTEM' : 'DIRECTION'}</em>
              </div>
              <div className="window-line" />
              <div className="window-shape" />
            </div>
          </div>
        </div>

        <span className="project-open"><ArrowUpRight size={19} /></span>
      </a>

      <div className="project-meta">
        <div>
          <span className="project-category">{project.category || 'WEB DEVELOPMENT'}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <span className="project-count">0{index + 1}</span>
      </div>
    </article>
  );
}

function ReelCard({ reel, index }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <article className={`reel-card reel-card-${index + 1}`}>
      <button
        className={`reel-cover reel-${index + 1}`}
        onClick={() => setShowOptions(v => !v)}
        aria-expanded={showOptions}
        aria-label={`Open options for ${reel.title}`}
      >
        {reel.thumb && (
          <img
            className="reel-thumb"
            src={reel.thumb}
            alt={reel.title + ' reel thumbnail'}
            loading="lazy"
          />
        )}

        <span className="reel-type">{reel.category}</span>

        <div className="reel-cover-art" style={reel.thumb ? { display: 'none' } : undefined}>
          <span className="reel-art-index">0{index + 1}</span>
          <strong>{reel.label}</strong>
          <span className="reel-art-line" />
        </div>

        <span className="reel-number">REEL / 0{index + 1}</span>
      </button>

      <div className="reel-info">
        <div>
          <h3>{reel.title}</h3>
          <p>Edited by Mohammad Rehxnn</p>
        </div>
        <button
          className="reel-options-toggle"
          onClick={() => setShowOptions(v => !v)}
          aria-label="Show reel options"
        >
          <ArrowUpRight size={17} />
        </button>
      </div>

      {showOptions && (
        <div className="reel-options" role="group" aria-label="Reel links">
          <a href={reel.url} target="_blank" rel="noreferrer">
            <Instagram size={15} /> Open Reel <ArrowUpRight size={14} />
          </a>

          {reel.website ? (
            <a href={reel.website} target="_blank" rel="noreferrer">
              <Globe size={15} /> Open Website <ArrowUpRight size={14} />
            </a>
          ) : (
            <a aria-disabled="true" style={{ opacity: 0.45, pointerEvents: 'none' }}>
              <Globe size={15} /> Website coming soon
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function Work({ projects }) {
  const [tab, setTab] = useState('WEBSITES');

  return (
    <section className="section work-section" id="work">
      <div className="section-kicker">
        <span>03 / SELECTED WORK</span>
        <span>MADE WITH INTENTION</span>
      </div>

      <div className="section-heading-row">
        <h2>A few things<br /><em>I've brought to life.</em></h2>

        <div className="work-intro">
          <p>A selection of digital projects and visual stories. More work can be added as the portfolio grows.</p>

          <div className="work-tabs">
            <button className={tab === 'WEBSITES' ? 'active' : ''} onClick={() => setTab('WEBSITES')}>
              WEBSITES <span>03</span>
            </button>
            <button className={tab === 'VIDEO' ? 'active' : ''} onClick={() => setTab('VIDEO')}>
              VIDEO EDITS <span>03</span>
            </button>
          </div>
        </div>
      </div>

      {tab === 'WEBSITES' ? (
        <div className="reels-grid">
          {reels.map((r, i) => <ReelCard reel={r} index={i} key={'w' + r.url} />)}
        </div>
      ) : (
        <div className="reels-grid">
          {reels.map((r, i) => <ReelCard reel={r} index={i} key={r.url} />)}
        </div>
      )}

      <p className="project-note">
        <span className="availability-dot" />
        {tab === 'WEBSITES'
          ? 'Tap a reel to choose Open Website or Open Reel.'
          : 'Tap a reel to choose Open Website or Open Reel.'}
      </p>
    </section>
  );
}

function CreativeBrand() {
  return (
    <section className="creative-brand">
      <div className="brand-glow" />

      <div className="section-kicker">
        <span>04 / CREATIVE NOVARY</span>
        <span>MY CREATIVE SPACE</span>
      </div>

      <div className="creative-brand-content">
        <a
          className="novals-symbol"
          href="https://www.instagram.com/creative_novary/"
          target="_blank"
          rel="noreferrer"
          aria-label="Creative Novary Instagram logo"
        >
          <img src="/creative-novary-logo.webp" alt="Creative Novary logo" />
        </a>

        <div>
          <span className="eyebrow-text">A BRAND IN THE MAKING</span>
          <h2>Creative<br /><em>Novary.</em></h2>
          <p>
            A growing creative space exploring digital design, visual content, AI-powered ideas, and new ways to make the internet feel more human.
          </p>
          <a
            className="text-link"
            href="https://www.instagram.com/creative_novary/"
            target="_blank"
            rel="noreferrer"
          >
            Explore on Instagram <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="brand-bottom">
        <span>CREATIVITY IN CONSTANT MOTION</span>
        <span>DESIGN / STORY / TECHNOLOGY</span>
      </div>
    </section>
  );
}

/* NEW SECTION: MOHAMMAD REHXNN PERSONAL PROFILE */
function PersonalProfile() {
  return (
    <section className="personal-profile">
      <style>{`
        .personal-profile {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 110px 8%;
          background:
            radial-gradient(ellipse at 78% 50%, rgba(255,255,255,.055), transparent 42%),
            #08090d;
          border-top: 1px solid rgba(255,255,255,.07);
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .personal-profile::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          right: 5%;
          top: 10%;
          border-radius: 50%;
          background: rgba(255,255,255,.04);
          filter: blur(100px);
          z-index: -1;
          pointer-events: none;
        }

        .personal-profile .section-kicker {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: rgba(255,255,255,.48);
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
          margin-bottom: 65px;
        }

        .personal-profile-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 80px;
        }

        .personal-profile-image-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 430px;
        }

        .personal-profile-image-wrap::before {
          content: "";
          position: absolute;
          width: 320px;
          height: 320px;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 50%;
          box-shadow: 0 0 90px rgba(255,255,255,.06);
          animation: profileOrbit 12s linear infinite;
        }

        .personal-profile-image {
          position: relative;
          z-index: 1;
          width: min(100%, 390px);
          max-height: 490px;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 20px 55px rgba(0,0,0,.55));
          animation: profileFloat 5s ease-in-out infinite;
          transition: filter .4s ease, transform .4s ease;
        }

        .personal-profile-image:hover {
          filter: drop-shadow(0 20px 65px rgba(255,255,255,.16));
          transform: scale(1.025);
        }

        .personal-profile-copy {
          max-width: 540px;
        }

        .personal-profile-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #858585;
          font-size: 11px;
          letter-spacing: .18em;
          margin-bottom: 22px;
        }

        .personal-profile-label::before {
          content: "";
          width: 24px;
          height: 1px;
          background: #858585;
        }

        .personal-profile-copy h2 {
          margin: 0 0 18px;
          color: #fff;
          font-size: clamp(42px, 6vw, 76px);
          line-height: .98;
          letter-spacing: -.055em;
        }

        .personal-profile-copy h2 em {
          color: #9bb7ff;
          font-style: normal;
        }

        .personal-profile-role {
          color: rgba(255,255,255,.75);
          font-size: 13px;
          letter-spacing: .12em;
          margin-bottom: 25px;
        }

        .personal-profile-copy p {
          color: rgba(255,255,255,.58);
          font-size: 15px;
          line-height: 1.9;
          max-width: 470px;
          margin-bottom: 30px;
        }

        .personal-profile-social {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 40px;
          color: #fff;
          text-decoration: none;
          font-size: 12px;
          letter-spacing: .08em;
          transition: .3s ease;
        }

        .personal-profile-social:hover {
          border-color: #9bb7ff;
          background: rgba(255,255,255,.06);
          transform: translateY(-3px);
        }

        @keyframes profileFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-13px); }
        }

        @keyframes profileOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 760px) {
          .personal-profile {
            padding: 75px 7%;
          }

          .personal-profile .section-kicker {
            margin-bottom: 35px;
            font-size: 8px;
          }

          .personal-profile-inner {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .personal-profile-image-wrap {
            min-height: 330px;
            order: 1;
          }

          .personal-profile-image-wrap::before {
            width: 260px;
            height: 260px;
          }

          .personal-profile-image {
            width: min(100%, 310px);
            max-height: 370px;
          }

          .personal-profile-copy {
            order: 2;
            text-align: center;
            margin: 0 auto;
          }

          .personal-profile-copy p {
            margin-left: auto;
            margin-right: auto;
          }

          .personal-profile-label {
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .personal-profile-image,
          .personal-profile-image-wrap::before {
            animation: none;
          }
        }
      `}</style>

      <div className="section-kicker">
        <span>05 / THE PERSON</span>
        <span>BEHIND THE CREATIVE WORK</span>
      </div>

      <div className="personal-profile-inner">
        <div className="personal-profile-image-wrap">
          <img
            className="personal-profile-image"
            src="/images/mohammad-rehxnn.png"
            alt="Mohammad Rehxnn"
            loading="lazy"
          />
        </div>

        <div className="personal-profile-copy">
          <span className="personal-profile-label">THE CREATOR</span>

          <h2>Mohammad<br /><em>Rehxnn.</em></h2>

          <div className="personal-profile-role">
            VIDEO EDITOR &amp; VISUAL STORYTELLER
          </div>

          <p>
            Behind every creative idea is a person who loves turning imagination
            into reality. I'm Mohammad Rehxnn — passionate about cinematic
            visuals, video editing, digital design, and creative storytelling.
          </p>

          <a
            className="personal-profile-social"
            href="https://www.instagram.com/mohammad_rehxnn/"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={17} />
            FOLLOW MY JOURNEY
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');

    if (supabase) {
      const { error } = await supabase.from('inquiries').insert([
        { name: form.name, email: form.email, message: form.message }
      ]);

      if (error) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } else {
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
      window.location.href = `mailto:mohammadrehxnn@gmail.com?subject=${subject}&body=${body}`;
      setStatus('email');
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="section-kicker">
        <span>06 / LET'S CONNECT</span>
        <span>GOOD THINGS START WITH A CONVERSATION</span>
      </div>

      <div className="contact-grid">
        <div>
          <span className="eyebrow-text">HAVE A PROJECT IN MIND?</span>
          <h2>Let's make<br />something <em>matter.</em></h2>
          <p>Have an idea, a project, or just want to connect? Send a note. Let's see what we can create together.</p>

          <a className="contact-email" href="mailto:mohammadrehxnn@gmail.com">
            mohammadrehxnn@gmail.com <ArrowUpRight size={17} />
          </a>

          <div className="social-links">
            <a href="https://wa.me/qr/FF4YEOU33K2UB1" target="_blank" rel="noreferrer">
              WHATSAPP <ArrowUpRight size={14} />
            </a>
            <a href="https://www.instagram.com/creative_novary/" target="_blank" rel="noreferrer">
              INSTAGRAM <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <label>
            Your name
            <input
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
            />
          </label>

          <label>
            Email address
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Tell me a little about it
            <textarea
              required
              rows="4"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Your idea, project, or question..."
            />
          </label>

          <button className="glass-button submit-button" type="submit" disabled={status === 'sending'}>
            {status === 'sending'
              ? 'Sending...'
              : status === 'success'
                ? 'Message sent'
                : status === 'email'
                  ? 'Email draft opened'
                  : 'Send inquiry'}
            <span className="button-icon">
              {status === 'success' ? <Check size={17} /> : <Send size={16} />}
            </span>
          </button>

          {status === 'error' && (
            <p className="form-status error">Could not submit. Please email me directly.</p>
          )}

          {status === 'success' && (
            <p className="form-status">Thanks — your message has been received.</p>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a href="#home" className="footer-name">{name}</a>
      <span>DESIGNED WITH INTENTION · BUILT TO EVOLVE</span>
      <a href="#home" className="back-top">BACK TO TOP ↑</a>
      <small>
        © {new Date().getFullYear()} MOHAMMAD REHXNN. ALL RIGHTS RESERVED. ·
        <a href="/privacy"> PRIVACY POLICY</a>
      </small>
    </footer>
  );
}

function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: 'WEB DEVELOPMENT',
    description: '',
    link: '',
    cover: ''
  });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

 useEffect(() => {
  let active = true;

  async function resetAdminSession() {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signOut({
      scope: 'local'
    });

    if (!active) return;

    setSession(null);
    setLoading(false);

    if (error) {
      setMessage('Session reset failed. Please refresh and try again.');
    }
  }

  resetAdminSession();

  return () => {
    active = false;
  };
}, []);

  useEffect(() => {
    if (session) loadProjects();
  }, [session]);

  async function loadProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setProjects(data || []);
    else setMessage(error.message);
  }

  async function login(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const { error } = await supabase.auth.signInWithPassword({
      email: fd.get('email'),
      password: fd.get('password')
    });

    setMessage(error ? error.message : '');
  }

  async function saveProject(e) {
    e.preventDefault();

    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      link: form.link || null,
      cover_url: form.cover || null
    };

    let result;

    if (editing) {
      result = await supabase.from('projects').update(payload).eq('id', editing);
    } else {
      result = await supabase.from('projects').insert([payload]);
    }

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage('Project saved.');
    setForm({
      title: '',
      category: 'WEB DEVELOPMENT',
      description: '',
      link: '',
      cover: ''
    });
    setEditing(null);
    loadProjects();
  }

  async function del(id) {
    if (!confirm('Delete this project?')) return;

    const { error } = await supabase.from('projects').delete().eq('id', id);
    setMessage(error ? error.message : 'Project deleted.');
    loadProjects();
  }

  function edit(p) {
    setEditing(p.id);
    setForm({
      title: p.title || '',
      category: p.category || 'WEB DEVELOPMENT',
      description: p.description || '',
      link: p.link || '',
      cover: p.cover_url || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage('Choose an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image must be under 5 MB.');
      return;
    }

    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;

    const { error } = await supabase.storage
      .from('portfolio-media')
      .upload(path, file, { upsert: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    const { data } = supabase.storage.from('portfolio-media').getPublicUrl(path);
    setForm({ ...form, cover: data.publicUrl });
    setMessage('Image uploaded. Save the project to apply it.');
  }

  if (loading) {
    return <div className="admin-page"><p>Loading secure admin...</p></div>;
  }

  if (!supabase) {
    return (
      <div className="admin-page">
        <a className="admin-back" href="/#home">← Back to portfolio</a>
        <div className="admin-card">
          <LockKeyhole size={26} />
          <h1>Admin setup required</h1>
          <p>
            Connect your Supabase project by adding the environment variables in
            <code>.env</code>. See README.md for setup instructions. The public
            portfolio works without Supabase; secure admin features activate after setup.
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="admin-page">
        <a className="admin-back" href="/#home">← Back to portfolio</a>

        <form className="admin-card" onSubmit={login}>
          <LockKeyhole size={26} />
          <span className="eyebrow-text">PRIVATE AREA</span>
          <h1>Admin access.</h1>
          <p>Sign in with the admin account you created in Supabase.</p>

          <label>
            Email
            <input name="email" type="email" required autoComplete="username" />
          </label>

          <label>
            Password
            <input name="password" type="password" required autoComplete="current-password" />
          </label>

          <button className="glass-button" type="submit">
            Sign in <span className="button-icon"><ArrowRight size={17} /></span>
          </button>

          {message && <p className="form-status error">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-top">
        <a className="admin-back" href="/#home">← View portfolio</a>
        <button onClick={() => supabase.auth.signOut()} className="signout">
          <LogOut size={15} /> Sign out
        </button>
      </div>

      <div className="admin-dashboard">
        <div className="admin-heading">
          <span className="eyebrow-text">MOHAMMAD REHXNN / ADMIN</span>
          <h1>Manage your work.</h1>
          <p>Only authenticated users with the admin role can make changes.</p>
        </div>

        <div className="admin-columns">
          <form className="admin-card project-editor" onSubmit={saveProject}>
            <h2>{editing ? 'Edit project' : 'Add a project'}</h2>

            <label>
              Project title
              <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </label>

            <label>
              Category
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option>WEB DEVELOPMENT</option>
                <option>UI/UX DESIGN</option>
                <option>GRAPHIC DESIGN</option>
                <option>VIDEO EDITING</option>
                <option>AI CREATIVITY</option>
              </select>
            </label>

            <label>
              Description
              <textarea rows="3" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </label>

            <label>
              Live URL
              <input type="url" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
            </label>

            <label>
              Cover image URL
              <input type="url" value={form.cover} onChange={e => setForm({ ...form, cover: e.target.value })} placeholder="https://..." />
            </label>

            <label className="upload-label">
              <Upload size={16} /> Upload cover image
              <input type="file" accept="image/*" onChange={upload} />
            </label>

            {form.cover && <img className="cover-preview" src={form.cover} alt="Cover preview" />}

            <div className="admin-form-actions">
              <button className="glass-button" type="submit">
                {editing ? 'Update project' : 'Save project'}
                <span className="button-icon"><Check size={16} /></span>
              </button>

              {editing && (
                <button
                  className="cancel-edit"
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({
                      title: '',
                      category: 'WEB DEVELOPMENT',
                      description: '',
                      link: '',
                      cover: ''
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

            {message && <p className="form-status">{message}</p>}
          </form>

          <div className="admin-card project-list">
            <div className="list-title">
              <h2>Your projects</h2>
              <span>{projects.length} items</span>
            </div>

            {projects.length === 0 && <p>No projects yet. Add your first project using the form.</p>}

            {projects.map(p => (
              <div className="admin-project" key={p.id}>
                <div className="admin-project-thumb">
                  {p.cover_url ? <img src={p.cover_url} alt="" /> : <Layers3 size={20} />}
                </div>

                <div className="admin-project-info">
                  <strong>{p.title}</strong>
                  <span>{p.category}</span>
                </div>

                <button onClick={() => edit(p)} aria-label="Edit project">
                  <Pencil size={15} />
                </button>

                <button onClick={() => del(p.id)} aria-label="Delete project">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-security-note">
          <ShieldCheck size={18} />
          <p>
            Security note: keep your Supabase service-role key private. This site
            only uses the public anon/publishable key in the browser; Row Level
            Security protects admin operations.
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    if (supabase) {
      supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data?.length) {
            setProjects(data.map(p => ({ ...p, cover: p.cover_url })));
          }
        });
    }
  }, []);

  const isAdmin = window.location.pathname.startsWith('/admin');

  useEffect(() => {
    if (!isAdmin) {
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            observer.unobserve(e.target);
          }
        }),
        { threshold: 0.12 }
      );

      document
        .querySelectorAll('.section,.creative-brand,.personal-profile,.project-card,.reel-card')
        .forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [isAdmin, projects]);

  return isAdmin ? (
    <Admin />
  ) : (
    <>
      <Header />

      <aside className="quick-rail" aria-label="Quick navigation">
        <a href="#home" aria-label="Home">01</a>
        <a href="#about" aria-label="About">02</a>
        <a href="#expertise" aria-label="Expertise">03</a>
        <a href="#work" aria-label="Selected work">04</a>
        <a href="#contact" aria-label="Contact">05</a>
        <a
          className="rail-social"
          href="https://www.instagram.com/creative_novary/"
          target="_blank"
          rel="noreferrer"
          aria-label="Creative Novary Instagram"
        >
          <Instagram size={15} />
        </a>
      </aside>

      <main>
        <Hero />
        <Marquee />
        <About />
        <Expertise />
        <Work projects={projects} />
        <CreativeBrand />
        <PersonalProfile />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
