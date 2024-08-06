let originalData = [];
let itemStates = {};

const checkCategory = (event)=>{
    event.preventDefault();
    document.getElementById('inputText').innerHTML=`${``}`
    const items = event.target.textField.value;
    const itemsArr = items.split(/[,./:]/).map(item => item.trim())
    console.log(items);
    fetch('http://localhost:3200/groceries',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({itemsArr})
    })
    .then(res =>res.json())
    .then(data =>{
        console.log(data);
        originalData = data;
        renderList(originalData);
    })
    .catch((error)=>{
        console.log(error);
    })
}

function renderList(arr){
    //order by category
    const groupItems = arr.reduce((acc, {results})=>{
        results.forEach(({category, item_name}) => {
        if(!acc[category]){
            acc[category] = new Set();
        }
        acc[category].add(item_name);
    });
        return acc;
    }, {});
    let html = Object.entries(groupItems).map(([category, itemsSet])=>{
        const items = Array.from(itemsSet);
        // let htmlContent = `<div>
        //         <h2>${category}</h2>
        //         <ul>
        //             ${items.map(item => `<li><span>
        //                 ${item}</span>
        //                 <input type="radio" name="${item}" value="inCart" onchange="updateNotFoundItems('${item}','${category}', this)"> In Cart
        //                     <input type="radio" name="${item}" value="notFound" onchange="updateNotFoundItems('${item}','${category}', this)"> Not Found
        //                 </li>`)
        //                 .join('')}
        //         </ul>
        //     </div>
        // `
        let htmlContent = `<div>
                <h2>${category}</h2>
                <ul>
                    ${items.map(item => {
                        const itemKey = `${item}-${category}`;
                        return `
                            <li><span>${item}</span>
                            <input type="radio" name="${itemKey}" value="inCart" ${itemStates[itemKey] === 'inCart' ? 'checked' : ''} onchange="updateNotFoundItems('${item}', '${category}', this)"> In Cart
                            <input type="radio" name="${itemKey}" value="notFound" ${itemStates[itemKey] === 'notFound' ? 'checked' : ''} onchange="updateNotFoundItems('${item}', '${category}', this)"> Not Found
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        `;

        return htmlContent;
    })
    document.getElementById('orderedList').innerHTML=html.join("")
    document.getElementById('notFoundList').innerHTML=`<div><button id="hideFound" onclick ="hideFound(event)">show only not found</button></div>`
}

let notFoundItems = [];

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

    // Format notFoundItems to match the structure expected by renderList
    const formattedNotFoundItems = notFoundItems.map(item => ({
        results: [item]
    }));

    renderList(formattedNotFoundItems);
    document.getElementById('notFoundList').innerHTML=`<div><button id="showAll" onclick ="showAll(event)">show all</button></div>`
}

const showAll = (event) => {
    event.preventDefault();
    console.log(notFoundItems);
    renderList(originalData);
}



