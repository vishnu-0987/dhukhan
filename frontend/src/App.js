import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import Footer from "./components/Footer";
import men_banner from "./components/Assets/banner_mens.png";
import women_banner from "./components/Assets/banner_women.png";
import kid_banner from "./components/Assets/banner_kids.png";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={Shop} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/mens"
            component={() => (
              <ShopCategory category="men" banner={men_banner} />
            )}
          />
          <Route
            exact
            path="/womens"
            component={() => (
              <ShopCategory category="women" banner={women_banner} />
            )}
          />
          <Route
            exact
            path="/kids"
            component={() => (
              <ShopCategory category="kid" banner={kid_banner} />
            )}
            cateogry="kid"
            banner={kid_banner}
          />
          <ProtectedRoute exact path="/product" component={Product} />
          <ProtectedRoute
            exact
            path="/product/:productId"
            component={Product}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}
export default App;
