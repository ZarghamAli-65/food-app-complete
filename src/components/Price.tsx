"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (product.options?.length) {
      const price = Number(product.price);
      const additionalPrice = Number(
        product.options[selectedItems]?.additionalPrice
      );
      const quantity = Number(totalQuantity);

      setTotalPrice(quantity * price + additionalPrice);
    }
  }, [totalQuantity, selectedItems, product]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: totalPrice,
      ...(product.options?.length && {
        optionTitle: product.options[selectedItems].title,
      }),
      quantity: totalQuantity,
    });
    toast.success("The product has been added to cart");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${totalPrice}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length &&
          product.options?.map((option, index) => (
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
        <button
          className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
