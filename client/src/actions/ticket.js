import axios from "axios";

import { setAlert } from "./alert";
import {
  GET_TICKETS,
  GET_TICKETS_ERROR,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
  GET_TICKET,
  TICKET_ERROR,
  ADD_REPLY,
  UPDATE_TICKET_STATUS,
} from "./types";

export const getTickets = () => async (dispatch) => {
  try {
    //const res = await axios.get("https://mernapp-backendapp.herokuapp.com/api/ticket/");
    const res = await axios.get(
      "https://filthy-plum-shrug.cyclic.app/api/ticket/"
    );

    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TICKETS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//create ticket
export const createTicket =
  ({ ticket_issue, priority, req_category, desc }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ ticket_issue, priority, req_category, desc });

    try {
      const res = await axios.post(
        //"https://mernapp-backendapp.herokuapp.com/api/ticket",
        "https://filthy-plum-shrug.cyclic.app/api/ticket/",
        body,
        config
      );
      dispatch({
        type: CREATE_TICKET_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("Ticket Created Successfully", "success"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: CREATE_TICKET_FAIL,
      });
    }
  };

// Get ticket by id
export const getTicket = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      //`https://mernapp-backendapp.herokuapp.com/api/ticket/${id}`
      `https://filthy-plum-shrug.cyclic.app/api/ticket/${id}`
    );
    dispatch({
      type: GET_TICKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add comment
export const addReply = (ticketId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      //`https://mernapp-backendapp.herokuapp.com/api/ticket/conversation/${ticketId}`,
      `https://filthy-plum-shrug.cyclic.app/api/ticket/conversation/${ticketId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_REPLY,
      payload: res.data,
    });

    dispatch(setAlert("Reply Added", "success"));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Ticket Status
export const updateStatus = (ticketId, status) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ status });

  try {
    const res = await axios.put(
      //`https://mernapp-backendapp.herokuapp.com/api/ticket/updateticket/${ticketId}`,
      `https://filthy-plum-shrug.cyclic.app/api/ticket/updateticket/${ticketId}`,
      body,
      config
    );
    dispatch({
      type: UPDATE_TICKET_STATUS,
      payload: res.data,
    });
    dispatch(setAlert("Ticket status updated Successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: TICKET_ERROR,
    });
  }
};
