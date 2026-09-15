import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'ok',
    environment: 'Vercel Serverless',
    agency: 'Horyaal Digital Agency (HD)',
    destinationEmail: 'horyaalgrowth@gmail.com',
    phone: '612141414',
    timestamp: new Date().toISOString(),
  });
}
