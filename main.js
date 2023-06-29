let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
// Fun get total 
function getTotal()
{
if (price.value !=''){
    let result = (+price.value + +taxes.value + +ads.value)
    - +discount.value;
    total.innerHTML= result;
    total.style.background= '#040'
}else{
    total.innerHTML='';
    total.style.background= '#a00d02'
}
}

//Fun create product 

let datapro=[];
if (localStorage.product != null){
    datapro= JSON.parse(localStorage.product)
}else{
    datapro=[];
}
//بضيف منتج جديد من خلالها
submit.onclick=function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value !=''
    && price.value !=''
    &&category.value !=''
    &&newPro.count<100){
            if(mood === 'create'){
        if (newPro.count>1){
            for(let i = 0 ; i<newPro.count; i++){
            datapro.push(newPro)//منتج بعدد اللفات
            }
    }else{
        datapro.push(newPro);
    }
}else{
    datapro[tmp]=newPro;
    mood='create';
    submit.innerHTML='Create';
    count.style.display='block';
}
    clearData() //عشان ميمسحش البيانات
} 

    
    


//Fun save data in local storage
localStorage.setItem('product', JSON.stringify(datapro))

showData()
}
//Fun clear data

function clearData(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}

//read 
function showData(){
    getTotal()
let table=''; //المنتجات في اللوب تتخزن في التابل
for(let i =0; i < datapro.length ;i++){
    table +=`
    <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
    `;
}
document.getElementById('tbody').innerHTML=table;
let btnDelete = document.getElementById('deleteAll');
//عاوز اقوله لو فيه بيانات يحط في 
//المكان الي فوق زرار
if (datapro.length>0){
    btnDelete.innerHTML=`
    <button onclick="deleteAll()"> delete All (${datapro.length})</button>
    `
}else{//هحذف الزرار لو مفيش بيانات
    btnDelete.innerHTML='';
}
}
showData()

//delete
function deleteData(i){
    datapro.splice(i,1)//delete from array
    localStorage.product=JSON.stringify(datapro);
    showData()// بتحدثلي عشان تتمسح قبل ماعمل ريفرش
}

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showData()
}

// count



//update
function updateData (i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal()
    count.style.display='none';
    category.value=datapro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp=i; // عشان اقدر استخدمها في اي حتة في الكود
    scroll({
        top:0,
        behavior:"smooth",
    })
}

//search

let searchMood= 'title';
function getSearchMood(id)
{
    let search = document.getElementById('search');
if(id == 'searchTitle'){
    searchMood='title';
}else{
    searchMood='category';

}
search.placeholder = 'search by ' + searchMood ;
search.focus()
search.value='';
showData()
}
function searchData(value){
    let table = '';
    if(searchMood=='title'){
// هبحث على كل العناصر الي داخل الاراي 
        for(let i=0; i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                `;            }
        }
    }else{
        for(let i=0; i<datapro.length;i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                `;            }
        }
    }
    document.getElementById('tbody').innerHTML=table;

}


//clean data