import { transporter } from "./mailer";

export async function sendApprovalEmail(booking) {
  const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #042f24; color: #ffffff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #064e3b; border-radius: 12px; overflow: hidden; border: 1px solid #FFD9BE; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #064e3b 0%, #0c614b 100%); padding: 30px 20px; text-align: center; border-bottom: 2px solid #FFD9BE; }
        .logo { font-size: 26px; font-weight: bold; color: #FFD9BE; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
        .tagline { font-size: 11px; color: #e2ece9; letter-spacing: 3px; margin-top: 5px; text-transform: uppercase; }
        .content { padding: 30px 25px; }
        .status-badge { display: inline-block; background-color: #10b981; color: #064e3b; font-weight: bold; font-size: 13px; padding: 6px 16px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
        h2 { color: #FFD9BE; margin-top: 0; font-size: 22px; }
        p { color: #e2ece9; font-size: 15px; line-height: 1.6; margin-bottom: 15px; }
        .details-card { background-color: rgba(255, 217, 190, 0.08); border-left: 4px solid #FFD9BE; padding: 20px; border-radius: 6px; margin: 25px 0; }
        .detail-label { color: #FFD9BE; font-weight: 600; font-size: 14px; }
        .detail-val { color: #ffffff; font-size: 14px; text-align: right; }
        .message-box { background-color: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; padding: 15px; text-align: center; margin-top: 25px; }
        .message-box p { color: #ffffff; margin: 0; font-weight: 500; }
        .footer { background-color: #03241b; text-align: center; padding: 20px; font-size: 13px; color: #889e98; border-top: 1px solid rgba(255, 217, 190, 0.1); }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Tailors2U</div>
          <div class="tagline">MEASURE | CRAFT | DELIVER</div>
        </div>
        <div class="content">
          <div class="status-badge">Status: CONFIRMED</div>
          <h2>Appointment Confirmed!</h2>
          <p>Hello <strong>${booking.name}</strong>,</p>
          <p>We are delighted to inform you that your appointment request with <strong>Tailors2U</strong> has been approved!</p>
          
          <div class="details-card">
            <table width="100%" cellpadding="6" cellspacing="0">
              <tr>
                <td class="detail-label">Booking ID</td>
                <td class="detail-val" style="font-family: monospace;">${booking.id}</td>
              </tr>
              <tr>
                <td class="detail-label">Service</td>
                <td class="detail-val"><strong>${booking.service}</strong></td>
              </tr>
              <tr>
                <td class="detail-label">Date</td>
                <td class="detail-val">${formattedDate}</td>
              </tr>
              <tr>
                <td class="detail-label">Time</td>
                <td class="detail-val">${booking.time}</td>
              </tr>
              <tr>
                <td class="detail-label">Doorstep Address</td>
                <td class="detail-val">${booking.address || "Not provided"}</td>
              </tr>
              ${booking.notes ? `
              <tr>
                <td class="detail-label">Notes</td>
                <td class="detail-val">${booking.notes}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div class="message-box">
            <p>Your appointment has been confirmed. Our executive will arrive at the scheduled time. Thank you for choosing Tailors2U.</p>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Tailors2U. All rights reserved.<br/>
          Bespoke Doorstep Tailoring & Premium Alterations
        </div>
      </div>
    </body>
    </html>
  `;

  return await transporter.sendMail({
    from: `"Tailors2U" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: `✅ Appointment Confirmed - Tailors2U (${booking.service})`,
    html,
  });
}

export async function sendRejectionEmail(booking, reason) {
  const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #042f24; color: #ffffff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #064e3b; border-radius: 12px; overflow: hidden; border: 1px solid #FFD9BE; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #064e3b 0%, #0c614b 100%); padding: 30px 20px; text-align: center; border-bottom: 2px solid #FFD9BE; }
        .logo { font-size: 26px; font-weight: bold; color: #FFD9BE; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
        .tagline { font-size: 11px; color: #e2ece9; letter-spacing: 3px; margin-top: 5px; text-transform: uppercase; }
        .content { padding: 30px 25px; }
        .status-badge { display: inline-block; background-color: #ef4444; color: #ffffff; font-weight: bold; font-size: 13px; padding: 6px 16px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
        h2 { color: #FFD9BE; margin-top: 0; font-size: 22px; }
        p { color: #e2ece9; font-size: 15px; line-height: 1.6; margin-bottom: 15px; }
        .reason-box { background-color: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: 8px; padding: 18px; margin: 20px 0; }
        .reason-title { color: #fca5a5; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .reason-text { color: #ffffff; font-size: 15px; margin: 0; line-height: 1.5; }
        .footer { background-color: #03241b; text-align: center; padding: 20px; font-size: 13px; color: #889e98; border-top: 1px solid rgba(255, 217, 190, 0.1); }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Tailors2U</div>
          <div class="tagline">MEASURE | CRAFT | DELIVER</div>
        </div>
        <div class="content">
          <div class="status-badge">Status: REJECTED</div>
          <h2>Appointment Update</h2>
          <p>Hello <strong>${booking.name}</strong>,</p>
          <p>Unfortunately we couldn't confirm your appointment scheduled for <strong>${formattedDate}</strong> at <strong>${booking.time}</strong>.</p>
          
          <div class="reason-box">
            <div class="reason-title">Reason for Rejection</div>
            <div class="reason-text">${reason}</div>
          </div>

          <p>Please book another available slot or contact us if you have any questions.</p>
          
          <p style="margin-top: 30px; font-weight: bold; color: #FFD9BE;">Tailors2U Team</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Tailors2U. All rights reserved.<br/>
          Bespoke Doorstep Tailoring & Premium Alterations
        </div>
      </div>
    </body>
    </html>
  `;

  return await transporter.sendMail({
    from: `"Tailors2U" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: `Appointment Update - Tailors2U`,
    html,
  });
}
