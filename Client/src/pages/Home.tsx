import { ProductInputTypes } from "@ssg_csg/amazemart_common";
import api from "./../axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [productList, setProductsList] = useState<ProductInputTypes[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await api.get("/products");
        setProductsList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProperties();
  }, []);
  console.log(productList);

  return (
    <div className="bg-amber-50">
      Home
      <div>Banner</div>
      <div className="flex flex-col justify-center items-center">
        {productList.map((product, index) => (
          <div key={index}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
