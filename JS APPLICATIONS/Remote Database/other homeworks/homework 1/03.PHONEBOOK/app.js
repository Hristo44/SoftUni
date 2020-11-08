function attachEvents() {
    const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
    let BtnLoad = document.getElementById("btnLoad");
    let ul = document.getElementById('phonebook');
    let btnCreate = document.getElementById('btnCreate')
    BtnLoad.addEventListener('click',()=>{
        ul.textContent = '';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                Object.entries(data).forEach(([keys, human])=>{
                    let li = document.createElement('li');
                    li.textContent = `${human.person}: ${human.phone}`;
                    let deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'DELETE';
                    deleteBtn.addEventListener('click',()=>{ deleteLogic(keys)});
                    li.appendChild(deleteBtn);
                    ul.appendChild(li);

                }) ; 
            });
    });

    btnCreate.addEventListener('click',create);

    function create(){
        let person = document.getElementById('person');
        let phone= document.getElementById('phone');
        let obj = {
            person: person.value,
            phone: phone.value,
        }
        fetch(url, { method: 'POST', body: JSON.stringify(obj)
    });
        person.value = '';
        phone.value = '';
          
    }

    function deleteLogic(keys){
        let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${keys}.json`;
        fetch(deleteUrl, { method: "DELETE" } );
        
    }

}

attachEvents();