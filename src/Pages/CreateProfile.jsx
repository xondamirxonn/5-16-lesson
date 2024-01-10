import React, { useState } from "react";
import { localTokenKey, reqTokenHederKey } from "../constants";
import axios from "axios";

function CreateProfile() {
  const token = localStorage.getItem(localTokenKey);

  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [githubusername, setGithubusername] = useState("");
  const [bio, setBio] = useState("");
  const FormSubmit = (e) => {
    e.preventDefault();

    axios.post(
      "/profile",
      {
        status,
        company,
        website,
        location,
        skills,
        githubusername,
        bio,
      },

      localStorage.getItem(localTokenKey)
    );
  };

  return (
    <div className="d-grid justify-content-center my-3">
      <h1>Create Your Profile</h1>
      <h3> Let's get some information to make your</h3>

      <span>* = required field</span>

      <form onSubmit={FormSubmit} className=" my-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-select"
        >
          <option selected disabled>
            * Selected professional Status
          </option>
          <option>Developer</option>
          <option>Junior Developer</option>
          <option>Senior Developer</option>
          <option>Manager</option>
          <option>Student of Learning</option>
          <option>Instructor of Teacher</option>
          <option>Intern</option>
          <option>Other</option>
        </select>
        <small>Give us an idea of where you are at in your career</small>
        <input
          className="form-control my-2"
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        Could be your own company or one you work for
        <small>Could be your own company or one you work for</small>
        <input
          className="form-control my-2"
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <small>Could be your own or a company website</small>
        <input
          className="form-control my-2"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <small>City & state suggested (eg. Boston, MA)</small>
        <input
          className="form-control my-2"
          type="text"
          placeholder="* Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <small>
          Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
        </small>
        <input
          className="form-control my-2"
          type="text"
          placeholder="Github Username"
          value={githubusername}
          onChange={(e) => setGithubusername(e.target.value)}
        />
        <small>
          If you want your latest repos and a Github link, include your username
        </small>
        <textarea
          className="form-control my-2"
          placeholder="A short bio of yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        Tell us a little about yourself
        <div className="my-3 d-flex gap-3">
          <button  className="btn btn-info">Submit</button>
          <button className="btn btn-light">Go back</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProfile;
