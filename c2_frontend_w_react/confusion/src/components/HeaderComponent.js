import React, { Component } from 'react';
import { Navbar, Jumbotron, NavbarBrand } from 'reactstrap';

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar dark>
          <div className="container">
            <NavbarBrand href="/">Ristorante Confusion</NavbarBrand>
          </div>
        </Navbar>

        <Jumbotron>
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante Confusion</h1>
              <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
            </div>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Header;