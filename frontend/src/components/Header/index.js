import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import logo_big from "../Assets/logo_big.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./index.css";
import { ShopContext } from "../../Context/ShopContext";

const Header = ({ history, location }) => {
  const [login, setLogin] = useState(false);
  const jwt = Cookies.get("jwt_token");
  const { getTotalCartItems } = useContext(ShopContext);

  useEffect(() => {
    // Update login state when jwt_token changes
    setLogin(jwt !== undefined);
  }, [jwt]);

  const logout = () => {
    Cookies.remove("jwt_token");
    setLogin(false);
    history.replace("/login");
  };

  const cartPush = () => {
    history.push("/cart");
  };

  return (
    <div className="header-container">
      <nav className="navbar">
        <div className="logo-div">
          <Link to="/" className="header-link-items">
            <img src={logo_big} alt="logo" className="logo-pic" />
          </Link>
          <h1 className="logo-name">DHUKHAN</h1>
        </div>
        <div className="link-div">
          <Link to="/" className="header-link-items">
            Shop
            {location.pathname === "/" && <hr className="hr" />}
          </Link>
          <Link to="/mens" className="header-link-items">
            Men
            {location.pathname === "/mens" && <hr className="hr" />}
          </Link>
          <Link to="/womens" className="header-link-items">
            Women
            {location.pathname === "/womens" && <hr className="hr" />}
          </Link>
          <Link to="/kids" className="header-link-items">
            Kids
            {location.pathname === "/kids" && <hr className="hr" />}
          </Link>
        </div>
        <div className="login-div">
          {!login ? (
            <Link className="login-link" to="/login">
              <button className="login-button" type="button">
                Login
              </button>
            </Link>
          ) : (
            <button className="login-button" type="button" onClick={logout}>
              Logout
            </button>
          )}

          <AiOutlineShoppingCart
            className="shopping-cart-logo"
            onClick={cartPush}
          />
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Header);
