import React from "react";
import { Link } from "react-router-dom";

const TicketItem = ({ data }) => {
  return (
    <div className="ticket">
      <div>{new Date(data.createdAt).toLocaleDateString("en-US")}</div>
      <div>{data.product}</div>
      <div className={`status status-${data.status}`}>{data.status}</div>
      <Link to={`/my-tickets/${data._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
};

export default TicketItem;
