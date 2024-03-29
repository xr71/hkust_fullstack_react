import React, { Component } from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import DishDetail from "./DishDetailComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, fetchDishes } from "../redux/ActionCreators";
import { actions } from 'react-redux-form';


const mapStoreToProps = (state) => {
  return {
    dishes: state.dishes,
    leaders: state.leaders,
    comments: state.comments,
    promotions: state.promotions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
      dispatch(actions.reset('feedback'))
  }
});

class Main extends Component {

  componentWillMount() {
    this.props.fetchDishes();
  }

  render() {
    const HomePage = () => {
      const { dishes, promotions, leaders } = this.props;

      return (
        <Home
          dish={dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={dishes.isLoading}
          dishesErrMess={dishes.errMess}
          promotion={promotions.filter((promo) => promo.featured)[0]}
          leader={leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div className='App'>
        <Header />

        <Switch>
          <Route path='/home' component={HomePage} />{" "}
          <Route
            exact
            path='/menu'
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component={ () => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/> } />
          <Route
            exact
            path='/aboutus'
            component={() => <About leaders={this.props.leaders} />}
          />
          <Redirect to='/home' />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Main));
