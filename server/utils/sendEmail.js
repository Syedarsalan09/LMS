import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const user = process.env.EMAIL_USER?.trim();
  const password = process.env.EMAIL_PASS?.trim();

  if (!user || !password) {
    const error = new Error(
      "Password reset email is not configured. Set EMAIL_USER and EMAIL_PASS on the server."
    );
    error.code = "EMAIL_CONFIG_MISSING";
    throw error;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass: password,
    },
  });

  await transporter.sendMail({
    from: user,
    to,
    subject,
    text,
  });
};

export default sendEmail;