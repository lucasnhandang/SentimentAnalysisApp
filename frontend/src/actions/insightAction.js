import axios from "axios";

export const getVideoInsight = (videoId) => async (dispatch) => {
    try {
        dispatch({ type: "VIDEO_INSIGHT_REQUEST" });

        const { data } = await axios.get(
            `/api/videos/${videoId}/insight/`
        );

        dispatch({
            type: "VIDEO_INSIGHT_SUCCESS",
            payload: data.insight,
        });
    } catch (error) {
        dispatch({
            type: "VIDEO_INSIGHT_FAIL",
            payload:
                error.response?.data?.detail ||
                error.message,
        });
    }
};
