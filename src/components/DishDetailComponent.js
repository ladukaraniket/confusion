import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>{' '}Submit Comment
                                    </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author" className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(16)
                                        }}></Control.text>
                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be less than 16 characters'
                                        }}></Errors>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6">
                                    </Control.textarea>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 mt-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle >{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}


function RenderComments({ comments , addComment, dishId}) {

    const commentsMap = comments.map((comment) => {
        var date = comment.date.substring(0, 10).split('-');
        var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return (
            <li>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {month_names_short[date[1] - 1]} {("0" + (parseInt(date[2]) + 1)).slice(-2)}, {date[0]}</p>
            </li>
        );
    })

    return (
        <div className="col-12 col-md-5 mt-1">
            <h4 >Comments</h4>
            <ul className="list-unstyled">
                {commentsMap}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment}></CommentForm>
        </div>
    );

}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>

                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}></RenderDish>
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}></RenderComments>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


export default DishDetail;