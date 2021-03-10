const userReducer = (state = null, action) => {
    if(action.type === "USER_SIGNED_IN"){
        return action.payload;
    }
    return state;
}

export default userReducer;