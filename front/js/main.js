import { getFurnituresByType } from "../api/fetch.js";

document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    let limit = 12;

    const main = document.querySelector("main");
    
    // Definimos los botones
    const arcosBtn = document.querySelector(".arcos-lnk");
    const bandejasBtn =  document.querySelector(".bandejas-lnk");
    const basesBtn = document.querySelector(".bases-lnk");
    const carritosBtn = document.querySelector(".carritos-lnk");
    const cilindrosBtn = document.querySelector(".cilindros-lnk");
    const cubosBtn = document.querySelector(".cubos-lnk");
    const escalerasBtn = document.querySelector(".escaleras-lnk");
    const letrasNumerosBtn = document.querySelector(".letrasNumeros-lnk");
    const mesasBtn = document.querySelector(".mesas-lnk");
    const panelesBtn = document.querySelector(".paneles-lnk");
    const variosBtn = document.querySelector(".varios-lnk");
    
    // Función para manejar la carga de productos en productos.html
    const loadProductsPage = () => {
        const type = new URL(window.location.href).searchParams.get('type'); 
        //Esto devuelve la parte de la URL que esta despues del '?': En nuestro caso type=[type]. Despues, con get("type") encuentra el que esta en la URL en este momento
        if (type) {
            loadFurnituresByType(type, currentPage, limit);
        }
    };

    // Eventos Click
    const handleButtonClick = (btn, type) => {
        btn.addEventListener("click", () => {
            if (window.location.pathname === '/productos.html') {
                main.innerHTML = "";
                loadFurnituresByType(type, currentPage, limit);
            } else {
                window.location.href = `productos.html?type=${type}`;
            }
        });
    };

    // Cargar muebles por Tipo
    const loadFurnituresByType = async(type, page = currentPage, limit = 12) => {
        try {
            const furnitures = await getFurnituresByType(type, page, limit);
            
            if (!furnitures) {
                throw new Error(`No se obtuvieron muebles de tipo ${type}`);
            }
            main.innerHTML = "";  
            showFurnituresByType(type, furnitures.data, furnitures.meta);
        } catch (error) {
            console.error(`Error al cargar muebles de tipo ${type}:`, error);
            throw new Error(`Error al cargar muebles de tipo ${type}`);
        }
    };

    const showFurnituresByType = (type, furnitures, meta) => {
        const container = document.createElement("div");

        const paginationContainer = document.createElement("div");
        paginationContainer.className = "pagination";
    
        const prevButton = document.createElement("button");
        prevButton.textContent = "Anterior";
        prevButton.disabled = meta.currentPage <= 1;
        prevButton.onclick = () => loadFurnituresByType(type, meta.currentPage - 1, limit);
        paginationContainer.appendChild(prevButton);
    
        const currentPageSpan = document.createElement("span");
        currentPageSpan.textContent = meta.currentPage;
        paginationContainer.appendChild(currentPageSpan);
    
        const nextButton = document.createElement("button");
        nextButton.textContent = "Siguiente";
        nextButton.disabled = meta.currentPage >= meta.pages;
        nextButton.onclick = () => loadFurnituresByType(type, parseInt(meta.currentPage) + 1, limit);
        paginationContainer.appendChild(nextButton);

        furnitures.forEach(furniture => {
            container.className = furniture.type;

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
            main.appendChild(paginationContainer);
            main.appendChild(container);
        });
    };

    //Llamadas a la funcion Click
    handleButtonClick(arcosBtn, "arcos");
    handleButtonClick(bandejasBtn, "bandejas");
    handleButtonClick(basesBtn, "bases");
    handleButtonClick(carritosBtn, "carros");
    handleButtonClick(cilindrosBtn, "cilindros");
    handleButtonClick(cubosBtn, "cubos");
    handleButtonClick(escalerasBtn, "escaleras");
    handleButtonClick(letrasNumerosBtn, "letras_numeros");
    handleButtonClick(mesasBtn, "mesas");
    handleButtonClick(panelesBtn, "paneles");
    handleButtonClick(variosBtn, "varios");

    // Cargar productos
    loadProductsPage();
});