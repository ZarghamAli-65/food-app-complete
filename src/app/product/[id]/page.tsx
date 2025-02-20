import Image from "next/image";
import React from "react";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import DeleteButton from "@/components/DeleteButton";
import { absoluteUrl } from "@/utils/url";

const getData = async (id: string) => {
  const res = await fetch(absoluteUrl(`/api/products/${id}`), {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
};

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // Await the params object to extract `id`
  const singleProduct: ProductType = await getData(id);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {singleProduct.title}
        </h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id} />
    </div>
  );
};

export default SingleProductPage;
