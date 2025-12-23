import { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { getChatList } from "../actions/chatAction";
import { getVideoInsight } from "../actions/insightAction";

import Loader from "../components/loader";
import Message from "../components/message";
import Goback from "../components/goback";
import InsightModal from "../components/insightModal";

const History = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux states
    const chatList = useSelector((state) => state.chatList);
    const { loading, error, list } = chatList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const videoInsight = useSelector((state) => state.videoInsight);
    const { loading: loadingInsight, insight } = videoInsight;

    // Local UI states
    const [showInsight, setShowInsight] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Handlers
    const handleViewInsight = (videoId) => {
        setSelectedVideo(videoId);
        setShowInsight(true);
        dispatch(getVideoInsight(videoId));
    };

    // Effects
    useEffect(() => {
        if (!userInfo) {
            navigate("/signin");
        } else {
            dispatch(getChatList());
        }
    }, [dispatch, userInfo, navigate]);

    return (
        <div style={{ width: "100%" }}>
            {/* Header */}
            <Row className="align-items-center mt-3 mb-2">
                <Col>
                    <div className="mt-2 mb-2">
                        <Goback variant="outline-light" to="/" />
                    </div>
                    <h1 style={{ color: "white", fontWeight: "bold" }}>
                        History
                    </h1>
                </Col>
            </Row>

            {/* Content */}
            {loading ? (
                <Loader />
            ) : error ? (
                <div style={{ width: "75%", margin: "0 auto" }}>
                    <Message variant="info">{error}</Message>
                </div>
            ) : (
                <>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th className="px-3">ID</th>
                                <th style={{ width: "40%" }}>Name</th>
                                <th className="px-1 text-danger">Negative</th>
                                <th className="px-1 text-primary">Neutral</th>
                                <th className="px-1 text-success">Positive</th>
                                <th className="px-1">Search at</th>
                                <th className="px-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.map((l, index) => (
                                <tr key={l._id}>
                                    <td>{index + 1}</td>
                                    <td
                                        className="px-2"
                                        style={{ textAlign: "left" }}
                                    >
                                        {l.name}
                                    </td>
                                    <td className="text-danger">
                                        {l.negative} %
                                    </td>
                                    <td className="text-primary">
                                        {l.neutral} %
                                    </td>
                                    <td className="text-success">
                                        {l.positive} %
                                    </td>
                                    <td>
                                        {l.createAt?.substring(0, 10)}
                                    </td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        {/* View comments */}
                                        <LinkContainer
                                            to={
                                                userInfo
                                                    ? `/comment/${l._id}`
                                                    : "/signin"
                                            }
                                        >
                                            <Button
                                                variant="outline-dark"
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>

                                        {/* AI Insight */}
                                        <Button
                                            variant="outline-info"
                                            className="btn-sm"
                                            disabled={loadingInsight}
                                            onClick={() =>
                                                handleViewInsight(l._id)
                                            }
                                        >
                                            <i className="fas fa-robot"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}

            {/* Insight Modal */}
            <InsightModal
                show={showInsight}
                onHide={() => setShowInsight(false)}
                loading={loadingInsight}
                insight={insight}
                videoId={selectedVideo}
            />
        </div>
    );
};

export default History;
