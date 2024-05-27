"use client";

import Button from "../components/Button/Button";
import Property from "./PropertiesList"; // Import the 'Property' type

interface Property {
  id: number;
  property: string;
  value: string;
}

interface Props {
  properties: Property[];
}

const SubmitPropertiesButton = ({ properties }: Props) => {
  async function submitProperties() {
    console.log(properties);

    const response = await fetch("http://127.0.0.1:5000/addProperty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(properties),
    });
    return response;
  }
  return <Button onClick={submitProperties}>Submit Properties</Button>;
};

export default SubmitPropertiesButton;
