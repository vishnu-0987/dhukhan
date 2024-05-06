import React, { useContext } from "react";
import Header from "../components/Header";
import dropdown_icon from "../components/Assets/dropdown_icon.png";
import { ShopContext } from "../Context/ShopContext";
import Item from "../components/Item";
import { Redirect, Route } from "react-router-dom";
import Cookie from "js-cookie";
import "./CSS/ShopCategory.css";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const { banner, category } = props;
  console.log(all_product);
  const token = Cookie.get("jwt_token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Header />
      <div className="shop-category">
        <img src={banner} alt="" className="shopcategory-banner" />
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {all_product.map((item, i) => {
            if (category === item.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="shopcategory-loadmore">Explore More</div>
      </div>
    </>
  );
};

export default ShopCategory;
