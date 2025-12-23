export const videoInsightReducer = (
    state = { insight: "" },
    action
) => {
    switch (action.type) {
        case "VIDEO_INSIGHT_REQUEST":
            return { loading: true };
        case "VIDEO_INSIGHT_SUCCESS":
            return { loading: false, insight: action.payload };
        case "VIDEO_INSIGHT_FAIL":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
