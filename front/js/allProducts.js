import { getFurnitures } from "../api/fetch.js";

document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    let limit = 12;

    const main = document.querySelector("main");
    const productosBtn = document.querySelector(".productos-lnk");

    productosBtn.addEventListener("click", () => {
        if (window.location.pathname === '/front/pages/productos.html') {
            main.innerHTML = "";
            loadAllFurnitures(currentPage, limit);
        } else {
            window.location.href = "/front/pages/productos.html";
            loadAllFurnitures(currentPage, limit);
        };
    });

    const loadAllFurnitures = async (page = currentPage, limit = limit) => {
        try{
            const furnitures = await getFurnitures(page, limit);

            if(!furnitures || !furnitures.data) {
                throw new Error("No se obtuvieron muebles");
            }

            main.innerHTML = "";
            showAllFurnitures(furnitures.data, furnitures.meta);
        } catch(error){
            console.error("Error al cargar los muebles:", error);
            alert("Ha ocurrido un error al cargar los muebles. Por favor, inténtelo de nuevo.");
        }
    };

    const showAllFurnitures = (furnitures, meta) => {
        const container = document.createElement("div");
        container.className = "products-container";
    
        const paginationContainer = document.createElement("div");
        paginationContainer.className = "pagination";
    
        const prevButton = document.createElement("button");
        prevButton.textContent = "Anterior";
        prevButton.disabled = meta.currentPage <= 1;
        prevButton.onclick = () => loadAllFurnitures(meta.currentPage - 1, limit);
        paginationContainer.appendChild(prevButton);
    
        const currentPageSpan = document.createElement("span");
        currentPageSpan.textContent = meta.currentPage;
        paginationContainer.appendChild(currentPageSpan);
    
        const nextButton = document.createElement("button");
        nextButton.textContent = "Siguiente";
        nextButton.disabled = meta.currentPage >= meta.pages;
        nextButton.onclick = () => loadAllFurnitures(parseInt(meta.currentPage) + 1, limit);
        paginationContainer.appendChild(nextButton);
    
        furnitures.forEach(furniture => {
            const marco = document.createElement("div");
            marco.className = "marco";
    
            const photo = document.createElement("div");
            photo.className = "photo";
            photo.style.backgroundImage = `url(http://localhost:9000${furniture.img})`;
    
            const description = document.createElement("div");
            description.className = "description";
    
            const title = document.createElement("p");
            title.className = "title";
            title.textContent = furniture.name;
    
            const price = document.createElement("p");
            price.className = "price";
            price.textContent = `${furniture.price}€`;
    
            description.appendChild(title);
            description.appendChild(price);
    
            marco.appendChild(photo);
            marco.appendChild(description);
            container.appendChild(marco);
        });
        main.innerHTML = "";
        container.appendChild(paginationContainer);
        main.appendChild(container);
    };

    if (window.location.pathname.endsWith('/productos.html') && !window.location.search) {
        main.innerHTML = "";
        loadAllFurnitures(currentPage, limit);
    }
});