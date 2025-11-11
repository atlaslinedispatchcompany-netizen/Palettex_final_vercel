import { useState } from 'react'
export default function Contact(){
  const [sending,setSending]=useState(false);
  async function onSubmit(e){
    e.preventDefault();
    setSending(true);
    await new Promise(r=>setTimeout(r,800));
    alert('Message sent (preview).');
    setSending(false);
  }
  return (
    <main style={{padding:24}}>
      <h1>Contact Us</h1>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Your Name" required /><br/><br/>
        <input name="email" placeholder="Your Email" required /><br/><br/>
        <textarea name="message" placeholder="Message" rows="6" required></textarea><br/><br/>
        <button className="btn" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
      </form>
    </main>
  )
}