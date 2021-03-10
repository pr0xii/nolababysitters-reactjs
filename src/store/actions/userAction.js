const userAction = user => {
    return {
        payload: user,
        type: "USER_SIGNED_IN"
    }
}

export default userAction;