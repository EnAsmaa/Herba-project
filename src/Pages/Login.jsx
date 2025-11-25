import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="container w-75 my-5 py-5">
        <div className="row row-rounded border">
          <div className="col-md-5 bg-main py-5">
            <div className="col-content h-100 d-flex justify-content-center align-items-center">
              <p className="text-light fw-bold fs-3">welcome back</p>
            </div>
          </div>
          <div className="col-md-7 py-5 ">
            <div className="col-content d-flex flex-column justify-content-center h-100">
              <Form>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <div className="d-flex gap-3 align-items-center">
                  <button className="btn sign-btn text-white">Login</button>
                  <span className="text-dark">
                    Has not an account?{" "}
                    <Link className="text-primary fw-medium" to={"/register"}>
                      Register Now
                    </Link>
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
