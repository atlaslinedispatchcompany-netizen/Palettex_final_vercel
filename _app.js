import '../styles/globals.css'
import Link from 'next/link'

function Nav(){
  return (
    <header className="header main">
      <div className="container">
        <img src="/logo.png" className="logo" alt="Logo" />
        <nav style={{marginLeft:'auto'}}>
          <Link href="/"><a style={{marginRight:12}}>Home</a></Link>
          <Link href="/upload"><a style={{marginRight:12}}>Upload</a></Link>
          <Link href="/contact"><a>Contact</a></Link>
        </nav>
      </div>
    </header>
  )
}

export default function MyApp({ Component, pageProps }){
  return <div className="main"><Nav/><Component {...pageProps} /></div>
}