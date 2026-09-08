import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    // Student who borrowed the book
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Current Book Reference
    // (May become null if admin deletes the book)
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    // Permanent snapshot of the book
    // Used for issue history even after deletion
    bookSnapshot: {
      title: {
        type: String,
        default: "",
      },

      author: {
        type: String,
        default: "",
      },

      category: {
        type: String,
        default: "",
      },

      publisher: {
        type: String,
        default: "",
      },

      publishedYear: {
        type: Number,
      },

      isbn: {
        type: String,
        default: "",
      },

      coverImage: {
        type: String,
        default: "",
      },
    },

    // Issue Date
    issueDate: {
      type: Date,
      default: Date.now,
    },

    // Due Date
    dueDate: {
      type: Date,
      required: true,
    },

    // Return Date
    returnDate: {
      type: Date,
      default: null,
    },

    // Fine
    fine: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Current Status
    status: {
      type: String,
      enum: ["issued", "returned"],
      default: "issued",
    },
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;