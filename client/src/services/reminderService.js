import api from "./api";

// ===============================
// Send Reminder Emails
// ===============================
export const sendReminderEmails = async () => {
  const response = await api.post(
    "/reminders/send"
  );

  return response.data;
};