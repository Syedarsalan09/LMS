import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const getAdminCredentials = () => ({
  email: (process.env.ADMIN_EMAIL || "admin@library.com").trim().toLowerCase(),
  password: process.env.ADMIN_PASSWORD || "Admin@123",
});

const ensureAdminUserExists = async () => {
  const { email, password } = getAdminCredentials();

  let adminUser = await User.findOne({ email });

  if (!adminUser) {
    adminUser = await User.create({
      name: "Admin",
      email,
      password: await bcrypt.hash(password, 10),
      role: "admin",
    });
  }

  return adminUser;
};

// ===============================
// Register User
// ===============================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student account
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "student",
    });

    res.status(201).json({
      message: "Registration Successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Login User
// ===============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const { email: adminEmail } = getAdminCredentials();

    let user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user && normalizedEmail === adminEmail) {
      user = await ensureAdminUserExists();
    }

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Change Password
// ===============================
export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New passwords do not match.",
      });
    }

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Forgot Password
// ===============================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        message: "Please enter your email.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = await User.findOne({
      email: normalizedEmail,
    });

    const { email: adminEmail } = getAdminCredentials();
    if (!user && normalizedEmail === adminEmail) {
      user = await ensureAdminUserExists();
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const clientUrl = process.env.CLIENT_URL?.trim().replace(/\/+$/, "");
    if (!clientUrl) {
      return res.status(500).json({
        message: "Password reset is not configured. Set CLIENT_URL on the server.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${clientUrl}/reset-password/${resetToken}`;

    try {
      await sendEmail(
        user.email,
        "Password Reset",
        `Click the following link to reset your password:\n\n${resetLink}\n\nThis link expires in 15 minutes.`
      );
    } catch (error) {
      console.error("Password reset email delivery failed:", error.code || "unknown error");

      if (process.env.NODE_ENV === "development") {
        return res.status(200).json({
          message:
            "Email delivery failed in development. Use the reset link below; it expires in 15 minutes.",
          resetLink,
        });
      }

      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      if (error.code === "EAUTH") {
        return res.status(502).json({
          message:
            "The email service could not authenticate. Check EMAIL_USER and EMAIL_PASS; Gmail requires an App Password.",
        });
      }

      if (error.code === "EMAIL_CONFIG_MISSING") {
        return res.status(500).json({
          message: error.message,
        });
      }

      return res.status(502).json({
        message: "Unable to send the password reset email. Check the server email configuration and try again.",
      });
    }

    res.status(200).json({
      message: "Password reset email sent successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Reset Password
// ===============================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token.",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};