
const checkCategory = (event)=>{
    event.preventDefault();
    const item = event.target.textField.value;
    // const itemsArr = items.split(',').map(item => item.trim())
    console.log(item);
    fetch('http://localhost:3200/groceries',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({item})
    })
    .then(res =>res.json())
    .then(data =>{
        console.log(data[0].category);
    })
    .catch((error)=>{
        console.log(error);
    })
}



