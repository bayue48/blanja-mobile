const authReducer = (prevState = {
    isLogin: false,
    email: '',
    name: '',
    id: '',
    token: '',
    level: ''
}, action) => {
    switch (action.type) {
        case "LOGIN_TRUE":
            return {
                ...prevState,
                isLogin: true,
            };
        case "LOGIN_FALSE":
            return {
                ...prevState,
                isLogin: false,
            };
        case "SET_EMAIL_TRUE":
            return {
                ...prevState,
                email: action.data
            };
        case "SET_EMAIL_FALSE":
            return {
                ...prevState,
                email: ''
            }
        case "SET_NAME_TRUE":
            return {
                ...prevState,
                name: action.data
            }
        case "SET_NAME_FALSE":
            return {
                ...prevState,
                name: ''
            }
        case "SET_ID_TRUE":
            return {
                ...prevState,
                id: action.data
            }
        case "SET_ID_FALSE":
            return {
                ...prevState,
                id: ''
            }
        case "SET_TOKEN_TRUE":
            return {
                ...prevState,
                token: action.data
            }
        case "SET_TOKEN_FALSE":
            return {
                ...prevState,
                token: ''
            }
        case "SET_LEVEL_TRUE":
            return {
                ...prevState,
                level: action.data
            }
        case "SET_LEVEL_FALSE":
            return {
                ...prevState,
                level: ''
            }
        default:
            return {
                ...prevState,
            };
    }
}

export default authReducer;