import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-not-found center_content">
      <div>
        <h1>Page not found!</h1>
        <p>
          Sorry, requested page doesn't exist. Please go to <mark>Home</mark>{" "}
          page.
        </p>
        <Link className="btn btn-info" to="/home">
          Home page
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
