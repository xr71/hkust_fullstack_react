import React, { Component } from 'react';
import Menu from './MenuComponent';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



const mapStoreToProps = (state) => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        comments: state.comments,
        promotions: state.promotions
    }    
}


class Main extends Component {

  constructor (props) {
    super(props);

    this.state = {
       // selectedDish: null 
    };


  }
   
    // onDishSelect(dishId) {
    //     this.setState({
    //         selectedDish: dishId
    //     });
    // }

  render() {

    const HomePage = () => {
      return (
        <Home 
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    return (
      <div className="App">
        <Header />
  
        {/* <Menu dishes={this.state.dishes} 
            onClick={ (dishId) => this.onDishSelect(dishId) }
        />

        <DishDetail dish={this.state.dishes.filter((dish) =>  dish.id === this.state.selectedDish)[0]} /> */}

            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route exact path='/contactus' component={Contact} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Redirect to="/home" />
            </Switch>
        
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Main));
