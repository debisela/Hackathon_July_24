
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
        renderList(data);
    })
    .catch((error)=>{
        console.log(error);
    })
}

function renderList(arr){
    //order by category
    const groupItems = arr.reduce((acc, item)=>{
        const category = item.category;
        if(!acc[category]){
            acc[category] = []
        }
        acc[category].push(item.item_name)
        return acc;
    }, {})
    let html = Object.entries(groupItems).map(([category, items])=>{
        let htmlContent = `<div>
                <h1>${category}</h1>
                <ul>
                    ${items.map(item => `<li><span>
                        ${item}</span>
                        <input type="checkbox" name="inCart" value="${item}"> In Cart
                            <input type="checkbox" name="notFound" value="${item}"> Not Found
                        </li>`)
                        .join('')}
                </ul>
            </div>
        `
        return htmlContent;
    })
    document.getElementById('orderedList').innerHTML=html.join("")
}



