import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditEmployee = () => {
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams(); //The useParams() hook helps us to access the URL parameters from a current route.

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    address: "",
    phone: "",
  });

  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    address,
    phone,
  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const updateEmployee = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/users/${id}`, user);
    console.log(user,"userrrrrrrrrrr")
    history.push("/");
  };

  const loadUser = () => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data[0].firstName,"loaduser");
        setUser({
          id: id,
          firstName: result.data[0].firstName,
          lastName: result.data[0].lastName,
          email: result.data[0].email,
          password: result.data[0].password,
          gender: result.data[0].gender,
          address: result.data[0].address,
          phone: result.data[0].phone
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
          <h4 className="text-center mb-4">Edit User</h4>

          <h5 className="text-success">User ID : {user.id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Edit First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Edit Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Edit Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Edit password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Edit gender"
              name="gender"
              value={gender}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Edit address"
              name="address"
              value={address}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Edit phone no"
              name="phone"
              value={phone}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button
            onClick={updateEmployee}
            className="btn btn-secondary btn-block"
          >
            Update Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
