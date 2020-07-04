import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';


class DishDetail extends Component{
    constructor(props){
        super(props);

        this.state ={
            month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        };
    }

    renderDish(dish){
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


    renderComments(comments){
        const commentsMap = comments.map((comment) => {
            var date = comment.date.substring(0,10).split('-');
            
            

            return(
                <li>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {this.state.month_names_short[date[1]-1]} {("0"+(parseInt(date[2])+1)).slice(-2)}, {date[0]}</p>
                </li>
            );
        }) 

        return(
            <div className="col-12 col-md-5 mt-1">
            <h4 >Comments</h4>
            <ul className="list-unstyled">
                {commentsMap}
            </ul>
            </div>
        );

    }

    render(){
        if(this.props.dishDetail != null){
            return(
                <div className="row">
                    {this.renderDish(this.props.dishDetail)}
                    {this.renderComments(this.props.dishDetail.comments)}
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
}

export default DishDetail;