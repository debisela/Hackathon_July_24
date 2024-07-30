
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
    })
    .catch((error)=>{
        console.log(error);
    })
}



