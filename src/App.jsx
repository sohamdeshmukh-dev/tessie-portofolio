import { useEffect, useRef, useState } from 'react'
import './App.css'
import photo1 from './assets/photo1.clean.jpeg'
import photo2 from './assets/photo2.jpeg'
import photo3 from './assets/photo3.jpeg'

const SPOTIFY_EMBEDS = [
  {
    id: 'newdays',
    type: 'track',
    title: 'Spotify player: new days',
    src: 'https://open.spotify.com/embed/track/3h1TKA52GbJFxUGO9rxhOS?utm_source=generator',
  },
  {
    id: 'barcelona',
    type: 'track',
    title: 'Spotify player: barcelona',
    src: 'https://open.spotify.com/embed/track/0y5GDkAymUZUfA9lBorblt?utm_source=generator',
  },
  {
    id: 'tessie-radio',
    type: 'playlist',
    title: 'Spotify player: Tessie radio',
    src: 'https://open.spotify.com/embed/playlist/37i9dQZF1E4viNvR0Y1zFY?utm_source=generator',
  },
]

function App() {
  const PHOTO1_FALLBACK_JPEG = `${import.meta.env.BASE_URL}images/photo1.jpeg`
  const PHOTO1_FALLBACK_PNG = `${import.meta.env.BASE_URL}images/photo1.png`
  const CLOUD_SRC = `${import.meta.env.BASE_URL}images/cloud.png`
  const GRASS_SRC = `${import.meta.env.BASE_URL}images/grass.png`

  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light'
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const createCloud = (id, withOffset = true) => {
    const size = 120 + Math.random() * 170
    const top =
      Math.random() < 0.72
        ? 2 + Math.pow(Math.random(), 1.35) * 58
        : 56 + Math.random() * 18
    const duration = 180 + Math.random() * 220
    const delay = withOffset ? -Math.random() * duration : 0
    const opacity = 0.24 + Math.random() * 0.34
    const blur = Math.random() * 1.6
    const depth = 0.9 + Math.random() * 0.5
    const direction = Math.random() > 0.5 ? 'cloud-drift-left' : 'cloud-drift-right'

    return {
      id,
      size,
      top,
      duration,
      delay,
      opacity,
      blur,
      depth,
      direction,
    }
  }

  const [theme, setTheme] = useState(getInitialTheme)
  const [skyClouds, setSkyClouds] = useState(() =>
    Array.from({ length: 10 }, (_, index) => createCloud(`cloud-${index}`, true))
  )

  const respawnCloud = (index) => {
    setSkyClouds((prev) =>
      prev.map((cloud, cloudIndex) =>
        cloudIndex === index ? createCloud(cloud.id, false) : cloud
      )
    )
  }
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

  const heroCarouselPhotos = [
    { src: '/images/carousel/first%20picture.jpeg', alt: 'Carousel photo 1' },
    {
      src: '/images/carousel/03547055-964D-4AF6-85C2-B0820D1E709A_1_105_c.jpeg',
      alt: 'Carousel photo 2',
    },
    {
      src: '/images/carousel/19F33636-B244-4FB6-AE20-D794C8AEB262_4_5005_c.jpeg',
      alt: 'Carousel photo 3',
    },
    {
      src: '/images/carousel/32C87F29-DEDD-45C4-9881-79112C744A7B.jpeg',
      alt: 'Carousel photo 4',
    },
    {
      src: '/images/carousel/73C61091-3BD2-41B4-9D8B-7EB6546C70EE_1_105_c.jpeg',
      alt: 'Carousel photo 5',
    },
    {
      src: '/images/carousel/BC9FCA7F-3193-487B-82B7-760685B6579C.jpeg',
      fallbackSrc: photo3,
      alt: 'Carousel photo 6',
    },
    {
      src: '/images/carousel/DF1461EC-C81B-4AE4-9527-1BB8876E622F_4_5005_c.jpeg',
      alt: 'Carousel photo 7',
    },
    {
      src: '/images/carousel/FE0F4436-D164-443F-BACB-674523C9B981_1_105_c.jpeg',
      alt: 'Carousel photo 8',
    },
  ]

  const [activeArt, setActiveArt] = useState(null)
  const [spotifyEmbedsReady, setSpotifyEmbedsReady] = useState(false)
  const [spotifyLoaded, setSpotifyLoaded] = useState({})
  const [lightbox, setLightbox] = useState({
    open: false,
    galleryKey: 'main',
    index: 0,
  })
  const [lightboxAspectRatio, setLightboxAspectRatio] = useState(1)
  const [pulledPhoto, setPulledPhoto] = useState(null)
  const [dissolvePhoto, setDissolvePhoto] = useState(null)
  const dissolveTimers = useRef({})
  const lightboxRatioCache = useRef({})
  const musicSectionRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const cloudPreload = document.createElement('link')
    cloudPreload.rel = 'preload'
    cloudPreload.as = 'image'
    cloudPreload.href = CLOUD_SRC
    document.head.appendChild(cloudPreload)

    const grassPreload = document.createElement('link')
    grassPreload.rel = 'preload'
    grassPreload.as = 'image'
    grassPreload.href = GRASS_SRC
    document.head.appendChild(grassPreload)

    const cloudImage = new Image()
    cloudImage.src = CLOUD_SRC
    const grassImage = new Image()
    grassImage.src = GRASS_SRC

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
      if (document.head.contains(cloudPreload)) {
        document.head.removeChild(cloudPreload)
      }
      if (document.head.contains(grassPreload)) {
        document.head.removeChild(grassPreload)
      }
      if (document.head.contains(preload)) {
        document.head.removeChild(preload)
      }
    }
  }, [CLOUD_SRC, GRASS_SRC, PHOTO1_FALLBACK_JPEG])

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

  useEffect(() => {
    if (spotifyEmbedsReady) return

    const musicSection = musicSectionRef.current
    if (!musicSection) return

    if (!('IntersectionObserver' in window)) {
      setSpotifyEmbedsReady(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting)
        if (isVisible) {
          setSpotifyEmbedsReady(true)
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin: '380px 0px',
        threshold: 0.08,
      }
    )

    observer.observe(musicSection)
    return () => observer.disconnect()
  }, [spotifyEmbedsReady])

  const handleSpotifyLoad = (id) => {
    setSpotifyLoaded((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
  }

  const activeGallery = galleries[lightbox.galleryKey]
  const activeItems = activeGallery.items
  const prevIndex = (lightbox.index - 1 + activeItems.length) % activeItems.length
  const nextIndex = (lightbox.index + 1) % activeItems.length
  const currentLightboxSrc = lightbox.open ? activeItems[lightbox.index]?.src : null

  useEffect(() => {
    if (!currentLightboxSrc) return

    const cached = lightboxRatioCache.current[currentLightboxSrc]
    if (cached) {
      setLightboxAspectRatio(cached)
      return
    }

    let cancelled = false
    const image = new Image()
    image.onload = () => {
      if (cancelled) return
      const ratio =
        image.naturalWidth > 0 && image.naturalHeight > 0
          ? image.naturalWidth / image.naturalHeight
          : 1
      lightboxRatioCache.current[currentLightboxSrc] = ratio
      setLightboxAspectRatio(ratio)
    }
    image.onerror = () => {
      if (!cancelled) setLightboxAspectRatio(1)
    }
    image.src = currentLightboxSrc

    return () => {
      cancelled = true
    }
  }, [currentLightboxSrc])

  const toggleArt = (key) => {
    setActiveArt((prev) => (prev === key ? null : key))
  }

  return (
    <>
      {theme !== 'dark' && (
        <>
          <div className="sky-cloud-layer" aria-hidden="true">
            {skyClouds.map((cloud, index) => (
              <img
                key={cloud.id}
                className={`sky-cloud ${cloud.direction}`}
                src={CLOUD_SRC}
                alt=""
                onAnimationIteration={() => respawnCloud(index)}
                style={{
                  '--cloud-size': `${cloud.size}px`,
                  '--cloud-top': `${cloud.top}%`,
                  '--cloud-duration': `${cloud.duration}s`,
                  '--cloud-delay': `${cloud.delay}s`,
                  '--cloud-opacity': cloud.opacity,
                  '--cloud-blur': `${cloud.blur}px`,
                  '--cloud-depth': cloud.depth,
                }}
              />
            ))}
          </div>
          <div className="sky-grass-layer" aria-hidden="true" />
        </>
      )}
      <div className="page">
        <header className="card hero" id="home">
        <div className="hero-top">
          <div className="hero-spacer" aria-hidden="true" />
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#music">Music</a>
            <a href="#art">Art</a>
            <a href="#contact">Contact</a>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          />
        </div>
        <div className="hero-body">
          <div className="hero-content">
            <div className="hero-title-block">
              <h1>Tessie Bunnell</h1>
              <p className="hero-location">
                <span className="hero-location-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M12 2.5c-3.59 0-6.5 2.91-6.5 6.5 0 4.93 6.5 12 6.5 12s6.5-7.07 6.5-12c0-3.59-2.91-6.5-6.5-6.5zm0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                </span>
                <span>Philadelphia, PA</span>
              </p>
            </div>
            <a className="hero-resume-btn" href="/BunnellTessieResume.pdf" download>
              Download Resume
            </a>
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

      <section className="card hero-carousel" aria-label="Featured photo carousel">
        <div className="hero-carousel-strip">
          <div className="hero-carousel-track">
            <div className="hero-carousel-sequence">
              {heroCarouselPhotos.map((photo, index) => (
                <img
                  key={`hero-seq-a-${index}-${photo.src}`}
                  className="hero-carousel-item"
                  src={photo.src}
                  alt={photo.alt}
                  loading={index < 1 ? 'eager' : 'lazy'}
                  decoding={index < 1 ? 'sync' : 'async'}
                  onError={
                    photo.fallbackSrc
                      ? (event) => {
                          const image = event.currentTarget
                          if (image.dataset.fallbackApplied === '1') return
                          image.dataset.fallbackApplied = '1'
                          image.src = photo.fallbackSrc
                        }
                      : undefined
                  }
                />
              ))}
            </div>
            <div className="hero-carousel-sequence hero-carousel-sequence--clone" aria-hidden="true">
              {heroCarouselPhotos.map((photo, index) => (
                <img
                  key={`hero-seq-b-${index}-${photo.src}`}
                  className="hero-carousel-item"
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={
                    photo.fallbackSrc
                      ? (event) => {
                          const image = event.currentTarget
                          if (image.dataset.fallbackApplied === '1') return
                          image.dataset.fallbackApplied = '1'
                          image.src = photo.fallbackSrc
                        }
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

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
              life. At Drexel, I’ve immersed myself in the world of the music industry.
              <br />
              <br />
              I’ve discovered a strong interest in publishing, A&R, and marketing. I’m
              excited to use both my creative and business skills to collaborate, build
              meaningful projects, and create magic with other people.
            </p>
            <div className="carousel" aria-label="Photo carousel">
              {aboutPhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className={`carousel-card carousel-card--${
                    index === 0 ? 'left' : index === 1 ? 'center' : 'right'
                  } ${pulledPhoto === index ? 'is-pulled' : ''} ${
                    dissolvePhoto === index ? 'is-dissolve' : ''
                  }`}
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
                    loading="lazy"
                    decoding="async"
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
                    loading="lazy"
                    decoding="async"
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
                    loading="lazy"
                    decoding="async"
                    onClick={() => openLightbox('other', index)}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="content-column content-column--right">
          <section className="card music" id="music" ref={musicSectionRef}>
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
            <div
              className={`spotify-embeds ${spotifyEmbedsReady ? 'is-ready' : 'is-pending'}`}
              aria-label="Spotify embeds"
            >
              {SPOTIFY_EMBEDS.map((embed) => (
                <div
                  key={embed.id}
                  className={`spotify-frame-shell spotify-frame-shell--${embed.type} ${
                    spotifyLoaded[embed.id] ? 'is-loaded' : ''
                  }`}
                >
                  {!spotifyEmbedsReady && (
                    <div className="spotify-placeholder" aria-hidden="true">
                      <span>Loading Spotify...</span>
                    </div>
                  )}
                  {spotifyEmbedsReady && (
                    <>
                      {!spotifyLoaded[embed.id] && (
                        <div className="spotify-placeholder" aria-hidden="true">
                          <span>Loading Spotify...</span>
                        </div>
                      )}
                      <iframe
                        title={embed.title}
                        src={embed.src}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        onLoad={() => handleSpotifyLoad(embed.id)}
                      />
                    </>
                  )}
                </div>
              ))}
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
        <p className="contact-copyright">© 2026 Tessie Bunnell • Philadelphia, PA</p>
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
              <div
                className="deck"
                aria-label={`${activeGallery.title} gallery`}
                style={{ '--deck-ratio': lightboxAspectRatio }}
              >
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
    </>
  )
}

export default App
