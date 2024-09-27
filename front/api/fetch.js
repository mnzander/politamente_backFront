export const getFurnitures = async(page = 1, limit = 12) => {
    try{
        const url = `http://localhost:9000/muebles/?page=${page}&limit=${limit}`;
        console.log(url)
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const furnitures = await response.json();
        console.log(furnitures);
        return furnitures;
    } catch(error) {
        console.error("Error getting the furnitures...", error);
        throw error;
    }
};

export const getFurnitureFinder = async (value, page = 1, limit = 12) => {
    try{
        const url = `http://localhost:9000/muebles/find/${value}?page=${page}&limit=${limit}`;
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const furnitures = await response.json();
        return furnitures;
    } catch(error) {
        console.error("Error getting the furnitures...", error);
        throw error;
    }
};

export const getNewestFurnitures = async(page = 1, limit = 12) => {
    try{
        const url = `http://localhost:9000/muebles/novedades?page=${page}&limit=${limit}`;
        console.log(url);
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const furnitures = await response.json()
        console.log(furnitures);
        return furnitures;

    } catch(error) {
        console.error("Error getting the furnitures...", error);
        throw error;
    }
};

export const getCheapestFurnitures = async(page = 1, limit = 12) => {
    try{
        const url = `http://localhost:9000/muebles/precioAsc?page=${page}&limit=${limit}`;
        console.log(url);
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const furnitures = await response.json();
        console.log(furnitures);
        return furnitures;
    } catch(error) {
        console.error("Error getting the furnitures...", error);
        throw error;
    }
};

export const getCostlierFurnitures = async(page = 1, limit = 12) => {
    try{
        const url = `http://localhost:9000/muebles/precioDesc?page=${page}&limit=${limit}`;
        console.log(url);
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const furnitures = await response.json();
        console.log(furnitures);
        return furnitures;
    } catch(error) {
        console.error("Error getting the furnitures...", error);
        throw error;
    }
};

export const getFurnituresByType = async(type, page = 1, limit = 12) => {
    try{
        const url = `http://localhost:9000/muebles/${type}?page=${page}&limit=${limit}`;
        console.log(url);
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const furnitures = await response.json();
        console.log(furnitures);
        return furnitures;
    } catch(error) {
        console.error("Error getting the furnitures...", error);
        throw error;
    }
};

export const getFurnitureById = async(id) => {
    try{
        if(id) {
            const response = await fetch("http://localhost:9000/muebles/"+id, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const furniture = await response.json();
            return furniture;
        } else {
            console.error("There is no ID...", error);
            throw error;
        }

    } catch (error) {
        console.error("Error getting the furniture...", error);
        throw error;
    }
};

export const newsletterClient = async(email) => {
    try{
        const url = `http://localhost:9000/clients/newsletter/${email}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        await response.json();
        
    } catch (error){
        console.error("Error subscribing to the newsletter...", error);
        throw error;
    }
}