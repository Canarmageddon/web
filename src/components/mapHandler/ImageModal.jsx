import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function ({ id, show, setShow }) {
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <img src={`${process.env.REACT_APP_DATABASE_URL}pictures/file/${id}`}
                        style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}
