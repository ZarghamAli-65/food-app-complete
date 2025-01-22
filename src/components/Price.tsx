"use client";

import React, { useEffect, useState } from "react";

type Props = {
  price: number;
  id: string;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, options }: Props) => {
  const [totalPrice, setTotalPrice] = useState(price);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState(0);

  useEffect(() => {
    setTotalPrice(
      totalQuantity *
        (options ? price + options[selectedItems].additionalPrice : price)
    );
  }, [totalQuantity, selectedItems, options, price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${totalPrice}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background:
                selectedItems === index ? "rgb(248 113 113)" : "white",
              color: selectedItems === index ? "white" : "red",
            }}
            onClick={() => setSelectedItems(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() =>
                setTotalQuantity((prev) => (prev > 1 ? prev - 1 : 1))
              }
            >
              {"<"}
            </button>
            <span>{totalQuantity}</span>
            <button
              onClick={() =>
                setTotalQuantity((prev) => (prev < 9 ? prev + 1 : 9))
              }
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
