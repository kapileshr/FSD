import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Add.css";
const Registration = () => {
  const [name, setName] = useState("");
  const [eid, setEid] = useState("");
  const [email, setEmail] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [department, setDepartment] = useState("");
  const [doj, setDoj] = useState("");
  const [role, setRole] = useState("");

  const departments = ["HR", "IT", "MAARKETING"];

  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setName("");
    setEid("");
    setEmail("");
    setDepartment("");
    setDoj("");
    setMobileno("");
    setRole("");
    setErrors({});
  };

  const handleSubmit = async (e) => {
    let lst = {};
    if (!name) lst.name = "* This field is required";
    if (!eid) lst.eid = "* This field is required";
    if (!email) lst.email = "* This field is required";
    if (!mobileno || !mobileno.match(/^\d{10}$/)) {
      lst.mobileno = "Invalid Number";
    }
    if (!department) lst.department = "* This field is required";
    if (!doj) lst.doj = "* This field is required";
    if (!role) lst.role = "* This field is required";

    setErrors(lst);

    if (Object.keys(lst).length == 0) {
      try {
        const res = await axios.post(
          "http://localhost:8080/register",
          {
            name,
            eid,
            email,
            mobileno,
            department,
            doj,
            role,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        if (res.status == 200) {
          toast.success("Employee registered Successfully", {
            position: "top-right",
          });
          console.log("Registration Successful");
          handleReset();
        } else {
          const data = await res.json();
          if (data.message == "exist-id") {
            toast.warning("Employee Id already Exist", {
              position: "top-right",
            });
            console.log("Employee id already exist");
          } else if (data.message == "exist-email") {
            toast.warning("email id already exist", {
              position: "top-right",
            });
            console.log("Email id already exist");
          }
        }
      } catch (e) {
        toast.error("Error in registration, Try again later", {
          position: "top-right",
        });
        console.log(e + "error");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="header">Employee Details</h1>
      <input
        placeholder="Enter Name"
        type="text"
        value={name}
        className="input2"
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p>{errors.name}</p>}

      <input
        placeholder="Enter Employee id"
        type="text"
        value={eid}
        className="input2"
        onChange={(e) => setEid(e.target.value)}
      />
      {errors.eid && <p>{errors.eid}</p>}

      <input
        placeholder="Enter Email"
        type="email"
        value={email}
        className="input2"
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        placeholder="Enter Phone Number"
        type="text"
        value={mobileno}
        className="input2"
        onChange={(e) => setMobileno(e.target.value)}
      />
      {errors.mobileno && <p>{errors.mobileno}</p>}

      <label>Department</label>
      <select
        className="input2"
        name="department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="" disabled>
          Select Department
        </option>
        {departments.map((dept, index) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      {errors.department && <p>{errors.department}</p>}

      <input
        placeholder="Date of Joining"
        type="date"
        className="input2"
        value={doj}
        onChange={(e) => setDoj(e.target.value)}
      />
      {errors.doj && <p>{errors.doj}</p>}

      <input
        placeholder="Enter Role"
        type="text"
        value={role}
        className="input2"
        onChange={(e) => setRole(e.target.value)}
      />
      {errors.role && <p>{errors.role}</p>}
      <div className="buttons">
        <button type="submit" onClick={handleSubmit} className="buttons2">
          Submit
        </button>
        <button onClick={handleReset} className="buttons2"> Reset</button>
      </div>
    </div>
  );
};

export default Registration;
