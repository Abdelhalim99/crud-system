let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.getElementById("total");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

let dataproduct;
if (localStorage.product != null) {
  dataproduct = JSON.parse(localStorage.product);
} else {
  dataproduct = [];
}

submit.onclick = function () {
  let newproduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if(title.value != '' && price.value!=''  && category.value!='')
  {
    if (mood === "create") {
      if (newproduct.count > 1) {
        for (let i = 0; i < newproduct.count; i++) {
          dataproduct.push(newproduct);
        }
      } else {
        dataproduct.push(newproduct);
      }
    } else {
      dataproduct[tmp] = newproduct;
      count.style.display = "block";
      submit.innerHTML = "Create";
    }
  }

  localStorage.setItem("product", JSON.stringify(dataproduct));
  console.log(dataproduct);

  cleardata();
  showdata();
};

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showdata() {
  gettotal();
  let table = "";
  for (let i = 0; i < dataproduct.length; i++) {
    table += `
     <tr>
                        <td>${i+1}</td>
                        <td>${dataproduct[i].title}</td>
                        <td>${dataproduct[i].price}</td>
                        <td>${dataproduct[i].taxes}</td>
                        <td>${dataproduct[i].ads}</td>
                        <td>${dataproduct[i].discount}%</td>
                        <td>${dataproduct[i].total}</td>
                        <td>${dataproduct[i].category}</td>
                        <td><button onclick="updatedata(${i})">update</button></td>
                        <td><button onclick="deletedata1(${i})">delete</button></td>
                    </tr>
    `;
  }

  document.getElementById("tbdy").innerHTML = table;

  let deleteall = document.getElementById("deleteallbtn");
  if (dataproduct.length > 0) {
    deleteall.innerHTML = `<button onclick="deleteall()">Delete All ( ${dataproduct.length} ) </button>`;
  } else {
    deleteall.innerHTML = "";
  }
}
showdata();

function deletedata1(i) {
  dataproduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataproduct);
  showdata();
}

function deleteall() {
  localStorage.clear();
  dataproduct.splice(0);
  showdata();
}

function updatedata(i) {
  title.value = dataproduct[i].title;
  price.value = dataproduct[i].price;
  taxes.value = dataproduct[i].taxes;
  ads.value = dataproduct[i].ads;
  discount.value = dataproduct[i].discount;
  total.value = dataproduct[i].total;
  category.value = dataproduct[i].category;
  gettotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  tmp = i;
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchmood = "tittle";

function search1(id) {
  let search = document.getElementById("search");
  if (id == "searchtittle") {
    searchmood = "tittle";
    search.placeholder = "search by tittle";
  } else {
    searchmood = "category";
    search.placeholder = "search by category";
  }

  search.focus();
  search.value='';
  showdata();
}



function search2(value) {
  let table='';
  if (searchmood == 'tittle') {
    for(let i =0; i<dataproduct.length; i++){
      if(dataproduct[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
                           <td>${i}</td>
                           <td>${dataproduct[i].title}</td>
                           <td>${dataproduct[i].price}</td>
                           <td>${dataproduct[i].taxes}</td>
                           <td>${dataproduct[i].ads}</td>
                           <td>${dataproduct[i].discount}%</td>
                           <td>${dataproduct[i].total}</td>
                           <td>${dataproduct[i].category}</td>
                           <td><button onclick="updatedata(${i})">update</button></td>
                           <td><button onclick="deletedata1(${i})">delete</button></td>
                       </tr>
       `;
      }
    }
  }
  else {
    for(let i =0; i<dataproduct.length; i++){
      if(dataproduct[i].category.includes(value)){
        table += `
        <tr>
                           <td>${i}</td>
                           <td>${dataproduct[i].title}</td>
                           <td>${dataproduct[i].price}</td>
                           <td>${dataproduct[i].taxes}</td>
                           <td>${dataproduct[i].ads}</td>
                           <td>${dataproduct[i].discount}%</td>
                           <td>${dataproduct[i].total}</td>
                           <td>${dataproduct[i].category}</td>
                           <td><button onclick="updatedata(${i})">update</button></td>
                           <td><button onclick="deletedata1(${i})">delete</button></td>
                       </tr>
       `;
      }
    }
  }

  document.getElementById("tbdy").innerHTML = table;
}
