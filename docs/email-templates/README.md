# Sign-in emails (Supabase Auth → Emails → Templates)

Branded versions of the two emails people get when they sign in. Paste the HTML into Supabase:
- `confirm-signup.html` → template **Confirm signup** (first sign-in for a new email). Subject: `Welcome to Method into Impact: confirm your email`
- `magic-link.html` → template **Magic Link** (every later sign-in). Subject: `Your sign-in link for Method into Impact`

They use `{{ .ConfirmationURL }}` (the button) and `{{ .Token }}` (the code people can type on the website).
The logo is served from https://methodintoimpact.com/assets/email/logo.png. Emails are sent through Brevo (SMTP), from hello@methodintoimpact.com.
