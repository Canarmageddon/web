import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class PopUpHandler extends React.Component {
  constructor(props) {
    super();
    this.state = {
      display: false,
      idPopUp: null,
      description: "",
    };
  }

  handleClick(id, description) {
    updatePlacesDescription(id, description);
    this.setState({ display: false, idPopUp: null, description: "" });
  }
  render() {
    return (
      <Modal
        show={this.state.display}
        onHide={() => this.setState({ display: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Détails du point d'intérêt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="Titre"
              value={this.state.title}
              className="mb-3"
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            <Form.Control
              type="text"
              placeholder="Commentaire"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.setState({ display: false })}
          >
            Fermer
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              this.handleClick(this.state.idPopUp, this.state.description)
            }
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PopUpHandler;
