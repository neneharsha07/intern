const products = [
{
id:1,
name:"Laptop",
category:"Electronics",
price:50000,
image:"https://via.placeholder.com/250"
},
{
id:2,
name:"Smart Phone",
category:"Electronics",
price:25000,
image:"https://via.placeholder.com/250"
},
{
id:3,
name:"T-Shirt",
category:"Fashion",
price:800,
image:"https://via.placeholder.com/250"
},
{
id:4,
name:"Jeans",
category:"Fashion",
price:1500,
image:"https://via.placeholder.com/250"
},
{
id:5,
name:"JavaScript Book",
category:"Books",
price:600,
image:"https://via.placeholder.com/250"
},
{
id:6,
name:"Python Book",
category:"Books",
price:700,
image:"https://via.placeholder.com/250"
}
];

const productContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

function displayProducts(data){
productContainer.innerHTML="";

data.forEach(product=>{
const card=document.createElement("div");
card.classList.add("card");

card.innerHTML=`
<img src="${product.image}">
<h3>${product.name}</h3>
<p>Category: ${product.category}</p>
<p>₹${product.price}</p>
<button onclick="addToCart(${product.id})">
Add To Cart
</button>
`;

productContainer.appendChild(card);
});
}

function addToCart(id){
const item=products.find(p=>p.id===id);

cart.push(item);

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

alert(item.name + " Added To Cart");
}

function updateCartCount(){
cartCount.textContent=cart.length;
}

function filterProducts(){

let filtered=[...products];

const searchValue=
searchInput.value.toLowerCase();

const category=
categorySelect.value;

const sort=
sortSelect.value;

filtered=filtered.filter(product=>
product.name.toLowerCase()
.includes(searchValue)
);

if(category!=="all"){
filtered=filtered.filter(product=>
product.category===category
);
}

if(sort==="low"){
filtered.sort((a,b)=>
a.price-b.price
);
}

if(sort==="high"){
filtered.sort((a,b)=>
b.price-a.price
);
}

displayProducts(filtered);
}

searchInput.addEventListener(
"input",
filterProducts
);

categorySelect.addEventListener(
"change",
filterProducts
);

sortSelect.addEventListener(
"change",
filterProducts
);

displayProducts(products);
