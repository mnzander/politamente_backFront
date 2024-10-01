import { getFurnitureFinder } from "../../front/api/fetch.js";
import { getFurnituresForAdmins } from "../api/fetch.js";

document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    let limit = 12;
    let number = 1;
    let currentFilter = null;

    const header = document.querySelector("header");
    const main = document.querySelector(".main");
    
    const topPaginationContainer = document.createElement("div");
    topPaginationContainer.className = "top-pagination";

    const searchContainer = document.createElement("div");
    searchContainer.className = "search";

    const productContainer = document.querySelector(".product-container");

    const bottomPaginationContainer = document.createElement("div");
    bottomPaginationContainer.className = "bottom-pagination";

    const loadFurnitures = async (page = currentPage, limit = 12, filter = currentFilter) => {
        try{
            let furnitures;

            if (filter &&  filter.length > 0) {
                furnitures = await getFurnitureFinder(filter, page, limit);
                showFurnitures(furnitures.data);
                number = 1;
            } else {
                furnitures = await getFurnituresForAdmins(page, limit);
                let searchField = document.querySelector(".field");
                if(!searchField) {
                    searchField = createSearchField();
                }
            }

            showFurnitures(furnitures.data)
            createTopPagination(furnitures.meta, furnitures.data);
            createBottomPagination(furnitures.meta, furnitures.data);

        } catch(error) {
            console.error("Error loading furniture data:", error);
        }
    };

    const createTopPagination = (meta, furnitures) => {
        topPaginationContainer.innerHTML = "";

        const prevButton = document.createElement("button");
        prevButton.ariaLabel = "Botón de página anterior";
        prevButton.textContent = "Anterior";
        prevButton.disabled = meta.currentPage <= 1;
        prevButton.onclick = () => {
            loadFurnitures(meta.currentPage - 1, limit);
            let resta = limit + furnitures.length;
            number -= resta;
            window.scrollTo(0, 0);
        };
    
        const currentPageSpan = document.createElement("span");
        currentPageSpan.textContent = meta.currentPage;
    
        const nextButton = document.createElement("button");
        nextButton.ariaLabel = "Botón de siguiente página";
        nextButton.textContent = "Siguiente";
        nextButton.disabled = meta.currentPage >= meta.pages || meta.total <= limit;
        nextButton.onclick = () => {
            loadFurnitures(parseInt(meta.currentPage) + 1, limit);
            window.scrollTo(0, 0);
        };

        topPaginationContainer.appendChild(prevButton);
        topPaginationContainer.appendChild(currentPageSpan);
        topPaginationContainer.appendChild(nextButton);
        main.appendChild(topPaginationContainer);
    };

    const createSearchField = () => {    
        const field = document.createElement("input");
        field.type = "text";
        field.className = "field";
        field.placeholder = "Buscador de muebles...";
        let searchTerm = "";
    
        field.addEventListener('input', (e) => {
            searchTerm = e.target.value.trim().toLowerCase();
            if (searchTerm.length > 0) {
                loadFurnitures(1, limit, searchTerm);
            } else {
                currentFilter = null;
                loadFurnitures();
                number = 1;
            }
        });
    
        searchContainer.appendChild(field);
        main.appendChild(searchContainer);
    };

    const showFurnitures = (furnitures) => {
        productContainer.innerHTML = "";
        furnitures.forEach(furniture => {
            const productRow = document.createElement("div");
            productRow.className= "product-row"

            const rowNumber = document.createElement("div");
            rowNumber.className = "number";
            rowNumber.textContent = number++;

            const rowImg = document.createElement("div");
            rowImg.className = "img";

            const img = document.createElement("img");
            img.className = "imagen"
            img.src = `http://localhost:9000${furniture.img}`;
            img.style.border = ".2rem solid #99c7eb";
            
            const rowTitle = document.createElement("div");
            rowTitle.className = "title";
            rowTitle.textContent = furniture.name;

            const rowMeasures = document.createElement("div");
            rowMeasures.className = "measures";
            rowMeasures.textContent = furniture.measures;

            const rowComment = document.createElement("div");
            rowComment.className = "comment";
            if(furniture.comment === undefined){
                rowComment.textContent = "Sin comentarios";
            } else {
                rowComment.textContent = furniture.comment;
            }

            const rowPrice = document.createElement("div");
            rowPrice.className = "price";
            rowPrice.textContent = `${furniture.price}€`;

            const rowEdit = document.createElement("div");
            rowEdit.className = "edit";
            rowEdit.innerHTML = `<button class="edit-btn"><svg class="edit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>`;

            const rowDelete = document.createElement("div");
            rowDelete.className = "delete";
            rowDelete.innerHTML = `<button class="delete-btn"><svg class="delete-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>`;

            const deleteAlert = document.querySelector(".delete-alert");
            const deleteBtn = rowDelete.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                header.style.pointerEvents = "none";
                header.style.opacity = "0.1";
                header.style.transition = 'opacity 0.3s ease-in-out';
                
                searchContainer.style.pointerEvents = "none";
                searchContainer.style.opacity = "0.1";
                searchContainer.style.transition = 'opacity 0.3s ease-in-out';

                topPaginationContainer.style.pointerEvents = "none";
                topPaginationContainer.style.opacity = "0.1";
                topPaginationContainer.style.transition = 'opacity 0.3s ease-in-out';

                bottomPaginationContainer.style.pointerEvents = "none";
                bottomPaginationContainer.style.opacity = "0.1";
                bottomPaginationContainer.style.transition = 'opacity 0.3s ease-in-out';

                productContainer.style.pointerEvents = "none";
                productContainer.style.opacity = '0.1';
                productContainer.style.transition = 'opacity 0.3s ease-in-out';

                deleteAlert.style.display = "block";
            });

            const doNotDelete = document.querySelector(".delete-no-btn");
            doNotDelete.addEventListener("click", () => {
                deleteAlert.style.display = "none";

                header.style.pointerEvents = "auto";
                header.style.opacity = "1";
                header.style.transition = 'opacity 0.3s ease-in-out';
                
                searchContainer.style.pointerEvents = "auto";
                searchContainer.style.opacity = "1";
                searchContainer.style.transition = 'opacity 0.3s ease-in-out';

                topPaginationContainer.style.pointerEvents = "auto";
                topPaginationContainer.style.opacity = "1";
                topPaginationContainer.style.transition = 'opacity 0.3s ease-in-out';

                bottomPaginationContainer.style.pointerEvents = "auto";
                bottomPaginationContainer.style.opacity = "1";
                bottomPaginationContainer.style.transition = 'opacity 0.3s ease-in-out';

                productContainer.style.pointerEvents = "auto";
                productContainer.style.opacity = '1';
                productContainer.style.transition = 'opacity 0.3s ease-in-out';
            });

            rowImg.append(img);
            productRow.appendChild(rowNumber);
            productRow.appendChild(rowImg);
            productRow.appendChild(rowTitle);
            productRow.appendChild(rowMeasures);
            productRow.appendChild(rowComment);
            productRow.appendChild(rowPrice);
            productRow.appendChild(rowEdit);
            productRow.appendChild(rowDelete);

            productContainer.appendChild(productRow);
        });
        main.appendChild(productContainer);
    };

    const createBottomPagination = (meta, furnitures) => {
        bottomPaginationContainer.innerHTML = "";
    
        const prevBottomButton = document.createElement("button");
        prevBottomButton.ariaLabel = "Botón de página anterior";
        prevBottomButton.textContent = "Anterior";
        prevBottomButton.disabled = meta.currentPage <= 1;
        prevBottomButton.onclick = () => {
            loadFurnitures(meta.currentPage - 1, limit);
            let resta = limit + furnitures.length;
            number -= resta;
            window.scrollTo(0, 0);
        };
    
        const currentPageSpanBottom = document.createElement("span");
        currentPageSpanBottom.textContent = meta.currentPage;
    
        const nextBottomButton = document.createElement("button");
        nextBottomButton.ariaLabel = "Botón de siguiente página";
        nextBottomButton.textContent = "Siguiente";
        nextBottomButton.disabled = meta.currentPage >= meta.pages || meta.total <= limit;
        nextBottomButton.onclick = () => {
            loadFurnitures(parseInt(meta.currentPage) + 1, limit);
            window.scrollTo(0, 0);
        };

        bottomPaginationContainer.appendChild(prevBottomButton);
        bottomPaginationContainer.appendChild(currentPageSpanBottom);
        bottomPaginationContainer.appendChild(nextBottomButton);
        main.appendChild(bottomPaginationContainer);
    };

    loadFurnitures(1, limit);
});