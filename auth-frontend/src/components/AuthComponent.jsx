import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function AuthComponent() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const [message, setMessage] = useState("");
  console.log(token)
  
    useEffect(() => {
      // set configurations for the API call here
      const configuration = {
        method: "get",
        url: "https://auth-mern-backend.onrender.com/auth-endpoint",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // make the API call
      axios(configuration)
        .then((result) => {
          // assign the message in our result to the message we initialized above
          setMessage(result.data.message);
        })
        .catch((error) => {
          error = new Error();
        });
    }, []);
  
  return (
    <div>
      <h1 className="text-center">Auth Component</h1>
      <h3 className="text-center text-danger">{message}</h3>
    </div>
  );
}
