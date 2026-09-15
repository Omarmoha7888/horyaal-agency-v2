import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

function sanitize(input: any): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
}

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return regex.test(email.trim());
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Fadlan isticmaal POST request.',
    });
  }

  try {
    const { fullName, phone, email, company, service, message, honeypot } = req.body || {};

    if (honeypot) {
      return res.status(200).json({
        success: true,
        message: 'Farriintaada si guul leh ayaa loo diray. Horyaal Digital Agency ayaa kula soo xiriiri doonta.',
      });
    }

    const cleanFullName = sanitize(fullName);
    const cleanPhone = sanitize(phone);
    const cleanEmail = sanitize(email);
    const cleanCompany = sanitize(company) || 'Not specified';
    const cleanService = sanitize(service) || 'General Inquiry';
    const cleanMessage = sanitize(message);

    const errors: string[] = [];
    if (!cleanFullName || cleanFullName.length < 2) errors.push('Fadlan qor magacaaga oo buuxa.');
    if (!cleanPhone && !cleanEmail) errors.push('Fadlan qor telefoon ama email.');
    if (cleanEmail && !isValidEmail(cleanEmail)) errors.push('Fadlan geli email sax ah.');
    if (!cleanMessage || cleanMessage.length < 5) errors.push('Fadlan qor farriintaada.');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Dalabka lama diri karin. Fadlan hubi xogta aad gelisay.',
        errors,
      });
    }

    const now = new Date();
    const submissionDate = now.toLocaleDateString('en-GB');
    const submissionTime = now.toLocaleTimeString('en-US');

    const targetEmail = 'horyaalgrowth@gmail.com';
    const emailSubject = `New Contact Message: ${cleanFullName} (${cleanService})`;

    const emailTextBody = `
NEW CONTACT MESSAGE — HORYAAL DIGITAL AGENCY

Sender Information:
- Full Name: ${cleanFullName}
- Phone: ${cleanPhone || 'Not provided'}
- Email: ${cleanEmail || 'Not provided'}
- Company: ${cleanCompany}
- Subject/Service: ${cleanService}

Message:
${cleanMessage}

Submission:
- Date: ${submissionDate}
- Time: ${submissionTime}
`.trim();

    const emailHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #f1f5f9; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #d4af37; border-radius: 12px; overflow: hidden; }
    .header { background: #020617; padding: 24px; text-align: center; border-bottom: 2px solid #d4af37; }
    .header h1 { color: #d4af37; margin: 0 0 6px 0; font-size: 22px; font-weight: 800; }
    .header p { color: #94a3b8; margin: 0; font-size: 13px; }
    .content { padding: 24px; }
    .field-card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 14px 18px; margin-bottom: 12px; }
    .label { color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
    .value { color: #ffffff; font-size: 15px; font-weight: 600; }
    .details-box { background: #020617; border-left: 3px solid #d4af37; padding: 14px 16px; border-radius: 4px; color: #e2e8f0; font-size: 14px; line-height: 1.6; }
    .footer { background: #020617; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HORYAAL DIGITAL AGENCY</h1>
      <p>Farriin Cusub oo Qeybta Xiriirka ah (Contact Message)</p>
    </div>
    <div class="content">
      <div class="field-card">
        <div class="label">Magaca</div>
        <div class="value">${cleanFullName}</div>
      </div>
      <div class="field-card">
        <div class="label">Telefoonka</div>
        <div class="value">${cleanPhone || 'Lama sheegin'}</div>
      </div>
      <div class="field-card">
        <div class="label">Email Address</div>
        <div class="value">${cleanEmail || 'Lama sheegin'}</div>
      </div>
      <div class="field-card">
        <div class="label">Shirkadda</div>
        <div class="value">${cleanCompany}</div>
      </div>
      <div class="field-card">
        <div class="label">Adeegga / Mawduuca</div>
        <div class="value" style="color: #d4af37;">${cleanService}</div>
      </div>
      <div class="field-card">
        <div class="label">Farriinta</div>
        <div class="details-box">${cleanMessage.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      Loo diray: <strong>horyaalgrowth@gmail.com</strong> | HD Agency
    </div>
  </div>
</body>
</html>
`.trim();

    const apiKey = (process.env.RESEND_API_KEY || 're_5abZDunF_BfgmAy2pyMav9gbj9spmxd6N').trim();
    const resend = new Resend(apiKey);

    try {
      const sendOptions: any = {
        from: 'onboarding@resend.dev',
        to: targetEmail,
        subject: emailSubject,
        text: emailTextBody,
        html: emailHtmlBody,
      };

      if (cleanEmail && isValidEmail(cleanEmail)) {
        sendOptions.replyTo = cleanEmail;
      }

      const sendResult = await resend.emails.send(sendOptions);
      if (sendResult?.error && sendOptions.replyTo) {
        delete sendOptions.replyTo;
        await resend.emails.send(sendOptions);
      }
    } catch (sendErr) {
      console.error('Vercel Contact Resend error:', sendErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Farriintaada si guul leh ayaa loo diray. Horyaal Digital Agency ayaa kula soo xiriiri doonta sida ugu dhakhsaha badan.',
    });
  } catch (err: any) {
    console.error('Contact handler error:', err);
    return res.status(500).json({
      success: false,
      message: 'Dalabka lama diri karin. Fadlan mar kale isku day ama nala soo xiriir telefoonka 612141414.',
    });
  }
}
