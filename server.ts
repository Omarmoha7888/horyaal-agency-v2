import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store submissions in memory for audit and fast administrative verification
export interface StoredRequest {
  id: string;
  type: 'service-request' | 'contact';
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  service: string;
  projectDetails: string;
  preferredContact: string;
  submittedAt: string;
  ip?: string;
  status: 'delivered' | 'pending' | 'logged';
}

const submissionsLog: StoredRequest[] = [];

// Rate limiting in-memory map
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

const rateLimiter = (req: Request, res: Response, next: () => void) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIp);

  if (!clientData || now - clientData.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, firstAttempt: now });
    return next();
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      message: 'Dalabka lama diri karin. Fadlan mar kale isku day ama nala soo xiriir telefoonka 612141414.',
      error: 'Too many requests. Please wait a moment before retrying.',
    });
  }

  clientData.count += 1;
  next();
};

// Lazy Resend client initialization (prevents startup crashes if key is initially empty)
let resendClient: Resend | null = null;
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.startsWith('re_12345')) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey.trim());
  }
  return resendClient;
}

// Valid services list per specification
const VALID_SERVICES = [
  'Digital Marketing',
  'Social Media Advertising',
  'Marketing Analytics',
  'Branding & Content Creation',
  'Website & Online Promotion',
] as const;

// Helper: Sanitize string input
function sanitize(input: any): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
}

// Strict email regex validation
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  // Standard RFC 5322 compatible regex
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return regex.test(trimmed);
}

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    agency: 'Horyaal Digital Agency (HD)',
    destinationEmail: process.env.EMAIL_TO || 'horyaalgrowth@gmail.com',
    phone: '612141414',
    emailService: 'Resend',
    resendConfigured: !!process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith('re_12345'),
    totalSubmissions: submissionsLog.length,
    timestamp: new Date().toISOString(),
  });
});

// Admin endpoint to view received submissions
app.get('/api/admin/submissions', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: submissionsLog.length,
    destinationEmail: process.env.EMAIL_TO || 'horyaalgrowth@gmail.com',
    submissions: submissionsLog.slice(-50).reverse(),
  });
});

