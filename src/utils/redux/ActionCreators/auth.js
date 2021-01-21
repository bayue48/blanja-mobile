export const setLogintrue = () => {
    return {
        type: "LOGIN_TRUE",
    }
}
export const setLoginfalse = () => {
    return {
        type: "LOGIN_FALSE",
    }
}
export const setEmail = (data) => {
    return {
        type: "SET_EMAIL_TRUE",
        data
    }
}
export const removeEmail = () => {
    return {
        type : "SET_EMAIL_FALSE",
    }
}
export const setName = (data) => {
    return {
        type: "SET_NAME_TRUE",
        data
    }
}
export const removeName = (data) => {
    return {
        type: "SET_NAME_FALSE",
    }
}
export const setId = (data) => {
    return{
        type:"SET_ID_TRUE",
        data
    }
}
export const removeId = (data) => {
    return{
        type:"SET_ID_FALSE",
    }
}
export const setToken = (data) => {
    return{
        type:"SET_TOKEN_TRUE",
        data
    }
}
export const removeToken = (data) => {
    return{
        type:"SET_TOKEN_FALSE"
    }
}
export const setLevelUser = (data) => {
    return{
        type:"SET_LEVEL_TRUE",
        data
    }
}
export const removeLevelUser = (data) => {
    return{
        type:"SET_LEVEL_FALSE"
    }
}