
const checkCategory = (event)=>{
    event.preventDefault();
    const items = event.target.textField.value;
    const itemsArr = items.split(',').map(item => item.trim())
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
    let html = arr.map((item,index)=>{
        return `<h1>${item[index][index].category}</h1><h3>${item[index][index].item_name}</h3>`
    })
    document.getElementById('orderedList').innerHTML=html.join("")
}



