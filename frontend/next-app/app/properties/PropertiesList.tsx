import next from "next";
import React from "react";
import Button from "../components/Button/Button";
import { useRouter } from "next/navigation";
import DeletePropertyButton from "./DeletePropertyButton";
import SubmitPropertiesButton from "./SubmitPropertiesButton";
import GenerateEmailButton from "./GenerateEmailButton";

interface Property {
  id: number;
  property: string;
  value: string;
}

async function getProperties() {
  const response = await fetch("http://localhost:4000/properties", {
    cache: "no-cache",
  });
  const properties: Property[] = await response.json();
  return properties;
}

const PropertiesList = async () => {
  const properties = await getProperties();

  return (
    <>
      {properties.map((property) => (
        <div key={property.id} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{property.property}</h2>
            <p>{property.value}</p>
          </div>
          <div className="card-actions justify-end">
            <DeletePropertyButton id={property.id} />
          </div>
        </div>
      ))}
      {properties.length === 0 && <p>No properties found</p>}
      {properties.length > 0 && (
        <>
          <SubmitPropertiesButton properties={properties} />
          <GenerateEmailButton />
        </>
      )}
    </>
  );
};

export default PropertiesList;
