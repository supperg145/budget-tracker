import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content">
        <h1>Budget Tracker</h1>
        <div className="buttons">
          <Button variant="primary" as={Link} to="/login">
            Login
          </Button>
          <Button>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
