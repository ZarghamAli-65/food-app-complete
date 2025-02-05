"use client";

import { absoluteUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Show loading state
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Handle unauthenticated or non-admin users
  if (status === "unauthenticated" || !session?.user?.isAdmin) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(absoluteUrl(`/api/products/${id}`), {
        method: "DELETE",
      });

      if (res.status === 200) {
        toast.success("The product has been deleted!");
        router.push("/menu"); // Use `router.push` from App Router
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
      onClick={handleDelete}
    >
      <Image src="/images/delete.png" alt="Delete" width={20} height={20} />
    </button>
  );
};

export default DeleteButton;
