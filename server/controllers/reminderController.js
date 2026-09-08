import Issue from "../models/Issue.js";
import nodemailer from "nodemailer";

// ===============================
// Send Due Date Reminder Emails
// ===============================
export const sendReminderEmails = async (req, res) => {
  try {
    const issues = await Issue.find({
  status: "issued",
})
  .populate("user")
  .populate("book");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },    
    });

    let sent = 0;

    for (const issue of issues) {
      const dueDate = new Date(issue.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const diff =
        dueDate.getTime() - today.getTime();

      const daysLeft = Math.ceil(
        diff / (1000 * 60 * 60 * 24)
      );


    if (daysLeft >= 0 && daysLeft <= 2) {

    await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: issue.user.email,
    subject: "Library Reminder",
    html: `
      <h2>Hello ${issue.user.name},</h2>

      <p>
        This is a reminder that your borrowed book
        <strong>${issue.book.title}</strong>
        is due on
        <strong>${dueDate.toDateString()}</strong>.
      </p>

      <p>
        Please return it before the due date.
      </p>

      <br/>

      <p>
        Library Management System
      </p>
    `,
  });

  sent++;
}

    }

    res.status(200).json({
      message: `${sent} reminder email(s) sent successfully.`,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};