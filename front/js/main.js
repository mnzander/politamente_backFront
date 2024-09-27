import { getFurnituresByType } from "../api/fetch.js";

document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1; //Pagina por defecto: 1
    let limit = 12; //Limite de productos por pagina: 12

    const main = document.querySelector("main"); //Declaramos el MAIN
    
    // Definimos los botones (Los del header y los del footer)
    const arcosBtns = document.querySelectorAll(".arcos-lnk");
    const bandejasBtns =  document.querySelectorAll(".bandejas-lnk");
    const basesBtns = document.querySelectorAll(".bases-lnk");
    const carritosBtns = document.querySelectorAll(".carritos-lnk");
    const cilindrosBtns = document.querySelectorAll(".cilindros-lnk");
    const cubosBtns = document.querySelectorAll(".cubos-lnk");
    const escalerasBtns = document.querySelectorAll(".escaleras-lnk");
    const letrasNumerosBtns = document.querySelectorAll(".letrasNumeros-lnk");
    const mesasBtns = document.querySelectorAll(".mesas-lnk");
    const panelesBtns = document.querySelectorAll(".paneles-lnk");
    const variosBtns = document.querySelectorAll(".varios-lnk");
    
    // Función para manejar la carga de productos en productos.html
    const loadProductsPage = () => {
        const type = new URL(window.location.href).searchParams.get('type'); 
        //Esto devuelve la parte de la URL que esta despues del '?': En nuestro caso type=[type]. Despues, con get("type") encuentra el que esta en la URL en este momento
        if (type) { //Si hay tipo en la URL
            loadFurnituresByType(type, currentPage, limit); //Mandamos cargar los productos pasando como parametro el tipo seleccionado, la pagina y el limite.
        }
    };

    // Eventos Click
    const handleButtonClick = (btns, type) => {
        btns.forEach(btn => { //Por cada grupo de botones... [arcos header, arcos footer], [...]
            btn.addEventListener("click", () => { //Haz un evento que escuche cuando se haga click en cualquier boton
                if (window.location.pathname === '/productos.html') { //Si estamos en productos...
                    main.innerHTML = ""; //Limpia el contenedor MAIN
                    loadFurnituresByType(type, currentPage, limit); //Carga de nuevo los productos
                } else { //Si no
                    window.location.href = `productos.html?type=${type}`; //Dirigete a la pagina del tipo de producto clickado
                }
            });
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
            createTopPagination(type, furnitures.meta); 
            showFurnituresByType(furnitures.data);
            createBottomPagination(type, furnitures.meta);
        } catch (error) {
            console.error(`Error al cargar muebles de tipo ${type}:`, error);
            throw new Error(`Error al cargar muebles de tipo ${type}`);
        }
    };

    const createTopPagination = (type, meta) => {
        const topPaginationContainer = document.createElement("div");
        topPaginationContainer.className = "top-pagination";
    
        const prevButton = document.createElement("button");
        prevButton.ariaLabel = "Botón de página anterior";
        prevButton.textContent = "Anterior";
        prevButton.disabled = meta.currentPage <= 1;
        prevButton.onclick = () => {
            loadFurnituresByType(type, meta.currentPage - 1, limit);
            window.scrollTo(0, 0);
        };
    
        const currentPageSpan = document.createElement("span");
        currentPageSpan.textContent = meta.currentPage;
    
        const nextButton = document.createElement("button");
        nextButton.ariaLabel = "Botón de siguiente página"
        nextButton.textContent = "Siguiente";
        nextButton.disabled = meta.currentPage >= meta.pages;
        nextButton.onclick = () => {
            loadFurnituresByType(type, parseInt(meta.currentPage) + 1, limit);
            window.scrollTo(0, 0);
        };

        topPaginationContainer.appendChild(prevButton);
        topPaginationContainer.appendChild(currentPageSpan);
        topPaginationContainer.appendChild(nextButton);
        main.appendChild(topPaginationContainer);
    }

    const showFurnituresByType = (furnitures) => {
        const container = document.createElement("div");
        furnitures.forEach(furniture => {
            container.className = furniture.type;

            const marco = document.createElement("div");
            marco.className = "marco";
            const randomRotation = Math.random() * 4 - 2;
            marco.style.transform = `rotateZ(${randomRotation}deg)`;

            marco.addEventListener("mouseenter", () =>{
                marco.style.transform = `scale(1.05) rotateZ(${randomRotation}deg) rotateY(180deg)`;
                marco.style.transition = "0.5s ease-in"
                frontSide.style.display = "none";
                backSide.style.transform = "rotateY(180deg)";
                backSide.style.display = "block"

            });

            marco.addEventListener("mouseleave", () => {
                marco.style.transform = `rotateZ(${randomRotation}deg)`;
                frontSide.style.display = "block";
                backSide.style.display = "none"
            });

            // PARTE DELANTERA:
            const frontSide = document.createElement("div");
            frontSide.classList = "front-side";
            frontSide.style.display = "block";
    
            const photo = document.createElement("div");
            photo.className = "photo";
            photo.style.backgroundImage = `url(http://localhost:9000${furniture.img})`;
    
            const description = document.createElement("div");
            description.className = "description";
    
            const name = document.createElement("p");
            name.className = "title";
            name.textContent = furniture.name;
    
            const price = document.createElement("p");
            price.className = "price";
            price.textContent = `${furniture.price}€`;
    
            description.appendChild(name);
            // description.appendChild(price);
            frontSide.appendChild(photo);
            frontSide.appendChild(description);

            //PARTE TRASERA:
            const backSide = document.createElement("div");
            backSide.className = "back-side";
            backSide.style.display = "none";

            const title = document.createElement("p");
            title.className = "back-title";
            title.textContent = "Detalle del producto:";

            const backName = document.createElement("p");
            backName.className = "back-name";
            backName.innerHTML = `<b>Nombre:</b> ${furniture.name}`;

            const measures = document.createElement("p");
            measures.className = "measures";
            measures.innerHTML = `<b>Medidas:</b> ${furniture.measures}`;

            const comment = document.createElement("p");
            comment.className = "comment";
            if (furniture.comment !== undefined) {
                comment.innerHTML = `<b>Comentario:</b> ${furniture.comment}`;
            }

            const backPrice = document.createElement("p");
            backPrice.className = "back-price";
            backPrice.innerHTML = `<b>Precio:</b> ${furniture.price}€`;

            backSide.appendChild(title);
            backSide.appendChild(backName);
            backSide.appendChild(measures);
            backSide.appendChild(backPrice);
            backSide.appendChild(comment);

            marco.appendChild(frontSide);
            marco.appendChild(backSide);
            container.appendChild(marco);
        });
        main.appendChild(container);
    };

    const createBottomPagination = (type, meta) => {
        const bottomPaginationContainer = document.createElement("div");
        bottomPaginationContainer.className = "pagination";

        if (meta.total < 10 && meta.total > 3) {
            main.style.height = "140vh";
            bottomPaginationContainer.style.top = "90%";
        }

        if (meta.total < 4) {
            main.style.height = "85vh";
            bottomPaginationContainer.style.top = "85%";
        }
    
        const prevBottomButton = document.createElement("button");
        prevBottomButton.ariaLabel = "Botón de página anterior";
        prevBottomButton.textContent = "Anterior";
        prevBottomButton.disabled = meta.currentPage <= 1;
        prevBottomButton.onclick = () => {
            loadFurnituresByType(type, meta.currentPage - 1, limit);
            window.scrollTo(0, 0);
        };

    
        const currentPageSpanBottom = document.createElement("span");
        currentPageSpanBottom.textContent = meta.currentPage;
    
        const nextBottomButton = document.createElement("button");
        nextBottomButton.ariaLabel = "Botón de siguiente página"
        nextBottomButton.textContent = "Siguiente";
        nextBottomButton.disabled = meta.currentPage >= meta.pages;
        nextBottomButton.onclick = () => {
            loadFurnituresByType(type, parseInt(meta.currentPage) + 1, limit);
            window.scrollTo(0, 0);
        };
        bottomPaginationContainer.appendChild(prevBottomButton);
        bottomPaginationContainer.appendChild(currentPageSpanBottom);
        bottomPaginationContainer.appendChild(nextBottomButton);
        main.appendChild(bottomPaginationContainer);
    }

    //Llamadas a la funcion Click
    handleButtonClick(arcosBtns, "arcos");
    handleButtonClick(bandejasBtns, "bandejas");
    handleButtonClick(basesBtns, "bases");
    handleButtonClick(carritosBtns, "carros");
    handleButtonClick(cilindrosBtns, "cilindros");
    handleButtonClick(cubosBtns, "cubos");
    handleButtonClick(escalerasBtns, "escaleras");
    handleButtonClick(letrasNumerosBtns, "letras_numeros");
    handleButtonClick(mesasBtns, "mesas");
    handleButtonClick(panelesBtns, "paneles");
    handleButtonClick(variosBtns, "varios");

    // Cargar productos
    loadProductsPage();
});