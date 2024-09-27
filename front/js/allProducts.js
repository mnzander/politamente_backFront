import { getCheapestFurnitures, getCostlierFurnitures, getFurnitureFinder, getFurnitures, getNewestFurnitures } from "../api/fetch.js";

document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    let limit = 12;
    let currentFilter = null;
    let currentOption = null;

    const main = document.querySelector("main");
    
    const productosBtn = document.querySelector(".productos-lnk");

    const productsContainer = document.createElement("div");
    productsContainer.className = "products-container";

    const topPaginationContainer = document.createElement("div");
    topPaginationContainer.className = "top-pagination";

    const bottomPaginationContainer = document.createElement("div");
    bottomPaginationContainer.className = "pagination";

    productosBtn.addEventListener("click", () => {
        window.location.href = "/front/pages/productos.html";
        currentFilter = null;
        loadAllFurnitures(1, limit);
    });

    const loadAllFurnitures = async (page = currentPage, limit = 12, filter = currentFilter, option = currentOption) => {
        try {
            let furnitures;
            //BUSCADOR
            if (filter && filter.length > 0) {
                furnitures = await getFurnitureFinder(filter, page, limit);
                showAllFurnitures(furnitures.data);
            //FILTROS
            } else if (option !== null) {
                switch(option) {
                    case "novedades":
                        furnitures = await getNewestFurnitures(page, limit);
                        showAllFurnitures(furnitures.data);
                        break;
                    case "precio ascendente":
                        furnitures = await getCheapestFurnitures(page, limit);
                        showAllFurnitures(furnitures.data);
                        break;
                    case "precio descendente":
                        furnitures = await getCostlierFurnitures(page, limit);
                        showAllFurnitures(furnitures.data);
                        break;
                    default:
                        furnitures = await getFurnitures(page, limit);
                        showAllFurnitures(furnitures.data);
                } 
            //TODOS LOS PRODUCTOS
            } else {
                furnitures = await getFurnitures(page, limit);
                createFilters();
                let searchField = document.querySelector(".field");
                if (!searchField) {
                    searchField = createSearchField();
                }
            }

            showAllFurnitures(furnitures.data);
            createTopPagination(furnitures.meta, filter, option);
            createBottomPagination(furnitures.meta, filter, option);

            currentPage = page;
            currentFilter = filter || null;
    
            if (!furnitures || !furnitures.data) {
                throw new Error("No se obtuvieron muebles");
            }
    
        } catch (error) {
            console.error("Error al cargar los muebles:", error);
        }
    };

    const createFilters = (msg, selectedFilter) => {
        if (selectedFilter === undefined) {
            msg = "--Elige un filtro--"
        }

        const filterContainer = document.createElement("div");
        filterContainer.className = "filters-container";
    
        const filterLabel = document.createElement("label");
        filterLabel.textContent = "Filtros:";
        filterLabel.setAttribute("for", "filters")
    
        const filterSelect = document.createElement("select");
        filterSelect.id = "filters"
        filterSelect.name = "filters";
        filterSelect.className = "filters";
    
        const selectedOpt = document.createElement("option");
        selectedOpt.className = "selected-option";
        selectedOpt.value = `${msg}`;
        selectedOpt.textContent = `${msg}`;
        filterSelect.appendChild(selectedOpt);

        if (selectedFilter !== "por defecto") {
            const defaultOpt = document.createElement("option");
            defaultOpt.value = "por defecto";
            defaultOpt.textContent = "Por defecto";
            filterSelect.appendChild(defaultOpt);
        }

        if (selectedFilter !== "novedades") {
            const recentProducts = document.createElement("option");
            recentProducts.value = "novedades";
            recentProducts.textContent = "Novedades";
            filterSelect.appendChild(recentProducts);
        }
        
        if (selectedFilter !== "precio ascendente") {
            const priceAsc = document.createElement("option");
            priceAsc.value = "precio ascendente";
            priceAsc.textContent = "Precio Ascendente";
            filterSelect.appendChild(priceAsc);
        }

        if (selectedFilter !== "precio descendente") {
            const priceDesc = document.createElement("option");
            priceDesc.value = "precio descendente";
            priceDesc.textContent = "Precio Descendente";
            filterSelect.appendChild(priceDesc);
        }

        filterSelect.addEventListener("change", handleFilterChange); //Llamamos a la funcion cuando se aplique un filtro
    
        filterContainer.appendChild(filterLabel);
        filterContainer.appendChild(filterSelect);
        main.appendChild(filterContainer);
    };

    const handleFilterChange = async (e) => {
        const selectedValue = e.target.value;
        let msg = `Filtro ${selectedValue}`;
        
        createFilters(msg, selectedValue);
        
        switch(selectedValue) {
            case "novedades":
                loadAllFurnitures(1, limit, null, selectedValue);
                break;
            case "precio ascendente":
                loadAllFurnitures(1, limit, null, selectedValue);
                break;
            case "precio descendente":
                loadAllFurnitures(1, limit, null, selectedValue);
                break;
            case "por defecto":
                loadAllFurnitures(1, limit, null, selectedValue);
                break;
            default:
                loadAllFurnitures(1, limit, null, selectedValue);
        }
    };

    const createTopPagination = (meta, filter = null, option = null ) => {
        topPaginationContainer.innerHTML = "";
    
        const prevButton = document.createElement("button");
        prevButton.ariaLabel = "Botón de página anterior";
        prevButton.textContent = "Anterior";
        prevButton.disabled = meta.currentPage <= 1;
        prevButton.onclick = () => {
            loadAllFurnitures(meta.currentPage - 1, limit, filter, option);
            window.scrollTo(0, 0);
        };
    
        const currentPageSpan = document.createElement("span");
        currentPageSpan.textContent = meta.currentPage;
    
        const nextButton = document.createElement("button");
        nextButton.ariaLabel = "Botón de siguiente página";
        nextButton.textContent = "Siguiente";
        nextButton.disabled = meta.currentPage >= meta.pages || meta.total <= limit;
        nextButton.onclick = () => {
            loadAllFurnitures(parseInt(meta.currentPage) + 1, limit, filter, option);
            window.scrollTo(0, 0);
        };

        topPaginationContainer.appendChild(prevButton);
        topPaginationContainer.appendChild(currentPageSpan);
        topPaginationContainer.appendChild(nextButton);
        main.appendChild(topPaginationContainer);
    };

    const createSearchField = () => {
        const searchContainer = document.createElement("div");
        searchContainer.className = "search";
    
        const field = document.createElement("input");
        field.type = "text";
        field.className = "field";
        field.placeholder = "Buscador de muebles...";
        let searchTerm = "";
    
        field.addEventListener('input', (e) => {
            searchTerm = e.target.value.trim().toLowerCase();
            if (searchTerm.length > 0) {
                loadAllFurnitures(1, limit, searchTerm); // Now limit is available
            } else {
                currentFilter = null;
                loadAllFurnitures(); // Sin filtro
            }
        });
    
        searchContainer.appendChild(field);
        main.appendChild(searchContainer);
    };

    const showAllFurnitures = (furnitures) => {
        productsContainer.innerHTML = "";

        furnitures.forEach(furniture => {
            const marco = document.createElement("div");
            marco.className = "marco";
            const randomRotation = Math.random() * 4 - 2;
            marco.style.transform = `rotateZ(${randomRotation}deg)`;

            marco.addEventListener("mouseenter", () =>{
                marco.style.transform = `rotateZ(${randomRotation}deg) rotateY(180deg)`;
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
            productsContainer.appendChild(marco);
        });
        main.appendChild(productsContainer);
    };

    const createBottomPagination = (meta, filter = null, option = null) => {
        bottomPaginationContainer.innerHTML = "";
    
        const prevBottomButton = document.createElement("button");
        prevBottomButton.ariaLabel = "Botón de página anterior";
        prevBottomButton.textContent = "Anterior";
        prevBottomButton.disabled = meta.currentPage <= 1;
        prevBottomButton.onclick = () => {
            loadAllFurnitures(meta.currentPage - 1, limit, filter, option);
            window.scrollTo(0, 0);
        };
    
        const currentPageSpanBottom = document.createElement("span");
        currentPageSpanBottom.textContent = meta.currentPage;
    
        const nextBottomButton = document.createElement("button");
        nextBottomButton.ariaLabel = "Botón de siguiente página";
        nextBottomButton.textContent = "Siguiente";
        nextBottomButton.disabled = meta.currentPage >= meta.pages || meta.total <= limit;
        nextBottomButton.onclick = () => {
            loadAllFurnitures(parseInt(meta.currentPage) + 1, limit, filter, option);
            window.scrollTo(0, 0);
        };

        bottomPaginationContainer.appendChild(prevBottomButton);
        bottomPaginationContainer.appendChild(currentPageSpanBottom);
        bottomPaginationContainer.appendChild(nextBottomButton);
        main.appendChild(bottomPaginationContainer);
    };

    if (window.location.pathname.endsWith('/productos.html') && !window.location.search) {
        main.innerHTML = "";
        loadAllFurnitures(1, limit, currentFilter);
    }
});