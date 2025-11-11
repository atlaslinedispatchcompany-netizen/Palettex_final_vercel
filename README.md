PaletteX — Email-only Vercel-ready Build
=======================================

This build sends all artwork upload submissions directly to the admin email as attachments (no Firebase).
Before deploying, create a .env.local file (or set Vercel environment variables) with your email SMTP credentials.
Use .env.example as a template.

ENV (set in Vercel or .env.local locally):
- EMAIL_HOST (smtp host)
- EMAIL_PORT
- EMAIL_SECURE (true/false)
- EMAIL_USER (smtp username)
- EMAIL_PASS (smtp app password)
- ADMIN_EMAIL (where submissions are sent)

Deploy:
1. npm install
2. npm run build
3. npm start OR upload zip to Vercel (Upload ZIP on vercel.com/new)

Security note: Do NOT commit .env.local to any public repo. Use Vercel environment variables for production.