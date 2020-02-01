import React from 'react';
import { Component } from 'react';
import { Media, Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText } from 'reactstrap';
import DishDetail from './DishDetailComponent';


class Menu extends Component {
  constructor (props) {
      super(props);

      this.state = {
        selectedDish: null,
        comments: null
      }
  }

  onDishSelect(dish) {
    this.setState({
      selectedDish: dish,
      comments: dish.comments
    });
  }

  render() {

    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => {this.onDishSelect(dish)}}>
              <CardImg width="100%" object src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className='row'>
          {menu}
        </div>

        <DishDetail dish={this.state.selectedDish} comments={this.state.comments} />
      </div>
    );
  }
}

export default Menu;