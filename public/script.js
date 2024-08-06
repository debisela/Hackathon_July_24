let originalData = [];
let notFoundItems = [];
let itemStates = {};

//handle submit of groceries list
const checkCategory = (event) => {
    event.preventDefault();
    document.getElementById('inputText').innerHTML = ``;
    const items = event.target.textField.value;
    //allow different dividers in list. create an array of the list:
    const itemsArr = items.split(/[,./:]/).map(item => item.trim());
    console.log(items);
    //post to server and get data back from db
    fetch('http://localhost:3200/groceries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemsArr })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        originalData = data;
        itemStates = {};
        renderList(originalData);
    })
    .catch((error) => {
        console.log(error);
    });
}

//function that displays in DOM the list divided into categories
function renderList(arr) {
    const groupItems = arr.reduce((acc, { results, multiple }) => {
        results.forEach(({ category, item_name }) => {
            if (multiple === 'true') {
                category = 'Multiple Matches';
            }
            if (!acc[category]) {
                acc[category] = new Set();
            }
            acc[category].add(item_name);
        });
        return acc;
    }, {});

    let html = Object.entries(groupItems).map(([category, itemsSet]) => {
        const items = Array.from(itemsSet);

        let htmlContent = `<div>
                <h2>${category}</h2>
                <ul>
                    ${items.map(item => {
                        const itemKey = `${item}-${category}`;
                        if (category === 'Multiple Matches') {
                            return `
                                <li>
                                    <span>${item}</span>
                                    <button onclick="selectItem('${item}', '${itemKey}')">Select</button>
                                    <button onclick="removeItem('${item}')">Remove</button>
                                </li>
                            `;
                        } else {
                            return `
                                <li>
                                    <span>${item}</span>
                                    <input type="radio" name="${itemKey}" value="inCart" ${itemStates[itemKey] === 'inCart' ? 'checked' : ''} onchange="updateNotFoundItems('${item}', '${category}', this)"> In Cart
                                    <input type="radio" name="${itemKey}" value="notFound" ${itemStates[itemKey] === 'notFound' ? 'checked' : ''} onchange="updateNotFoundItems('${item}', '${category}', this)"> Not Found
                                </li>
                            `;
                        }
                    }).join('')}
                </ul>
            </div>
        `;
        return htmlContent;
    }).join('');

    document.getElementById('orderedList').innerHTML = html;
    document.getElementById('notFoundList').innerHTML = `
        <div><button id="hideFound" onclick="hideFound(event)">Show Only Not Found</button></div>
    `;
    document.getElementById('startNewList').innerHTML = `
        <div><button id="startNew" onclick="startNew(event)">Start new list</button></div>
    `;
}

function selectItem(item, itemKey) {
    const selectedItem = originalData.find(data => data.results.some(result => result.item_name === item));
    if (selectedItem) {
        const selectedResult = selectedItem.results.find(result => result.item_name === item);
        const newCategory = selectedResult.category;

        // Remove item from 'Multiple Matches' category
        originalData.forEach(data => {
            data.results = data.results.filter(result => result.item_name !== item);
        });

        // Add item to the appropriate category
        originalData.push({ results: [{ item_name: item, category: newCategory }], multiple: 'false' });

        renderList(originalData);
    }
}

function removeItem(item) {
    // Remove item from originalData
    originalData.forEach(data => {
        data.results = data.results.filter(result => result.item_name !== item);
    });

    // Re-render the list
    renderList(originalData);
}

function updateNotFoundItems(item, category, radio) {
    const itemKey = `${item}-${category}`;
    itemStates[itemKey] = radio.value;

    const itemIndex = notFoundItems.findIndex(i => i.item_name === item && i.category === category);

    if (radio.checked && radio.value === 'notFound' && itemIndex === -1) {
        notFoundItems.push({ item_name: item, category: category });
    } else if (radio.checked && radio.value === 'inCart' && itemIndex !== -1) {
        notFoundItems.splice(itemIndex, 1);
    }
    console.log(notFoundItems);
}

const hideFound = (event) => {
    event.preventDefault();
    console.log(notFoundItems);

    const formattedNotFoundItems = notFoundItems.map(item => ({
        results: [item]
    }));

    renderList(formattedNotFoundItems);
    document.getElementById('notFoundList').innerHTML = `
        <div><button id="showAll" onclick="showAll(event)">Show All</button></div>
    `
}

const showAll = (event) => {
    event.preventDefault();
    console.log(notFoundItems);
    renderList(originalData);
}

const startNew = (event) => {
    event.preventDefault();
    originalData = [];
    notFoundItems = [];
    itemStates = {};
    document.getElementById('orderedList').innerHTML = ``;
    document.getElementById('notFoundList').innerHTML = ``;
    document.getElementById('startNewList').innerHTML = ``;
    document.getElementById('inputText').innerHTML = `<form id="myForm" onsubmit="checkCategory(event)">
        <textarea name="textField" id="textField" rows="10" cols="30">enter grocery list</textarea>
        <div>
        <button type="submit">submit</button>
    </div>
    </form>`;
}
