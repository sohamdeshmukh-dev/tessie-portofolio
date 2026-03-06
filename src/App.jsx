import { useEffect, useRef, useState } from 'react'
import './App.css'
import photo1 from './assets/photo1.clean.jpeg'
import photo2 from './assets/photo2.jpeg'
import photo3 from './assets/photo3.jpeg'

function App() {
  const PHOTO1_FALLBACK_JPEG = `${import.meta.env.BASE_URL}images/photo1.jpeg`
  const PHOTO1_FALLBACK_PNG = `${import.meta.env.BASE_URL}images/photo1.png`

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
    other: {
      title: 'Other',
      items: [
        {
          src: '/images/other/191DFEB2-D732-4E4B-8A3E-1BAC77533FBD_1_105_c.jpeg',
          alt: 'Other 1',
        },
        {
          src: '/images/other/1E907CC6-6667-4659-86FF-7DA31F40F709_1_105_c.jpeg',
          alt: 'Other 2',
        },
        {
          src: '/images/other/5796B7E6-95B3-4994-AAE0-6CD74906F59C_1_201_a.jpeg',
          alt: 'Other 3',
        },
        {
          src: '/images/other/5BB322CE-EB4C-44A7-95E7-9F2596F2E6A5_1_201_a.jpeg',
          alt: 'Other 4',
        },
        {
          src: '/images/other/6941A20A-18B8-431B-AF74-73F0FDE6ECD8_1_105_c.jpeg',
          alt: 'Other 5',
        },
        {
          src: '/images/other/97A7AD42-0D6B-4305-BE18-77A8580AE4A2_1_105_c.jpeg',
          alt: 'Other 6',
        },
        {
          src: '/images/other/9F71B33E-702D-48C7-8F8A-270FA4AA0601_1_105_c.jpeg',
          alt: 'Other 7',
        },
        {
          src: '/images/other/ABEEC602-1666-45FF-8732-F7D4DF1DC072_1_105_c.jpeg',
          alt: 'Other 8',
        },
        {
          src: '/images/other/D773E69C-A38D-41AB-8813-5594986E6EAE_1_102_a.jpeg',
          alt: 'Other 9',
        },
        {
          src: '/images/other/DAB3FE2C-3B05-4819-9FAB-0549E8E5D660_1_201_a.jpeg',
          alt: 'Other 10',
        },
      ],
    },
  }

  const aboutPhotos = [
    { src: photo1, alt: 'Photo 1' },
    { src: photo2, alt: 'Photo 2' },
    { src: photo3, alt: 'Photo 3' },
  ]

  const [activeArt, setActiveArt] = useState(null)
  const [lightbox, setLightbox] = useState({
    open: false,
    galleryKey: 'main',
    index: 0,
  })
  const [pulledPhoto, setPulledPhoto] = useState(null)
  const [dissolvePhoto, setDissolvePhoto] = useState(null)
  const dissolveTimers = useRef({})

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const preload = document.createElement('link')
    preload.rel = 'preload'
    preload.as = 'image'
    preload.href = photo1
    document.head.appendChild(preload)

    const image = new Image()
    image.src = photo1
    const fallbackJpeg = new Image()
    fallbackJpeg.src = PHOTO1_FALLBACK_JPEG

    return () => {
      if (document.head.contains(preload)) {
        document.head.removeChild(preload)
      }
    }
  }, [PHOTO1_FALLBACK_JPEG])

  const handlePhoto1Error = (event) => {
    const imageEl = event.currentTarget
    const step = Number(imageEl.dataset.fallbackStep ?? '0')

    if (step === 0) {
      imageEl.dataset.fallbackStep = '1'
      imageEl.src = PHOTO1_FALLBACK_JPEG
      return
    }

    if (step === 1) {
      imageEl.dataset.fallbackStep = '2'
      imageEl.src = PHOTO1_FALLBACK_PNG
    }
  }

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

  const handlePhotoEnter = (index) => {
    if (pulledPhoto !== null && pulledPhoto !== index) {
      setPulledPhoto(null)
    }
    setDissolvePhoto(null)
    setPulledPhoto(index)
  }

  const handlePhotoLeave = (index) => {
    if (pulledPhoto === index) {
      setPulledPhoto(null)
    }
    setDissolvePhoto(index)
    clearTimeout(dissolveTimers.current[index])
    dissolveTimers.current[index] = window.setTimeout(() => {
      setDissolvePhoto((prev) => (prev === index ? null : prev))
    }, 600)
  }

  const handlePhotoClick = (index) => {
    setDissolvePhoto(null)
    setPulledPhoto((prev) => (prev === index ? null : index))
  }

  useEffect(() => {
    if (!lightbox.open) return
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }
      if (event.key === 'ArrowLeft') {
        goPrev()
      }
      if (event.key === 'ArrowRight') {
        goNext()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox.open])

  const activeGallery = galleries[lightbox.galleryKey]
  const activeItems = activeGallery.items
  const prevIndex = (lightbox.index - 1 + activeItems.length) % activeItems.length
  const nextIndex = (lightbox.index + 1) % activeItems.length
  const toggleArt = (key) => {
    setActiveArt((prev) => (prev === key ? null : key))
  }

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
        <div className="hero-body">
          <div className="hero-content">
            <h1>Tessie Bunnell</h1>
            <div className="hero-links">
              <a
                href="https://open.spotify.com/artist/2u2FvDx9Giu2HO5xvkG80k"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="social-icon"
                  src="https://cdn.simpleicons.org/spotify"
                  alt=""
                  aria-hidden="true"
                />
                <span>Spotify</span>
              </a>
              <a href="https://www.instagram.com/tessiebunnell/" target="_blank" rel="noreferrer">
                <img
                  className="social-icon"
                  src="https://cdn.simpleicons.org/instagram"
                  alt=""
                  aria-hidden="true"
                />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tessie-bunnell-145b01341/"
                target="_blank"
                rel="noreferrer"
              >
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
          <div className="photo-frame" aria-label="Tessie Bunnell profile photo">
            <img
              src={photo1}
              alt="Tessie Bunnell profile"
              data-fallback-step="0"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              onError={handlePhoto1Error}
            />
          </div>
        </div>
      </header>

      <div className="content-columns">
        <div className="content-column content-column--left">
          <section className="card about" id="about">
            <h2>About</h2>
            <p className="about-blurb">
              Hi, I’m Tessie Bunnell — a 20-year-old student and musician originally
              from Seattle, WA. I’m currently a sophomore at Drexel University studying
              Music Industry and pursuing a bachelor’s degree in Business. I was born
              and raised in Shanghai, but I also consider Seattle home since I spent
              the latter half of my life there. Growing up between two cities has
              shaped both my perspective and my sound. I create folk and indie music,
              play guitar, and sing — music has always been the biggest part of my
              life. At Drexel, I’ve immersed myself in the world of the music industry
              and discovered a strong interest in publishing, A&R, and marketing. I’m
              excited to use both my creative and business skills to collaborate, build
              meaningful projects, and create magic with other people.
            </p>
            <div className="carousel" aria-label="Photo carousel">
              {aboutPhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className={`carousel-card ${
                    pulledPhoto === index ? 'is-pulled' : ''
                  } ${dissolvePhoto === index ? 'is-dissolve' : ''}`}
                  onMouseEnter={() => handlePhotoEnter(index)}
                  onMouseLeave={() => handlePhotoLeave(index)}
                  onClick={() => handlePhotoClick(index)}
                >
                  <img
                    className="carousel-photo"
                    src={photo.src}
                    alt={photo.alt}
                    data-fallback-step={index === 0 ? '0' : undefined}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding={index === 0 ? 'sync' : 'async'}
                    onError={index === 0 ? handlePhoto1Error : undefined}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="card art" id="art">
            <h2>Art</h2>
            <div className="art-grid">
              <button
                className={`art-tile ${activeArt === 'main' ? 'is-active' : ''}`}
                type="button"
                aria-expanded={activeArt === 'main'}
                onClick={() => toggleArt('main')}
              >
                Main
              </button>
              <button
                className={`art-tile ${activeArt === 'sketch' ? 'is-active' : ''}`}
                type="button"
                aria-expanded={activeArt === 'sketch'}
                onClick={() => toggleArt('sketch')}
              >
                Sketch
              </button>
              <button
                className={`art-tile ${activeArt === 'other' ? 'is-active' : ''}`}
                type="button"
                aria-expanded={activeArt === 'other'}
                onClick={() => toggleArt('other')}
              >
                Other
              </button>
            </div>
            <div
              className={`art-gallery-section ${activeArt === 'main' ? 'is-open' : ''}`}
              id="art-main"
            >
              <h3>Main</h3>
              <div className="art-gallery">
                {galleries.main.items.map((item, index) => (
                  <img
                    key={item.src}
                    src={item.src}
                    alt={item.alt}
                    onClick={() => openLightbox('main', index)}
                  />
                ))}
              </div>
            </div>
            <div
              className={`art-gallery-section ${activeArt === 'sketch' ? 'is-open' : ''}`}
              id="art-sketch"
            >
              <h3>Sketch</h3>
              <div className="art-gallery art-gallery--sketch">
                {galleries.sketch.items.map((item, index) => (
                  <img
                    key={item.src}
                    src={item.src}
                    alt={item.alt}
                    onClick={() => openLightbox('sketch', index)}
                  />
                ))}
              </div>
            </div>
            <div
              className={`art-gallery-section ${activeArt === 'other' ? 'is-open' : ''}`}
              id="art-other"
            >
              <h3>Other</h3>
              <div className="art-gallery art-gallery--other">
                {galleries.other.items.map((item, index) => (
                  <img
                    key={item.src}
                    src={item.src}
                    alt={item.alt}
                    onClick={() => openLightbox('other', index)}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="content-column content-column--right">
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
              <iframe
                className="spotify-embed-square"
                title="Spotify player: Tessie radio"
                src="https://open.spotify.com/embed/playlist/37i9dQZF1E4viNvR0Y1zFY"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </section>
        </div>
      </div>

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
            <a href="https://www.instagram.com/tessiebunnell/" target="_blank" rel="noreferrer">
              <span>@tessiebunnell</span>
            </a>
          </li>
          <li>
            linkedin{' '}
            <a
              href="https://www.linkedin.com/in/tessie-bunnell-145b01341/"
              target="_blank"
              rel="noreferrer"
            >
              <span>/in/tessie-bunnell-145b01341</span>
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
