import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";


export default function FreeComponent() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://auth-mern-backend.onrender.com/free-endpoint",
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
      <h1 className="text-center">Free Component</h1> 
      <h3 className="text-center text-danger">{message}</h3>
      <Spinner />
    </div>
  );
}
