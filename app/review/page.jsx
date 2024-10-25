import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import ListReviewComponent from "@/components/user/reviews/ListReviewComponent"

const getData = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default async function page() {

  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const data = await getData(session.user._id);

  return (
    <>
      <ListReviewComponent data={data} id={session.user._id} />
    </>
  )
}
