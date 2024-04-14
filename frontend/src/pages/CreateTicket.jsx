import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketsSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const CreateTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/my-tickets");
    }

    dispatch(reset());
  }, [navigate, isError, isSuccess, dispatch, message]);

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [ticketForm, setTicketForm] = useState({
    product: "Windows",
    description: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTicket(ticketForm));

    setTicketForm({
      product: "",
      description: "",
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>What problem can we help you solve today?</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="email" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={ticketForm.product}
              onChange={(e) =>
                setTicketForm({ ...ticketForm, product: e.target.value })
              }
            >
              <option value="Windows">Windows</option>
              <option value="Apple">Apple</option>
              <option value="Linux">Linux</option>
              <option value="Android">Android</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of Problem</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={ticketForm.description}
              placeholder="The issue I am having..."
              onChange={(e) =>
                setTicketForm({ ...ticketForm, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
      <br />
      <br />
    </>
  );
};

export default CreateTicket;
