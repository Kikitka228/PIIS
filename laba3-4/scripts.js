import { shirts } from './shirts.js';

function createTable(shirtsArray, containerId) {
    const container = document.getElementById(containerId);
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (let i = 0; i < shirtsArray.length; i++) {
        if (i % 3 === 0) {
            var row = document.createElement('tr');
        }

        const cell = document.createElement('td');
        const card = document.createElement('div');
        const name = document.createElement('h3');
        const img = document.createElement('img');
        const colors = document.createElement('span');
        const button1 = document.createElement('button');
        const button2 = document.createElement('button');

        name.textContent = shirtsArray[i].name ? shirtsArray[i].name : "Name not available";

        img.src = shirtsArray[i].colors?.white?.front ? shirtsArray[i].colors.white.front : "/123.jpeg";
        img.style.width = "150px";
        img.style.height = "170px";

        colors.textContent = shirtsArray[i].colors ?
            "Available in " + Object.keys(shirtsArray[i].colors).length + " colors" :
            "non-aviable colors";

        button1.textContent = "Quick View";
        button2.textContent = "See Page";

        button1.style.backgroundColor = '#B0C4DE'; // Light steel blue
        button1.style.color = 'black';
        button1.style.border = '2px solid black'; // Black border
        button1.style.borderRadius = '5px';
        button1.style.padding = '10px 20px';
        button1.style.cursor = 'pointer';
        button1.style.marginRight = '10px'; // Spacing between buttons

        button2.style.backgroundColor = '#B0C4DE'; // Light steel blue
        button2.style.color = 'black';
        button2.style.border = '2px solid black'; // Black border
        button2.style.borderRadius = '5px';
        button2.style.padding = '10px 20px';
        button2.style.cursor = 'pointer';

        button2.addEventListener("click", function() {
            const shirt = shirtsArray[i];
            const shirtData = encodeURIComponent(JSON.stringify(shirt));
            window.location.href = `details.html?shirt=${shirtData}`;
        });

        const modal = document.getElementById("modal");

        button1.addEventListener("click", function() {
            const modalContent = document.getElementById('modal');
            modalContent.innerHTML = '';

            const cell = document.createElement('td');
            const card = document.createElement('div');
            const name = document.createElement('h3');
            const price = document.createElement('h3');
            const imgFront = document.createElement('img');
            const imgBack = document.createElement('img');
            const buttonClose = document.createElement('button');

            buttonClose.textContent = "Close";
            buttonClose.style.backgroundColor = '#B0C4DE';
            buttonClose.style.color = 'black';
            buttonClose.style.border = '2px solid black';
            buttonClose.style.borderRadius = '5px';
            buttonClose.style.padding = '10px 20px';
            buttonClose.style.cursor = 'pointer';

            name.textContent = shirtsArray[i].name ? shirtsArray[i].name : "Name not available";
            price.textContent = shirtsArray[i].price ? shirtsArray[i].price : "Price not available";

            imgFront.src = shirtsArray[i].colors?.white?.front ? shirtsArray[i].colors.white.front : "/123.jpeg";
            imgFront.style.width = "150px";
            imgFront.style.height = "170px";

            imgBack.src = shirtsArray[i].colors?.white?.back ? shirtsArray[i].colors.white.back : "/123.jpeg";
            imgBack.style.width = "150px";
            imgBack.style.height = "170px";

            cell.style.borderRadius = '5px';
            cell.style.border = '2px solid black';
            cell.style.padding = '50px';

            card.appendChild(imgFront);
            card.appendChild(imgBack);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(buttonClose);
            cell.appendChild(card);
            modalContent.appendChild(cell);

            modal.style.display = "block";

            buttonClose.addEventListener("click", function() {
                modal.style.display = "none";
            });
        });

        const buttonsHolder = document.createElement('div');
        buttonsHolder.style.paddingTop = "30px";
        buttonsHolder.appendChild(button1);
        buttonsHolder.appendChild(button2);

        card.style.border = '2px solid black';
        card.style.borderRadius = '10px';
        card.style.padding = '10px';
        card.style.textAlign = 'center';

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(colors);
        card.appendChild(buttonsHolder);
        cell.appendChild(card);
        row.appendChild(cell);

        if (i % 3 === 2 || i === shirtsArray.length - 1) {
            tbody.appendChild(row);
        }
    }

    table.appendChild(tbody);
    container.appendChild(table);
}

createTable(shirts, 'tableId');