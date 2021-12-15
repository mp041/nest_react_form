import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployeeDetail() {
  // const [search, setSearch] = useState("");
  const [record, setRecord] = useState([]);
  console.log(record,"recorddddARAAAAA");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password : "",
    gender : "",
    address: "",
    phone: "",
  });

  //  Object Destructuring
  const { firstName, lastName, email,password,gender,address,phone } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records
  const loadEmployeeDetail = async () => {


    // var response = fetch("http://localhost:3000/users")
    fetch(`http://localhost:3000/users`,{
            method: "GET",
          })
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data,"result");
                setRecord(result.data);


      // .then(function (response) {
      //   console.log(response);
      //   return response.json();
      //
      // })
      // .then(function (myJson) {
      //   console.log(myJson);
      //   setRecord(myJson);
      });
  };
  useEffect(() => {
    loadEmployeeDetail();
  }, []);

  // Insert Employee Records
  const submitEmployeeRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    // if(user.firstName.length = 0){
    //   if(user.lastName.length = 0){
    //     alert("enter the name")
    //   }
    // }
    await axios.post("http://localhost:3000/users", user).then(res => {
      console.log(res,"resssss");
    });
    // console.log(user,"userrrrrrr")

    alert("Data Inserted");

    loadEmployeeDetail();
  };

  // Search Records here


  // Delete Employee Record
  const deleteRecord = (productId) => {
    axios
      .delete(`http://localhost:3000/users/${productId}`)
      .then((result) => {
        loadEmployeeDetail();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };

  return (
    <section>
      <div class="container">

        <div class="row mt-3">
          <div class="col-sm-4">
            <div
              className="box p-3 mb-3 mt-5"
              style={{ border: "1px solid #d0d0d0" }}
            >
              <form onSubmit={submitEmployeeRecord}>
                <h5 className="mb-3 ">Registration Form</h5>
                <div class="form-group">
                  <label>firstName : </label>
                  <input
                    type="text"
                    minlength="3"
                    class="form-control  mb-2"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter firstname"
                    required
                  />
                </div>

                <div class="form-group">
                <label>lastName : </label>

                  <input
                    type="text"
                    class="form-control  mb-2"
                    name="lastName"
                    minlength="3"
                    value={lastName}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter lastname"
                    required
                  />
                </div>

                <div class="form-group">
                <label>email : </label>

                  <input
                    type="email"
                    // pattern=".+@globex\.com"
                    class="form-control mb-2"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Email"
                    required
                  />
                </div>

                <div class="form-group">
                <label>password : </label>

                  <input
                    type="password"
                    minlength="8"
                    class="form-control mb-2"
                    name="password"
                    value={password}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Password"
                    required
                  />
                </div>

                <div class="form-group">
                <label>gender : </label>

                  <input
                    type="text"
                    class="form-control mb-2"
                    name="gender"
                    value={gender}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Gender"
                    required
                  />
                </div>

                <div class="form-group">
                <label>address : </label>

                  <input
                    type="text"
                    class="form-control mb-2"
                    minlength="3"
                    name="address"
                    value={address}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter address"
                    required
                  />
                </div>

                <div class="form-group">

                <label>phone : </label>

                  <input
                    type="tel"
                    class="form-control mb-2"
                    name="phone"
                    minlength="10"
                    maxlength="10"

                    value={phone}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Phone"
                    required
                  />
                </div>


                <button type="submit" class="btn btn-dark btn-block mt-4">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div class="col-sm-8">
            <h5 class="text-center  ml-4 mt-4  mb-5">View Records</h5>

            <table class="table table-hover  table-striped table-bordered ml-4 ">
              <thead>
                <tr>
                  <th>Sr no</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Phone No</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                { record.length > 0 ? record.map((name) => (



                  <tr>
                    <td>{name.id}</td>
                    <td>{name.firstName}</td>
                    <td>{name.email}</td>
                    <td>{name.gender}</td>
                    <td>{name.address}</td>
                    <td>{name.phone}</td>
                    <td>
                      <a
                        className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete " + name.firstName
                          );
                          if (confirmBox === true) {
                            deleteRecord(name.id);
                          }
                        }}
                      >
                        {" "}
                        <i

                          style={{ fontSize: "18px", marginRight: "5px", cursor: "pointer" }}
                        >delete</i>{" "}
                      </a>

                      <Link
                        class=" mr-2"
                        to={`/EditEmployee/editID/${name.id}`}
                      >
                        <i aria-hidden="true">edit</i>
                      </Link>
                    </td>
                  </tr>
                )) : "NO records" }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeDetail;
