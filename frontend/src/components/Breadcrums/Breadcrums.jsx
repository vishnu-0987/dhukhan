import React, { useContext } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import "./Breadcrums.css";

const Breadcrums = (props) => {
  const { product } = props;

  return (
    <div className="breadcrum">
      HOME <MdArrowForwardIos /> SHOP <MdArrowForwardIos /> {product.category}{" "}
      <MdArrowForwardIos /> {product.name}
    </div>
  );
};

export default Breadcrums;
