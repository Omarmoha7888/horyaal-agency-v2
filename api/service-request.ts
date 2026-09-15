import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const VALID_SERVICES = [
  'Digital Marketing',
  'Social Media Advertising',
  'Marketing Analytics',
  'Branding & Content Creation',
  'Website & Online Promotion',
] as const;

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
    const {
      fullName,
      phone,
      email,
      companyName,
      service,
      projectDetails,
      preferredContact,
      honeypot,
    } = req.body || {};

    if (honeypot) {
      return res.status(200).json({
        success: true,
        message: 'Dalabkaaga si guul leh ayaa loo diray. Horyaal Digital Agency ayaa kula soo xiriiri doonta sida ugu dhakhsaha badan.',
      });
    }

    const cleanFullName = sanitize(fullName);
    const cleanPhone = sanitize(phone);
    const cleanEmail = sanitize(email);
    const cleanCompanyName = sanitize(companyName) || 'Ma jiro (Not specified)';
    const cleanService = sanitize(service);
    const cleanProjectDetails = sanitize(projectDetails);
    const cleanPreferredContact = sanitize(preferredContact) || 'Telefoon / WhatsApp';

    const errors: string[] = [];
    if (!cleanFullName || cleanFullName.length < 2) {
      errors.push('Fadlan geli magacaaga oo buuxa.');
    }

    const phoneDigits = cleanPhone.replace(/[^\d+]/g, '');
    if (!phoneDigits || phoneDigits.length < 7) {
      errors.push('Fadlan geli lambar telefoon oo sax ah.');
    }

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      errors.push('Fadlan geli cinwaan email oo sax ah.');
    }

    if (!cleanService || !VALID_SERVICES.includes(cleanService as any)) {
      errors.push('Fadlan dooro mid ka mid ah 5-ta adeeg ee Horyaal Agency.');
    }

    if (!cleanProjectDetails || cleanProjectDetails.length < 5) {
      errors.push('Fadlan faahfaahi waxa aad u baahan tahay (ugu yaraan 5 xaraf).');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Dalabka lama diri karin. Fadlan hubi xogta aad gelisay.',
        errors,
      });
    }

    const now = new Date();
    const submissionDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const submissionTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const targetEmail = 'horyaalgrowth@gmail.com';
    const emailSubject = `New Service Request: ${cleanService} [${cleanFullName}]`;

    const emailTextBody = `
NEW SERVICE REQUEST — HORYAAL DIGITAL AGENCY

Customer Information:
- Full Name: ${cleanFullName}
- Phone Number: ${cleanPhone}
- Email Address: ${cleanEmail}
- Business/Company Name: ${cleanCompanyName}
- Requested Service: ${cleanService}
- Preferred Contact Method: ${cleanPreferredContact}

Project Details:
- ${cleanProjectDetails}

Submission Details:
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
    .badge { display: inline-block; background: #d4af37; color: #020617; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 9999px; margin-top: 8px; text-transform: uppercase; }
    .content { padding: 24px; }
    .field-card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 14px 18px; margin-bottom: 12px; }
    .label { color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
    .value { color: #ffffff; font-size: 15px; font-weight: 600; word-break: break-word; }
    .service-highlight { color: #d4af37; font-size: 16px; font-weight: 800; }
    .details-box { background: #020617; border-left: 3px solid #d4af37; padding: 14px 16px; border-radius: 4px; color: #e2e8f0; font-size: 14px; line-height: 1.6; }
    .whatsapp-btn { display: inline-block; background: #25d366; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 800; font-size: 13px; text-align: center; margin-top: 10px; }
    .footer { background: #020617; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HORYAAL DIGITAL AGENCY</h1>
      <p>Dalab Cusub oo Adeeg ah (New Service Request)</p>
      <span class="badge">${cleanService}</span>
    </div>
    <div class="content">
      <div class="field-card">
        <div class="label">Magaca Macmiilka</div>
        <div class="value">${cleanFullName}</div>
      </div>
      <div class="field-card">
        <div class="label">Telefoonka</div>
        <div class="value"><a href="tel:${cleanPhone}" style="color: #38bdf8; text-decoration: none;">${cleanPhone}</a></div>
      </div>
      <div class="field-card">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${cleanEmail}" style="color: #38bdf8; text-decoration: none;">${cleanEmail}</a></div>
      </div>
      <div class="field-card">
        <div class="label">Shirkadda / Ganacsiga</div>
        <div class="value">${cleanCompanyName}</div>
      </div>
      <div class="field-card">
        <div class="label">Adeegga La Doortay</div>
        <div class="value service-highlight">${cleanService}</div>
      </div>
      <div class="field-card">
        <div class="label">Habka Xiriirka</div>
        <div class="value">${cleanPreferredContact}</div>
      </div>
      <div class="field-card">
        <div class="label">Faahfaahinta Mashruuca</div>
        <div class="details-box">${cleanProjectDetails.replace(/\n/g, '<br>')}</div>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="https://wa.me/${cleanPhone.replace(/[^\d]/g, '')}" class="whatsapp-btn">
          💬 Toos Kula Xiriir WhatsApp Macmiilka
        </a>
      </div>
    </div>
    <div class="footer">
      Loo diray: <strong>horyaalgrowth@gmail.com</strong> | Taariikhda: ${submissionDate} ${submissionTime} | HD Agency
    </div>
  </div>
</body>
</html>
`.trim();

    const submissionId = `HD-${Date.now().toString(36).toUpperCase()}`;

    // Get API key from environment variable or fallback key
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

      if (isValidEmail(cleanEmail)) {
        sendOptions.replyTo = cleanEmail;
      }

      const result = await resend.emails.send(sendOptions);
      if (result.error && sendOptions.replyTo) {
        delete sendOptions.replyTo;
        await resend.emails.send(sendOptions);
      }
    } catch (sendErr) {
      console.error('Vercel Resend send error:', sendErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Dalabkaaga si guul leh ayaa loo diray. Horyaal Digital Agency ayaa kula soo xiriiri doonta sida ugu dhakhsaha badan.',
      submissionId,
      service: cleanService,
      submittedAt: `${submissionDate} at ${submissionTime}`,
      deliveredTo: targetEmail,
    });
  } catch (err: any) {
    console.error('Handler error:', err);
    return res.status(500).json({
      success: false,
      message: 'Dalabka lama diri karin. Fadlan mar kale isku day ama nala soo xiriir telefoonka 612141414.',
      error: err?.message || 'Server error',
    });
  }
}
