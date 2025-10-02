const nodemailer = require("nodemailer");
const crypto = require("crypto");

class EmailService {
  constructor() {
    // Configure your email provider here
    // For development, you can use Gmail or any SMTP service
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password (not regular password)
      },
    });
  }

  // Generate verification token
  generateVerificationToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  // Create verification email HTML template
  createVerificationEmailHTML(name, verificationUrl) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - TaskMaster</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .email-container {
                background: white;
                border-radius: 16px;
                padding: 40px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            .logo {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                border-radius: 12px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .title {
                color: #1f2937;
                font-size: 28px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 10px;
            }
            .subtitle {
                color: #6b7280;
                text-align: center;
                font-size: 16px;
                margin-bottom: 30px;
            }
            .content {
                font-size: 16px;
                margin-bottom: 30px;
            }
            .verify-btn {
                display: inline-block;
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                color: white;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: 12px;
                font-weight: 600;
                font-size: 16px;
                text-align: center;
                width: 100%;
                box-sizing: border-box;
                margin: 20px 0;
                transition: transform 0.2s;
            }
            .verify-btn:hover {
                transform: translateY(-2px);
            }
            .footer {
                text-align: center;
                color: #9ca3af;
                font-size: 14px;
                border-top: 1px solid #e5e7eb;
                padding-top: 30px;
                margin-top: 40px;
            }
            .warning {
                background: #fef3cd;
                border: 1px solid #fbbf24;
                color: #92400e;
                padding: 15px;
                border-radius: 8px;
                font-size: 14px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="logo">
                <div class="logo-icon">TM</div>
                <h1 class="title">Welcome to TaskMaster!</h1>
                <p class="subtitle">Professional Task Management Platform</p>
            </div>
            
            <div class="content">
                <p>Hi <strong>${name}</strong>,</p>
                
                <p>Thank you for registering with TaskMaster! We're excited to have you on board.</p>
                
                <p>To complete your registration and start managing your tasks, please verify your email address by clicking the button below:</p>
                
                <a href="${verificationUrl}" class="verify-btn">
                    ✅ Verify My Email Address
                </a>
                
                <p>Once verified, you'll have access to all TaskMaster features:</p>
                <ul>
                    <li>📝 Create and manage tasks</li>
                    <li>📊 Track your progress</li>
                    <li>🎯 Set priorities and deadlines</li>
                    <li>📱 Access from any device</li>
                </ul>
                
                <div class="warning">
                    ⚠️ <strong>Security Note:</strong> This verification link will expire in 24 hours for your security. If you didn't create this account, please ignore this email.
                </div>
            </div>
            
            <div class="footer">
                <p>© 2025 TaskMaster. All rights reserved.</p>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #4f46e5;">${verificationUrl}</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  // Send verification email
  async sendVerificationEmail(email, name, verificationToken) {
    try {
      const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
      const verificationUrl = `${backendUrl}/api/v1/auth/verify-email/${verificationToken}`;

      const mailOptions = {
        from: `"TaskMaster" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🎉 Welcome to TaskMaster - Please verify your email",
        html: this.createVerificationEmailHTML(name, verificationUrl),
        text: `
Hi ${name},

Welcome to TaskMaster! Please verify your email address by clicking this link:
${verificationUrl}

This link will expire in 24 hours.

If you didn't create this account, please ignore this email.

Best regards,
TaskMaster Team
        `,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending verification email:", error);
      return { success: false, error: error.message };
    }
  }

  // Send welcome email after verification
  async sendWelcomeEmail(email, name) {
    try {
      const mailOptions = {
        from: `"TaskMaster" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🚀 Your account is verified! Welcome to TaskMaster",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4f46e5;">🎉 Account Verified Successfully!</h1>
          <p>Hi ${name},</p>
          <p>Congratulations! Your TaskMaster account has been successfully verified.</p>
          <p>You can now log in and start managing your tasks efficiently.</p>
          <p><a href="${
            process.env.FRONTEND_URL || "http://localhost:3000"
          }/login" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Start Using TaskMaster</a></p>
          <p>Best regards,<br>TaskMaster Team</p>
        </div>
        `,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("Welcome email sent successfully:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();
