import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Cards({ title, url, id }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="https://dummyimage.com/250/red/00000" />
      <Card.Body>
        <Card.Title>{id}</Card.Title>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{url}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;
