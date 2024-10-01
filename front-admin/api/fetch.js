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

export const getFurnituresForAdmins = async(page = 1, limit = 12) => {
    try{
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:9000/muebles/admin/?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "auth": token, 
            },
        });

        const furnitures = await response.json();
        return furnitures;
    } catch(error){
        console.error("Error getting the furnitures: ", error);
        throw error;
    }
};