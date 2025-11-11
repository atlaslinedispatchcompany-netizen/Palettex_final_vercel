import { useRouter } from 'next/router'
const artworks = {
  'golden-reverie': { title:'Golden Reverie', src:'/artworks/golden_reverie.jpeg', artist:'PaletteX Artist' },
  'carousel': { title:'Carousel', src:'/artworks/carousel.jpeg', artist:'PaletteX Artist' },
  'crimson-horizon': { title:'Crimson Horizon', src:'/artworks/crimson_horizon.jpeg', artist:'PaletteX Artist' },
  'ethereal-bloom': { title:'Ethereal Bloom', src:'/artworks/ethereal_bloom.jpeg', artist:'PaletteX Artist' },
  'silent-canvas': { title:'Silent Canvas', src:'/artworks/silent_canvas.jpeg', artist:'PaletteX Artist' },
  'luminous-flow': { title:'Luminous Flow', src:'/artworks/luminous_flow.jpeg', artist:'PaletteX Artist' }
};

export default function ArtPage(){
  const r = useRouter();
  const { id } = r.query;
  const art = artworks[id];
  if(!art) return <div>Not found</div>;
  const mailto = `mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'replace_with_admin_email@domain.com'}?subject=${encodeURIComponent('Inquiry about ' + art.title)}&body=${encodeURIComponent('I am interested in ' + art.title + ' by ' + art.artist)}`;
  return (
    <main style={{padding:24}}>
      <h1>{art.title}</h1>
      <img src={art.src} style={{maxWidth:'100%',borderRadius:8}} />
      <p>By {art.artist}</p>
      <a className="btn" href={mailto}>Buy Artwork</a>
    </main>
  );
}