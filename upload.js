import { useState } from 'react'

export default function Upload(){
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [sending, setSending] = useState(false);

  function onFiles(e){
    const fl = Array.from(e.target.files).slice(0,5);
    setFiles(fl);
    setPreview(fl.map(f => URL.createObjectURL(f)));
  }

  async function onSubmit(e){
    e.preventDefault();
    if(files.length === 0){ alert('Please choose at least one image'); return; }
    setSending(true);
    const fd = new FormData(e.target);
    files.forEach(f => fd.append('artworkFile', f));
    try{
      const res = await fetch('/api/upload-art', { method:'POST', body: fd });
      const json = await res.json();
      if(res.ok) alert(json.message || 'Submission sent!');
      else alert('Error: ' + (json.error || 'Unknown'));
    }catch(err){
      alert('Upload failed: ' + err.message);
    }finally{ setSending(false); setFiles([]); setPreview([]); }
  }

  return (
    <main style={{padding:24}}>
      <h1>Upload Your Artwork</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input name="title" placeholder="Artwork Title" required /><br/><br/>
        <input name="artist" placeholder="Artist Name" required /><br/><br/>
        <input name="contact" placeholder="Contact Email or Phone" required /><br/><br/>
        <input name="price" placeholder="Price (optional)" /><br/><br/>
        <input name="country" placeholder="Country" /><br/><br/>
        <input type="file" name="artworkFile" accept="image/*" multiple onChange={onFiles} /><br/><br/>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {preview.map((p,i)=> <img key={i} src={p} style={{width:120,height:120,objectFit:'cover',borderRadius:8}} />)}
        </div>
        <br/>
        <button className="btn" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Submit Artwork'}</button>
      </form>
    </main>
  )
}