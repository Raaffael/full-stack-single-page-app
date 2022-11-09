

let $getAllButton = $('#getAll');
let $getOneButton = $('#getOne');
let $postButton = $('#post');
let $patchButton = $('#patch');
let $deleteButton = $('#delete');

$getAllButton.click(function(){
    let response = fetch('http://localhost:3000/items',{
        mode:'no-cors',
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(function(res){
        res.json();
    }).then(function(data){
        console.log(data);
    })
})
$getOneButton.click(function(){
    
})
$postButton.click(function(){
    
})
$patchButton.click(function(){
    
})
$deleteButton.click(function(){
    
})