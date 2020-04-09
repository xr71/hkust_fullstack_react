import React from "react";
import { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import {
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
// const isNumber = (val) => !isNaN(Number(val));

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  validate(fullname) {
    const errors = {
      fullname: "",
    };

    if (this.state.touched.fullname && fullname.length < 3) {
      errors.fullname = "Your name should be more than 3 characters";
    } else if (this.state.touched.fullname && fullname.length > 15) {
      errors.fullname =
        "Your name should be less than or equal to 15 characters";
    }
  }

  handleBlur = (field) => (event) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true,
      },
    });
  };

  handleSubmit(values) {
    // console.log('submit');
    // console.log('Current State is: ' + JSON.stringify(values));
    // alert('Current State is: ' + JSON.stringify(values));

    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );

    this.toggleModal();
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <i className='fa fa-pencil fa-lg'> </i> Submit comment{" "}
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader> Submit Comment </ModalHeader>{" "}
          <ModalBody>
            <div className='col-12 '>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <FormGroup row>
                  <Label className='col-12' htmlFor='rating'>
                    {" "}
                    Rating{" "}
                  </Label>{" "}
                  <Control.select
                    className='form-control col-12'
                    model='.rating'
                    id='rating'>
                    <option value='1'> 1 </option>{" "}
                    <option value='2'> 2 </option>{" "}
                    <option value='3'> 3 </option>{" "}
                    <option value='4'> 4 </option>{" "}
                    <option value='5'> 5 </option>{" "}
                  </Control.select>{" "}
                </FormGroup>
                <FormGroup row>
                  <Label className='col-12' htmlFor='author'>
                    {" "}
                    Your Name{" "}
                  </Label>{" "}
                  <Control.text
                    className='form-control'
                    model='.author'
                    id='author'
                    placeholder='Your Name'
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}></Control.text>
                  <Errors
                    className='text-danger'
                    model='.fullname'
                    show='touched'
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label className='col-12' htmlFor='comment'>
                    {" "}
                    Comment{" "}
                  </Label>{" "}
                  <Control.textarea
                    className='form-control'
                    model='.comment'
                    id='comment'
                    name='comment'></Control.textarea>{" "}
                </FormGroup>
                <FormGroup row>
                  <Button type='submit' className='bg-primary'>
                    {" "}
                    Submit{" "}
                  </Button>{" "}
                </FormGroup>{" "}
              </LocalForm>{" "}
            </div>{" "}
          </ModalBody>{" "}
        </Modal>{" "}
      </React.Fragment>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className='col-12 col-md-5 m-1'>
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />{" "}
          <CardBody>
            <CardTitle> {dish.name} </CardTitle>
            <CardText> {dish.description} </CardText>{" "}
          </CardBody>{" "}
        </Card>{" "}
      </div>
    );
  } else {
    return <div> </div>;
  }
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    const commentsList = comments.map((c) => {
      return (
        <li key={c.id}>
          <p> {c.comment} </p>{" "}
          <p>
            {" "}
            --{c.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(Date.parse(c.date))}{" "}
          </p>{" "}
        </li>
      );
    });

    return (
      <div className='col-12 col-md-5 m-1'>
        <h4> Comments </h4> <ul className='list-unstyled'> {commentsList} </ul>
        <CommentForm dishId={dishId} addComment={addComment} />{" "}
      </div>
    );
  } else {
    return <div> </div>;
  }
}

const DishDetail = (props) => {
  return (
    props.dish != null && (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'> Menu </Link>{" "}
            </BreadcrumbItem>
            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>{" "}
          </Breadcrumb>{" "}
          <div className='col-12'>
            <h3> {props.dish.name} </h3> <hr />
          </div>
          <div className='row'>
            <RenderDish dish={props.dish} />{" "}
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />{" "}
          </div>
        </div>{" "}
      </div>
    )
  );
};

export default DishDetail;
