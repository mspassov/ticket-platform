import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>Welcome to the ticketing platform!</h1>
        <p>Create a ticket to get your questions answered</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create a new ticket
      </Link>
      <Link to="/my-tickets" className="btn btn-block">
        <FaTicketAlt /> View submitted tickets
      </Link>
    </>
  );
};

export default Home;
