import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export class ProjectsItem extends React.Component{

    render() {
        return (
            <div>
                {/*{this.props.name}*/}
                <Card border="primary" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://i0.wp.com/storage.googleapis.com/blog-images-backup/1*3SVfBkNZI2f-sspiq59xcw.png?zoom=1.25&resize=391%2C321&ssl=1" />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            Категорія: {this.props.categories.map(category => category.category + ", ")}
                        </Card.Text>
                        <Card.Text>
                            Статус: {this.props.status.status}
                        </Card.Text>
                        {/*<Button variant="primary" href={'projects/' + this.props.id}>Go somewhere</Button>*/}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
