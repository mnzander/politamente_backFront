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

export const createFurniture = async(name, type, measures, comment, price, imgFile) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const formData = new FormData();
        formData.append('name', name); //"Clave", valor --> name: Castillo
        formData.append('type', type);
        formData.append('measures', measures);
        formData.append('comment', comment);
        formData.append('price', price.toString());
        formData.append('img', imgFile);

        const response = await fetch("http://localhost:9000/muebles/", {
            method: "POST",
            headers: {
                "auth": token
            },
            body: formData
        });

        const newFurniture = await response.json();
        return newFurniture;
    } catch (error) {
        console.error("Error creating the furniture:", error);
        throw error;
    }
};

export const updateFurniture = async(id, name, type, measures, comment, price, imgFile) => {
    try{
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', type);
        formData.append('measures', measures);
        formData.append('comment', comment);
        formData.append('price', price.toString());
        formData.append('img', imgFile);

        const response = await fetch(`http://localhost:9000/muebles/${id}`, {
            method: "PUT",
            headers: {
                "auth": token
            },
            body: formData
        });

        const newFurniture = await response.json();
        return newFurniture;

    }catch(error){
        console.error("Error updating the furniture:", error);
        throw error;
    }
};

export const deleteFurniture = async(id) => {
    try{
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const response = await fetch(`http://localhost:9000/muebles/${id}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "auth": token,
            },
        });
        await response.json();

    } catch(error) {
        console.error("Error deleting the furniture: ", error);
        throw error;
    }
};