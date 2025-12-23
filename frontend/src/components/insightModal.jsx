import { Modal, Button, Spinner } from "react-bootstrap";

const InsightModal = ({ show, onHide, loading, insight }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>AI Insight</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p className="mt-3">Generating insight...</p>
                    </div>
                ) : (
                    <p style={{ textAlign: "justify" }}>{insight}</p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InsightModal;