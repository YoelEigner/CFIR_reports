const appReducer = (state = {
    accessToken: "",
    refreshToken: "",
    authenticated: false,
    expiresIn: 1800000,
    expiresAt: null,
    provence: [],
    Physician: [],
    worker: [],
    paymentTypes: [],
    associateLeval: []

}, action) => {
    switch (action.type) {
        case "ACCESSTOKEN":
            return { ...state, accessToken: action.payload };
        case "REFRESHTOKEN":
            return { ...state, refreshToken: action.payload };
        case "AUTHENTICATED":
            return { ...state, authenticated: action.payload };
        case "USERNAME":
            return { ...state, username: action.payload };
        case "EXPIERSIN":
            return { ...state, expiresIn: action.payload };
        case "EXPIERSAT":
            return { ...state, expiresAt: action.payload };
        case "PROVENCE":
            return { ...state, provence: action.payload };
        case "PHYSICIANS":
            return { ...state, Physician: action.payload };
        case "WORKER":
            return { ...state, worker: action.payload };
        case "PAYMENTTYPES":
            return { ...state, paymentTypes: action.payload };
        case "ASSOCIATELEVAL":
            return { ...state, associateLeval: action.payload };
        case "RESET":
            return state = {};
        default:
            return state;
    }
};

export default appReducer;
