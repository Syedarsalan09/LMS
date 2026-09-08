import { Link } from "react-router-dom";

const Home = ({ books, loadingBooks }) => {
  const featuredBooks = books.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="container py-5">
        <div className="row align-items-center g-5">

          <div className="col-lg-6">
            <h1 className="display-5 fw-bold">
              📚 Library Management System
            </h1>

            <p className="lead text-muted mt-3">
              Manage, issue and explore books with a modern Library
              Management System built for students and administrators.
            </p>

            <div className="mt-4">
              <Link
                to="/books"
                className="btn btn-primary btn-lg me-3"
              >
                Browse Books
              </Link>

              <Link
                to="/dashboard"
                className="btn btn-outline-dark btn-lg"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="col-lg-6 text-center">
     <img
  src="/images/library-hero.jpg"
  alt="Library"
  className="img-fluid rounded shadow"
  style={{
    maxWidth: "550px",
    width: "100%",
    height: "360px",
    objectFit: "cover",
  }}
/>        <div className="col-lg-6 d-flex justify-content-center">

</div>
          </div>

        </div>
      </section>

      {/* Featured Books */}

      <section className="container py-5">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Featured Books
          </h2>

          <p className="text-muted">
            Latest books available in the library.
          </p>
        </div>

        <div className="row">

         {loadingBooks ? (

  <div className="text-center py-5">
    <div
      className="spinner-border text-primary"
      role="status"
    >
      <span className="visually-hidden">
        Loading...
      </span>
    </div>

    <p className="mt-3">Loading featured books...</p>
  </div>

) : featuredBooks.length === 0 ? (

  <div className="text-center">
    <p className="fs-5 text-muted">
      Please log in to browse the library collection.
    </p>

    <Link
      to="/login"
      className="btn btn-primary mt-2"
    >
      Login to View Books
    </Link>
  </div>


          ) : (

            featuredBooks.map((book) => (

              <div
                className="col-lg-3 col-md-6 mb-4"
                key={book._id}
              >

                <div className="card shadow h-100">

                  <img
                    src={
  book.coverImage
    ? `http://localhost:5000${book.coverImage}`
    : "/images/default-book.jpg"
}
                    alt={book.title}
                    className="card-img-top"
                    style={{
  height: "250px",
  width: "100%",
  objectFit: "cover",
  backgroundColor: "#f8f9fa",
}}
                  />

                  <div className="card-body">

                    <h5>{book.title}</h5>

                    <p className="text-muted">
                      {book.author}
                    </p>

                    <p>
                      <span className="badge bg-primary">
                        {book.category}
                      </span>
                    </p>

                    <p>
                      Available:{" "}
                      <strong>
                        {book.availableCopies}
                      </strong>
                    </p>

                    <Link
                      to={`/books/${book._id}`}
                      className="btn btn-outline-primary w-100"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </section>
    </>
  );
};

export default Home;