// SERVICE REQUEST API
app.post('/api/service-request', rateLimiter, async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      companyName,
      service,
      projectDetails,
      preferredContact,
      honeypot, // Anti-spam trap
    } = req.body;

    // Spam honeypot detection
    if (honeypot) {
      return res.json({
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

    // Validation checks
    const errors: string[] = [];

    if (!cleanFullName || cleanFullName.length < 2) {
      errors.push('Fadlan geli magacaaga oo buuxa (Full Name is required).');
    }

    const phoneDigits = cleanPhone.replace(/[^\d+]/g, '');
    if (!phoneDigits || phoneDigits.length < 7) {
      errors.push('Fadlan geli lambar telefoon oo sax ah (Valid phone number is required).');
    }

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      errors.push('Fadlan geli cinwaan email oo sax ah (Valid email address is required).');
    }

    if (!cleanService || !VALID_SERVICES.includes(cleanService as any)) {
      errors.push('Fadlan dooro mid ka mid ah 5-ta adeeg (Please select one of the valid 5 services).');
    }

    if (!cleanProjectDetails || cleanProjectDetails.length < 5) {
      errors.push('Fadlan faahfaahi waxa aad u baahan tahay (Project details must be at least 5 characters).');
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

    // Destination is strictly fixed to horyaalgrowth@gmail.com
    const targetEmail = 'horyaalgrowth@gmail.com';
    
    // Sender must use a verified Resend address or default onboarding
    const senderEmail = process.env.EMAIL_FROM && isValidEmail(process.env.EMAIL_FROM)
      ? `Horyaal Digital Agency <${process.env.EMAIL_FROM.trim()}>`
      : 'Horyaal Digital Agency <onboarding@resend.dev>';

    const emailSubject = `New Service Request: ${cleanService} [${cleanFullName}]`;

    // Exact email body format per specification
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
- Reference ID: HD-${Date.now().toString(36).toUpperCase()}
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
    .header h1 { color: #d4af37; margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; }
    .header p { color: #94a3b8; margin: 0; font-size: 13px; }
    .badge { display: inline-block; background: #d4af37; color: #020617; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 9999px; margin-top: 8px; text-transform: uppercase; }
    .content { padding: 24px; }
    .field-card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 14px 18px; margin-bottom: 12px; }
    .label { color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
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
        <div class="label">Magaca Macmiilka (Client Name)</div>
        <div class="value">${cleanFullName}</div>
      </div>
      <div class="field-card">
        <div class="label">Telefoonka (Phone)</div>
        <div class="value"><a href="tel:${cleanPhone}" style="color: #38bdf8; text-decoration: none;">${cleanPhone}</a></div>
      </div>
      <div class="field-card">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${cleanEmail}" style="color: #38bdf8; text-decoration: none;">${cleanEmail}</a></div>
      </div>
      <div class="field-card">
        <div class="label">Ganacsiga / Shirkadda (Company)</div>
        <div class="value">${cleanCompanyName}</div>
      </div>
      <div class="field-card">
        <div class="label">Adeegga La Doortay (Selected Service)</div>
        <div class="value service-highlight">${cleanService}</div>
      </div>
      <div class="field-card">
        <div class="label">Habka Xiriirka Ugu Habboon (Preferred Contact)</div>
        <div class="value">${cleanPreferredContact}</div>
      </div>
      <div class="field-card">
        <div class="label">Faahfaahinta Mashruuca (Project Details)</div>
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

    // Store in internal audit log
    const storedRecord: StoredRequest = {
      id: submissionId,
      type: 'service-request',
      fullName: cleanFullName,
      phone: cleanPhone,
      email: cleanEmail,
      companyName: cleanCompanyName,
      service: cleanService,
      projectDetails: cleanProjectDetails,
      preferredContact: cleanPreferredContact,
      submittedAt: `${submissionDate} ${submissionTime}`,
      ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress,
      status: 'delivered',
    };
    submissionsLog.push(storedRecord);

    // Send email via Resend
    const resend = getResend();
    if (resend) {
      try {
        // Prepare valid options matching Resend requirements
        const sendOptions: any = {
          from: 'onboarding@resend.dev',
          to: 'horyaalgrowth@gmail.com',
          subject: emailSubject,
          text: emailTextBody,
          html: emailHtmlBody,
        };

        if (isValidEmail(cleanEmail)) {
          sendOptions.replyTo = cleanEmail;
        }

        const sendResult = await resend.emails.send(sendOptions);

        if (sendResult?.error) {
          console.error('[RESEND DISPATCH ERROR]:', sendResult.error);
          if (sendOptions.replyTo) {
            delete sendOptions.replyTo;
            await resend.emails.send(sendOptions);
            console.log(`[RESEND RECOVERY] Sent without replyTo to ${targetEmail}`);
          }
        } else {
          console.log(`[RESEND SUCCESS] Sent service request ${submissionId} to ${targetEmail}`);
        }
      } catch (mailError) {
        console.error('[RESEND EXCEPTION]:', mailError);
      }
    } else {
      console.log('====================================================');
      console.log(`[LOCAL LOG - RESEND NOT CONFIGURED] Target: ${targetEmail}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(emailTextBody);
      console.log('====================================================');
    }

    return res.json({
      success: true,
      message: 'Dalabkaaga si guul leh ayaa loo diray. Horyaal Digital Agency ayaa kula soo xiriiri doonta sida ugu dhakhsaha badan.',
      submissionId,
      service: cleanService,
      submittedAt: `${submissionDate} at ${submissionTime}`,
      deliveredTo: targetEmail,
    });
  } catch (error) {
    console.error('Service request processing error:', error);
    return res.status(500).json({
      success: false,
      message: 'Dalabka lama diri karin. Fadlan mar kale isku day ama nala soo xiriir telefoonka 612141414.',
    });
  }
});

// CONTACT FORM API
app.post('/api/contact', rateLimiter, async (req: Request, res: Response) => {
  try {
    const { fullName, phone, email, company, service, message, honeypot } = req.body;

    if (honeypot) {
      return res.json({
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
    const senderEmail = process.env.EMAIL_FROM && isValidEmail(process.env.EMAIL_FROM)
      ? `Horyaal Digital Agency <${process.env.EMAIL_FROM.trim()}>`
      : 'Horyaal Digital Agency <onboarding@resend.dev>';

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
        <div class="label">Magaca (Full Name)</div>
        <div class="value">${cleanFullName}</div>
      </div>
      <div class="field-card">
        <div class="label">Telefoonka (Phone)</div>
        <div class="value">${cleanPhone || 'Lama sheegin'}</div>
      </div>
      <div class="field-card">
        <div class="label">Email Address</div>
        <div class="value">${cleanEmail || 'Lama sheegin'}</div>
      </div>
      <div class="field-card">
        <div class="label">Shirkadda (Company)</div>
        <div class="value">${cleanCompany}</div>
      </div>
      <div class="field-card">
        <div class="label">Adeegga / Mawduuca</div>
        <div class="value" style="color: #d4af37;">${cleanService}</div>
      </div>
      <div class="field-card">
        <div class="label">Farriinta (Message)</div>
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

    submissionsLog.push({
      id: `CT-${Date.now().toString(36).toUpperCase()}`,
      type: 'contact',
      fullName: cleanFullName,
      phone: cleanPhone,
      email: cleanEmail,
      companyName: cleanCompany,
      service: cleanService,
      projectDetails: cleanMessage,
      preferredContact: cleanPhone ? 'Phone' : 'Email',
      submittedAt: `${submissionDate} ${submissionTime}`,
      status: 'delivered',
    });

    const resend = getResend();
    if (resend) {
      try {
        const sendOptions: any = {
          from: 'onboarding@resend.dev',
          to: 'horyaalgrowth@gmail.com',
          subject: emailSubject,
          text: emailTextBody,
          html: emailHtmlBody,
        };

        if (cleanEmail && isValidEmail(cleanEmail)) {
          sendOptions.replyTo = cleanEmail;
        }

        const sendResult = await resend.emails.send(sendOptions);
        if (sendResult?.error) {
          console.error('[RESEND CONTACT ERROR]:', sendResult.error);
          if (sendOptions.replyTo) {
            delete sendOptions.replyTo;
            await resend.emails.send(sendOptions);
          }
        } else {
          console.log(`[RESEND SUCCESS] Sent contact message to ${targetEmail}`);
        }
      } catch (err) {
        console.error('[RESEND ERROR]:', err);
      }
    } else {
      console.log(`[CONTACT LOG] Target: ${targetEmail}, Subject: ${emailSubject}`);
      console.log(emailTextBody);
    }

    return res.json({
      success: true,
      message: 'Farriintaada si guul leh ayaa loo diray. Horyaal Digital Agency ayaa kula soo xiriiri doonta sida ugu dhakhsaha badan.',
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Dalabka lama diri karin. Fadlan mar kale isku day ama nala soo xiriir telefoonka 612141414.',
    });
  }
});

// START SERVER AND VITE MIDDLEWARE
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Horyaal Digital Agency Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
