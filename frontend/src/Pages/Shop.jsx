import React from "react";
import Home from "../components/Home";
import Popular from "../components/Popular";
import Offers from "../components/Offers/Offers";
import NewCollections from "../components/NewCollections/NewCollections";
import NewsLetter from "../NewsLetter/NewLetter";

const Shop = () => {
  return (
    <div>
      <Home />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Shop;
