/**
 * OTP Service
 * Handles OTP generation, storage, and verification
 */

// Generate a 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// OTP expiry time (5 minutes)
export const getOTPExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
};

// Verify if OTP is still valid (not expired)
export const isOTPValid = (expiryTime) => {
  return new Date() < new Date(expiryTime);
};

// Mock SMS sending function
// In production, integrate with SMS gateway like Twilio, AWS SNS, etc.
export const sendOTPviaSMS = async (phone, otp) => {
  console.log(`
╔═══════════════════════════════════════════╗
║           OTP SENT (MOCK)                ║
╠═══════════════════════════════════════════╣
║  Phone: ${phone}                    ║
║  OTP Code: ${otp}                         ║
║  Valid for: 5 minutes                    ║
╚═══════════════════════════════════════════╝
  `);
  
  // In production, replace this with actual SMS API call:
  // const client = twilio(accountSid, authToken);
  // await client.messages.create({
  //   body: `Your Swaasthyam OTP is: ${otp}. Valid for 5 minutes.`,
  //   from: '+1234567890',
  //   to: phone
  // });
  
  return true;
};

export default {
  generateOTP,
  getOTPExpiry,
  isOTPValid,
  sendOTPviaSMS
};

