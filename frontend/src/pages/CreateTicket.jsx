import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CreateTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [ticketForm, setTicketForm] = useState({
    product: "",
    description: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(ticketForm);

    setTicketForm({
      product: "",
      description: "",
    });
  };

  return (
    <>
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
    </>
  );
};

export default CreateTicket;
