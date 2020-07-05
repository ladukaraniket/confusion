import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';


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


function RenderComments({ comments }) {
    const commentsMap = comments.map((comment) => {
        var date = comment.date.substring(0, 10).split('-');
        var month_names_short= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
        </div>
    );

}

const DishDetail = (props) => {
    if (props.dishDetail != null) {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dishDetail}></RenderDish>
                    <RenderComments comments={props.dishDetail.comments}></RenderComments>
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