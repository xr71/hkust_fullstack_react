import React from 'react';
import { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Media } from 'reactstrap';

class DishDetail extends Component {
  constructor (props) {
    super(props);

  }

  renderDish(dish) {
    if (dish != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>
                {dish.name}
              </CardTitle>

              <CardText>
                {dish.description}
              </CardText>
            </CardBody>
          </Card>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  renderComments(comments) {
    if (comments != null) {
      const commentsList = comments.map((c) => {
        return (
          <li key={c.id}>
            <p>{c.comment}</p>
            <p>-- {c.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(Date.parse(c.date))}</p>
          </li>
        )
      })
  
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul className='list-unstyled'>
            {commentsList}
          </ul>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }

  render() {

    return (
      this.props.dish != null &&
      <div className="row">
        {this.renderDish(this.props.dish)}
        {this.renderComments(this.props.dish.comments)}
      </div>
    );
  }
}

export default DishDetail;