import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrums from "../components/Breadcrums/Breadcrums";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import Header from "../components/Header";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = (props) => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_product[productId - 1];
  console.log(product);
  return (
    <div>
      <Header />
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <RelatedProducts />
    </div>
  );
};

export default Product;
