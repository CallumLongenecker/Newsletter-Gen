"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button/Button";

interface Props {
  id: number;
}

const DeletePropertyButton = ({ id }: Props) => {
  const router = useRouter();

  async function deleteProperty(id: number) {
    const response = await fetch(`http://localhost:4000/properties/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.refresh();
    }
  }
  return <Button onClick={() => deleteProperty(id)}>Delete</Button>;
};

export default DeletePropertyButton;
