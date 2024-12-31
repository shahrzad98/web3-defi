const ACTION_TYPES = {
    ADD_NOTIFICATION: "addNotification",
    CLEAR__ALL_NOTIFICATIONS: "clearAllNotification",
    CLEAR_NOTIFICATION: "clearNotification",
};

const userReducer = (state, action) => {
    const { type, value } = action;
    switch (type) {
        case ACTION_TYPES.ADD_NOTIFICATION:
            return {
                ...state,
                messages: [...state.messages, value],
            };
        case ACTION_TYPES.CLEAR_NOTIFICATION:
            return {
                messages: [...state.messages.filter((i, index) => i.id !== value)],
            };
        case ACTION_TYPES.CLEAR__ALL_NOTIFICATIONS:
            return {
                messages: [],
            };

        default:
            return state;
    }
};

export default userReducer;
