import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light'
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const [theme, setTheme] = useState(getInitialTheme)
  const galleries = {
    main: {
      title: 'Main',
      items: [
        { src: '/images/main1.jpeg', alt: 'Main 1' },
        { src: '/images/main2.jpeg', alt: 'Main 2' },
        { src: '/images/main3.jpeg', alt: 'Main 3' },
        { src: '/images/main4.jpeg', alt: 'Main 4' },
        { src: '/images/main5.jpeg', alt: 'Main 5' },
        { src: '/images/main6.jpeg', alt: 'Main 6' },
        { src: '/images/main7.jpeg', alt: 'Main 7' },
        { src: '/images/main8.jpeg', alt: 'Main 8' },
      ],
    },
    sketch: {
      title: 'Sketch',
      items: [
        { src: '/images/sketch1.jpeg', alt: 'Sketch 1' },
        { src: '/images/sketch2.jpeg', alt: 'Sketch 2' },
        { src: '/images/sketch3.jpeg', alt: 'Sketch 3' },
      ],
    },
  }

  const [lightbox, setLightbox] = useState({
    open: false,
    galleryKey: 'main',
    index: 0,
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const openLightbox = (galleryKey, index) => {
    setLightbox({ open: true, galleryKey, index })
  }

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, open: false }))
  }

  const goPrev = () => {
    setLightbox((prev) => {
      const items = galleries[prev.galleryKey].items
      const nextIndex = (prev.index - 1 + items.length) % items.length
      return { ...prev, index: nextIndex }
    })
  }

  const goNext = () => {
    setLightbox((prev) => {
      const items = galleries[prev.galleryKey].items
      const nextIndex = (prev.index + 1) % items.length
      return { ...prev, index: nextIndex }
    })
  }

  const activeGallery = galleries[lightbox.galleryKey]
  const activeItems = activeGallery.items
  const prevIndex = (lightbox.index - 1 + activeItems.length) % activeItems.length
  const nextIndex = (lightbox.index + 1) % activeItems.length

  return (
    <div className="page">
      <header className="card hero" id="home">
        <div className="hero-top">
          <div className="hero-spacer" aria-hidden="true" />
          <nav className="nav">
            <a href="#about">about</a>
            <a href="#music">music</a>
            <a href="#art">art</a>
            <a href="#contact">contact</a>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
        </div>
        <div className="hero-title">
          <span className="hero-kicker">Tessie</span>
          <h1>Tessie Bunnell</h1>
        </div>
        <div className="hero-body">
          <div className="photo-frame" aria-label="Tessie Bunnell profile photo placeholder">
            <img src="/images/Photo1.jpeg" alt="Tessie Bunnell profile" />
          </div>
          <div className="hero-links">
            <a href="https://open.spotify.com" target="_blank" rel="noreferrer">
              <img
                className="social-icon"
                src="https://cdn.simpleicons.org/spotify"
                alt=""
                aria-hidden="true"
              />
              <span>Spotify</span>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <img
                className="social-icon"
                src="https://cdn.simpleicons.org/instagram"
                alt=""
                aria-hidden="true"
              />
              <span>Instagram</span>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <svg
                className="social-icon social-icon--linkedin"
                viewBox="0 0 448 512"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.11 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <section className="card about" id="about">
        <h2>About</h2>
        <p className="about-blurb">
          Hi, I’m Tessie Bunnell — a 20-year-old student and musician originally from
          Seattle, WA. I’m currently a sophomore at Drexel University studying Music
          Industry and pursuing a bachelor’s degree in Business. I was born and raised
          in Shanghai, but I also consider Seattle home since I spent the latter half
          of my life there. Growing up between two cities has shaped both my
          perspective and my sound. I create folk and indie music, play guitar, and
          sing — music has always been the biggest part of my life. At Drexel, I’ve
          immersed myself in the world of the music industry and discovered a strong
          interest in publishing, A&R, and marketing. I’m excited to use both my
          creative and business skills to collaborate, build meaningful projects, and
          create magic with other people.
        </p>
        <div className="carousel" aria-label="Photo carousel">
          <img className="carousel-photo" src="/images/Photo1.jpeg" alt="Photo 1" />
          <img className="carousel-photo" src="/images/Photo2.jpeg" alt="Photo 2" />
          <img className="carousel-photo" src="/images/Photo3.jpeg" alt="Photo 3" />
        </div>
      </section>

      <section className="card music" id="music">
        <h2>Music</h2>
        <div className="music-grid">
          <a
            className="album album--rose"
            href="https://open.spotify.com/track/3h1TKA52GbJFxUGO9rxhOS?si=4a06055cbc2746d4"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/newdays.png" alt="new days cover art" />
            <span>new days</span>
          </a>
          <a
            className="album album--amber"
            href="https://open.spotify.com/track/0y5GDkAymUZUfA9lBorblt"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/barcelona.png" alt="barcelona cover art" />
            <span>barcelona</span>
          </a>
          <div className="album album--note" aria-label="EP coming soon">
            <span>EP coming</span>
          </div>
        </div>
        <div className="spotify-embeds" aria-label="Spotify embeds">
          <iframe
            title="Spotify player: new days"
            src="https://open.spotify.com/embed/track/3h1TKA52GbJFxUGO9rxhOS"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <iframe
            title="Spotify player: barcelona"
            src="https://open.spotify.com/embed/track/0y5GDkAymUZUfA9lBorblt"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
        <p className="music-note">Hyperlinks go to Spotify.</p>
      </section>

      <section className="card art" id="art">
        <h2>Art</h2>
        <div className="art-grid">
          <a className="art-tile" href="#art-main">
            main
          </a>
          <a className="art-tile" href="#art-sketch">
            sketch
          </a>
        </div>
        <div className="art-gallery-section" id="art-main">
          <h3>Main</h3>
          <div className="art-gallery">
            {galleries.main.items.map((item, index) => (
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                onDoubleClick={() => openLightbox('main', index)}
              />
            ))}
          </div>
        </div>
        <div className="art-gallery-section" id="art-sketch">
          <h3>Sketch</h3>
          <div className="art-gallery art-gallery--sketch">
            {galleries.sketch.items.map((item, index) => (
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                onDoubleClick={() => openLightbox('sketch', index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="card contact" id="contact">
        <h2>Contact</h2>
        <ul className="contact-list">
          <li>
            email{' '}
            <a href="mailto:hello@tessiebunnell.com">
              <span>hello@tessiebunnell.com</span>
            </a>
          </li>
          <li>
            instagram{' '}
            <a href="https://www.instagram.com/tessie" target="_blank" rel="noreferrer">
              <span>@tessie</span>
            </a>
          </li>
          <li>
            linkedin{' '}
            <a
              href="https://www.linkedin.com/in/tessie-bunnell"
              target="_blank"
              rel="noreferrer"
            >
              <span>/in/tessie-bunnell</span>
            </a>
          </li>
          <li>
            tiktok{' '}
            <a href="https://www.tiktok.com/@tessietoks" target="_blank" rel="noreferrer">
              <span>@tessietoks</span>
            </a>
          </li>
        </ul>
      </section>
      {lightbox.open && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="lightbox-close" type="button" onClick={closeLightbox}>
            close
          </button>
          <div className="lightbox-backdrop" onClick={closeLightbox} />
          <div className="lightbox-content">
            <button className="lightbox-nav" type="button" onClick={goPrev}>
              ←
            </button>
            <div className="deck" aria-label={`${activeGallery.title} gallery`}>
              <div className="deck-card is-prev">
                <img src={activeItems[prevIndex].src} alt={activeItems[prevIndex].alt} />
              </div>
              <div className="deck-card is-current">
                <img
                  src={activeItems[lightbox.index].src}
                  alt={activeItems[lightbox.index].alt}
                />
              </div>
              <div className="deck-card is-next">
                <img src={activeItems[nextIndex].src} alt={activeItems[nextIndex].alt} />
              </div>
            </div>
            <button className="lightbox-nav" type="button" onClick={goNext}>
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
