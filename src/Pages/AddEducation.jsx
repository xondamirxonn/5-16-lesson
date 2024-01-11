import axios from "axios";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { localTokenKey } from "../constants";

const AddEducation = () => {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldofstudy, setFieldofstudy] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();
  const GoBack = () => {
    navigate("/dashboard")
  }
  const EduSubmit = (e) => {
    e.preventDefault();

    axios.put("/profile/education", {
      school,
      degree,
      fieldofstudy,
      from,
      to,
    });

    localStorage.getItem(localTokenKey);

  };


  return (
    <div className="d-grid justify-content-center my-5">
      <h1 className="text-info">Add Your Education</h1>
      <h4> Add any school or bootcamp that you have attended</h4>
      <small>* = required field</small>

      <form onSubmit={EduSubmit} className="my-3">
        <input
          className="form-control my-3"
          type="text"
          placeholder="* School or Bootcamp"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <input
          className="form-control my-3"
          type="text"
          placeholder="* Degree or Study"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
        <input
          className="form-control my-3"
          type="text"
          placeholder="Field of Study"
          value={fieldofstudy}
          onChange={(e) => setFieldofstudy(e.target.value)}
        />
        <label>From Date</label>
        <input
          className="form-control my-3"
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <div>
          <input className="form-check-input" type="checkbox" />{" "}
          <span>Current School</span>
        </div>{" "}
        <label className="my-3">To Date</label>
        <input
          className="form-control "
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <textarea
          className="form-control my-3"
          placeholder="Program Description"
        ></textarea>
        <div className="d-flex gap-3 my-3">
          <button className="btn btn-info">Submit</button>
          <button className="btn btn-light" onClick={GoBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
};

export default AddEducation;
