import Link from 'next/link'
const artworks = [
  { id: 'golden-reverie', title: 'Golden Reverie', src: '/artworks/golden_reverie.jpeg' },
  { id: 'carousel', title: 'Carousel', src: '/artworks/carousel.jpeg' },
  { id: 'crimson-horizon', title: 'Crimson Horizon', src: '/artworks/crimson_horizon.jpeg' },
  { id: 'ethereal-bloom', title: 'Ethereal Bloom', src: '/artworks/ethereal_bloom.jpeg' },
  { id: 'silent-canvas', title: 'Silent Canvas', src: '/artworks/silent_canvas.jpeg' },
  { id: 'luminous-flow', title: 'Luminous Flow', src: '/artworks/luminous_flow.jpeg' }
];

export default function Home(){
  return (
    <main>
      <section className="hero">
        <img src="/logo.png" className="logo" alt="logo" />
        <h1>PaletteX</h1>
        <p className="tagline">PaletteX - Where Artists and Collectors Connect.</p>
        <Link href="/upload"><a className="btn">Upload Artwork</a></Link>
      </section>

      <section className="gallery">
        {artworks.map(a=> (
          <div className="card" key={a.id}>
            <img src={a.src} alt={a.title} />
            <div className="title">{a.title}</div>
            <Link href={`/art/${a.id}`}><a className="btn">View</a></Link>
          </div>
        ))}
      </section>

      <footer className="footer">© 2025 PaletteX — The Global Art Exchange</footer>
    </main>
  )
}