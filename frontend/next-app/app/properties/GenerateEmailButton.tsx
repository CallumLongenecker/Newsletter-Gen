"use client";

import Button from "../components/Button/Button";
import Property from "./PropertiesList"; // Import the 'Property' type

const GenerateEmailButton = () => {
  async function generateEmail() {
    const response = await fetch("http://127.0.0.1:5000/generate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
    window.open("email.html");
    return response;
  }
  return <Button onClick={generateEmail}>Generate Email</Button>;
};

export default GenerateEmailButton;
