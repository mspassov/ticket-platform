import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import { getTicket, closeTicket } from "../features/tickets/ticketsSlice";
import {
  getNotes,
  createNote,
  reset as notesReset,
} from "../features/notes/noteSlice";
import { toast } from "react-toastify";

const Ticket = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.note
  );

  const customStyles = {
    content: {
      width: "600px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      position: "relative",
    },
  };

  Modal.setAppElement("#root");

  const params = useParams();
  const ticketId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(params.id));
    dispatch(getNotes(params.id));
  }, [isError, message, params]);

  const handleClose = () => {
    dispatch(closeTicket(params.id));
    toast.success("Ticket succcessfully resolved");
    navigate("/my-tickets");
  };

  const toggleModal = () => {
    if (!modalOpen) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    console.log(noteText, " ", ticketId);
    dispatch(createNote({ noteText, ticketId }));

    setNoteText("");
    toggleModal();
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong!</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/my-tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted:{" "}
          {new Date(ticket.createdAt).toLocaleDateString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue:</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes:</h2>
      </header>

      {ticket.status !== "closed" && (
        <button className="btn" onClick={toggleModal}>
          <FaPlus />
          Notes
        </button>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Add note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={toggleModal}>
          X
        </button>
        <form onSubmit={handleNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Description..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "Resolved" && (
        <button onClick={handleClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
