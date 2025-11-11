import formidable from 'formidable';
import fs from 'fs';
import nodemailer from 'nodemailer';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const form = new formidable.IncomingForm({ multiples: true, keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if(err) { console.error('form parse error', err); return res.status(500).json({ error: 'Form parse error' }); }
    try{
      const title = fields.title || 'Untitled';
      const artist = fields.artist || 'Unknown';
      const contact = fields.contact || 'No contact provided';
      const price = fields.price || 'N/A';
      const country = fields.country || 'N/A';

      const attachments = [];
      if(files && files.artworkFile){
        const fileItems = Array.isArray(files.artworkFile) ? files.artworkFile : [files.artworkFile];
        for(const f of fileItems){
          const data = fs.readFileSync(f.filepath);
          attachments.push({ filename: f.originalFilename || f.newFilename || 'upload.jpg', content: data });
        }
      }

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.office365.com',
        port: Number(process.env.EMAIL_PORT || 587),
        secure: (process.env.EMAIL_SECURE === 'true'),
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });

      const mailOptions = {
        from: `PaletteX <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Artwork Submission — ${title} (${artist})`,
        text: `Title: ${title}\nArtist: ${artist}\nContact: ${contact}\nPrice: ${price}\nCountry: ${country}\n`,
        attachments
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ ok:true, message: 'Submission sent to admin email.' });
    }catch(e){
      console.error('send error', e);
      return res.status(500).json({ error: 'Failed to send email.' });
    }
  });
}