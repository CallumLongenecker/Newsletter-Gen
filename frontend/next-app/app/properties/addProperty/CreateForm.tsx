"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../components/Button/Button";

const CreateForm = () => {
  const router = useRouter();

  const [property, setProperty] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const propertyData = {
      property,
      value,
    };

    const response = await fetch("http://localhost:4000/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    });

    if (response.ok) {
      setIsLoading(false);
      router.push("/properties");
      router.refresh();
    }
  };

  return (
    <form className="w-1/2" onSubmit={handleSubmit}>
      <label>
        <span className="text-primary">
          {"Property (What you want to add)"}
        </span>
        <input
          required
          type="text"
          placeholder="ex. Newsletter Title"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setProperty(e.target.value)}
          value={property}
        />
      </label>
      <label>
        <span>{"Description"}</span>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Important and relevant info"
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <Button>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Property</span>}
      </Button>
    </form>
  );
};

export default CreateForm;
