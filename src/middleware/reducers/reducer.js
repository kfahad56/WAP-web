/* eslint-disable */
const states = {
    token: [],
}
const reducer = (state = states, action) => {
    const newState = { ...state };
    switch (action.type) {
        case "activeRole": {
            newState.activeRole = action.value;

            break;
        }
        case "setToken": {
            newState.token = action.value;
            console.log(newState.token);
            // console.log("Token: " + newState.token.User[Object.keys(newState.token.User)[1]]);
            // localStorage.setItem("Token", newState.token.access_token);
            // localStorage.setItem("Refresh_Token", newState.token.refresh_token);
            // localStorage.setItem(
            //   "username",
            //   newState.token.User[Object.keys(newState.token.User)[1]]
            // );
            break;
        }
        case "refreshToken": {
            let refresh = localStorage.getItem("Refresh_Token")
            fetch(newState.apiCalls.url + action.value + "/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + refresh,
                    // "X-access-refresh": refresh,
                },
                credentials: "same-origin",
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify({ refreshToken: refresh }),
            })
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem("Token", data.message.token);
                    if (action.callback) {
                        action.callback();
                    }
                })
                .catch((error) => {
                    if (error.status === 401) {
                        alert("Unauthorized Action");
                    }
                });
            break;
        }
    }
    return newState;
};

export default reducer;