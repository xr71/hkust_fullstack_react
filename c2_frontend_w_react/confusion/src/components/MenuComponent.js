import React from 'react';
import { Component } from 'react';
import { Media, Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText } from 'reactstrap';
import DishDetail from './DishDetailComponent';


class Menu extends Component {
  constructor (props) {
      super(props);

  }



  render() {

    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => {this.props.onClick(dish.id)}}>
              <CardImg width="100%" object src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="row">
          {menu}
      </div>
    );
  }
}

export default Menu;