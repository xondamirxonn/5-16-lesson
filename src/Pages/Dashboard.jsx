import { Button, Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { localTokenKey, reqTokenHederKey } from "../constants";
import axios from "axios";

const Dashboard = () => {
  // const token = localStorage.getItem(localTokenKey);
  const navigate = useNavigate();
  const CreateProfiles = () => {
    navigate("/create-profile");
  };

  const AddExperience = () => {
    navigate("/add-exp");
  };

  const AddEducation = () => {
    navigate("/add-edu");
  };
  const DeleteMyAccount = () => {
    axios.delete("/profile", localStorage.getItem(localTokenKey));

    localStorage.removeItem(localTokenKey);
    navigate("/login");
  };

  const DeleteExp = () => {
    axios.delete(`/profile/experience/${exp._id}`)
  }
  const user = useSelector((store) => store.user);
  const { data: profile, isLoading } = useFetch("/profile/me");
  console.log(profile);
  return isLoading ? (
    <div className="d-flex justify-content-between">
      <Spinner animation="border" variant="primary" />
    </div>
  ) : profile ? (
    <div className="p-3">
      <h1 className="text-info display-1 fw-bold">Dashboard</h1>
      <h1>Welocome {user.name} </h1>
      <div className="d-flex gap-3">
        <button className="btn btn-light">Edit Profile</button>
        <button onClick={AddExperience} className="btn btn-light">
          Add Experience
        </button>
        <button onClick={AddEducation} className="btn btn-light">
          Add Education
        </button>
      </div>
      <table className="table table-bordered table-hover w-75 text-center my-4">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {profile.experience.map((exp) => {
            return (
              <tr key={exp._id}>
                <td>{exp.title}</td>
                <td>{exp.company}</td>
                <td>
                  {new Date(exp.from).toLocaleDateString() +
                    " - " +
                    new Date(exp.to).toLocaleDateString()}
                </td>
                <td>
                  <Button variant="danger" onClick={() => DeleteExp(exp._id)}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="table table-bordered table-hover text-center my-4 w-75">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{profile.education.map((edu) => {
          return (
            <tr>
              <td>{edu.school}</td>
              <td>{edu.degree}</td>
              <td>{new Date(edu.from).toLocaleDateString() + " - " + new Date(edu.to).toLocaleDateString()}</td>
              <td><Button variant="danger">Delete</Button></td>
            </tr>
          );
        })}</tbody>
      </table>

      <button className="btn btn-danger" onClick={DeleteMyAccount}>
        Delete My account
      </button>
    </div>
  ) :  (
    <div className="p-3">
      <h1 className="text-info display-1 fw-bold">Dashboard </h1>
      <h1>Welocome {user?.name} </h1>
      <button className="btn btn-success" onClick={CreateProfiles}>
        create a profile
      </button>
    </div>
  ) 
}

export default Dashboard;
