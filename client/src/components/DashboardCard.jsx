const DashboardCard = ({ title, value, color }) => {
  return (
    <div className="col-md-3 mb-4">

      <div
        className={`card text-center border-${color} shadow-lg border-0`}
        style={{
          borderRadius: "20px",
          transition: "0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-5px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >

        <div className="card-body">

          <h5 className={`text-${color}`}>
            {title}
          </h5>

          <h1 className="display-4 fw-bold">
            {value}
          </h1>

        </div>

      </div>

    </div>
  );
};

export default DashboardCard;