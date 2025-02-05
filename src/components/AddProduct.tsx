"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AddProduct = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Handle unauthenticated or non-admin users
  if (status === "unauthenticated" || !session?.user?.isAdmin) {
    return null;
  }

  return (
    <Link href="/add">
      <button className="bg-red-400 hover:bg-red-500 text-white p-1 rounded-full ml-6 text-xs flex items-center">
        Add Product
      </button>
    </Link>
  );
};

export default AddProduct;
