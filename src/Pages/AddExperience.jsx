import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { localTokenKey } from '../constants';

const AddExperience = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const navigate = useNavigate()
   const GoBack = () => {
     navigate("/dashboard");
   };
  const Submit = (e) => {
    e.preventDefault()

    axios.put("/profile/experience" , {
      title,
      company,
      from,
      to
    })

    localStorage.getItem(localTokenKey)


  }

  return (
    <div className="d-grid justify-content-center my-5">
      <h1 className="text-info">Add An Experience</h1>
      <h4>
        {" "}
        Add any developer/programming positions that you have had in the past
      </h4>
      <small>* = required field</small>

      <form onSubmit={Submit} className="my-3">
        <input
          className="form-control my-3"
          type="text"
          placeholder="* Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="form-control my-3"
          type="text"
          placeholder="* Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="form-control my-3"
          type="text"
          placeholder="Location"
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
          <span>Current Job</span>
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
          placeholder="Job Description"
        ></textarea>
        <div className="d-flex gap-3 my-3">
          <button className="btn btn-info">Submit</button>
          <button className="btn btn-light" onClick={GoBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
}

export default AddExperience