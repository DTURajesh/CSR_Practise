const div = document.getElementById("container");
console.log(div);

function get_li(data) {
    let li = document.createElement('li'); // create a new list item
    li.appendChild(document.createTextNode(data)); // append the text to the li
    return li;
}


function createInputLabel(container, labelText, inputType, inputName, inputValue) {
   
    const label = document.createElement('label');
    label.textContent = labelText;

   
    const input = document.createElement('input');
    input.setAttribute('type', inputType);
    input.setAttribute('name', inputName);
    input.setAttribute('value', inputValue);

    container.appendChild(label);
    container.appendChild(input);
}
async function OnClick_Edit(data){
    
    div.innerHTML="";
   
     const form = document.createElement('form');
     const brTag= document.createElement('br');
     console.log()
     form.setAttribute('action', `/Blogs/${data._id}?_method=put`);
     form.setAttribute('method', 'post');
     
     createInputLabel(form, 'Tittle', 'text','Tittle', data.Tittle);
     form.appendChild(brTag);
     createInputLabel(form, 'Author','text', "Author", data.Author);
     form.appendChild(brTag);
     createInputLabel(form, 'Content','text', "Content", data.Content);
     form.appendChild(brTag);
     const submitButton = document.createElement('button');
     submitButton.setAttribute('type', 'submit');
      submitButton.textContent = 'Submit';
     form.appendChild(submitButton);

     div.appendChild(form);
 
}
async function OnClick(id){

     div.innerHTML="";
     console.log('Button was clicked!');
     console.log(`/Blogs/${id}`);
     const response = await fetch(`/Blogs/${id}`);
     const data= await response.json();
     
     let ul= document.createElement('ul');

     ul.appendChild( get_li(data.blog.Tittle));
     ul.appendChild( get_li(data.blog.Author));
     ul.appendChild( get_li(data.blog.Content));

     const button1 = document.createElement('button');
     button1.textContent = "Edit The Blog";
     const brTag= document.createElement('br');

     const button2 = document.createElement('button');
     button2.textContent = "Delete The Blog";
     
    button1.addEventListener('click', function(){
        OnClick_Edit(data.blog);
    });

    ul.appendChild(button1);
    ul.appendChild(brTag);
    ul.appendChild(button2);
     div.appendChild(ul);

}
function getNest_ul(data) {
    var ul = document.createElement('ul');
    let keys = Object.keys(data);
    keys.forEach((key) => {
       // ul.appendChild(getli(data[key]))
        if(key=='Tittle' || key=='Author' || key=='Content')
           ul.appendChild(get_li(data[key]))
    })

    console.log(data._id);
    const button = document.createElement('button');
    button.textContent = 'See More';
    button.addEventListener('click', function(){
        OnClick(data._id);
    });
    ul.appendChild(button);
    return ul;

}
async function render() {

    try {
        div.innerHTML="";
        const JsonData = await fetch('/Blogs');
        let data = await JsonData.json();
        //console.log(data);
        data = data.result;
        data.forEach(function (item) {
            div.appendChild( getNest_ul( item));
        });
    } catch (err) {
        console.log("Error is ", err);
    }

}

render();
