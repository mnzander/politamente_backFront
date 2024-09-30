export const loginUser = async(bodyParams) => {
    try{
        const response = await fetch("http://localhost:9000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: bodyParams,
        });

        const login = await response.json();
        return login;

    } catch(error) {
        console.error("Error login the user: ", error);
        throw error;
    }
};