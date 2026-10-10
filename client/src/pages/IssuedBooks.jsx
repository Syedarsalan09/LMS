import { useEffect, useState, useCallback } from "react";
import { getAllIssues } from "../services/issueService";

const IssuedBooks = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadIssues = useCallback(async () => {
    try {
      const data = await getAllIssues();
      setIssues(data.issues);
    } catch (error) {
      console.error(error);
      alert("Failed to load issued books.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadIssues();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadIssues]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading issued books...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        📖 Issued Books
      </h2>

      {issues.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No issue history found.</h4>
        </div>
      ) : (
        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Fine</th>
              </tr>
            </thead>

            <tbody>

              {issues.map((issue) => {

                const book =
                  issue.book ||
                  issue.bookSnapshot;

                return (
                  <tr key={issue._id}>

                    <td>
                      {issue.user?.name ||
                        "Deleted User"}
                    </td>

                    <td>
                      {issue.user?.email || "-"}
                    </td>

                    <td>

                      {book ? (
                        <>
                          <strong>
                            {book.title}
                          </strong>

                          {!issue.book && (
                            <span className="badge bg-secondary ms-2">
                              Deleted
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-danger">
                          Unknown Book
                        </span>
                      )}

                    </td>

                    <td>
                      {formatDate(
                        issue.issueDate
                      )}
                    </td>

                    <td>
                      {formatDate(
                        issue.dueDate
                      )}
                    </td>

                    <td>
                      {formatDate(
                        issue.returnDate
                      )}
                    </td>

                    <td>

                      {issue.status ===
                      "issued" ? (
                        <span className="badge bg-warning text-dark">
                          Issued
                        </span>
                      ) : (
                        <span className="badge bg-success">
                          Returned
                        </span>
                      )}

                    </td>

                    <td>

                      {issue.fine > 0 ? (
                        <span className="fw-bold text-danger">
                          ₹{issue.fine}
                        </span>
                      ) : (
                        <span className="text-success">
                          ₹0
                        </span>
                      )}

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default IssuedBooks;