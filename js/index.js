// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function  topFunction() {
  $("html, body").animate({ scrollTop: 0 }, 2000);
  return false;
}
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

//------------------------------------------Crud----------------------------------------------//
const ProductNameInput =document.getElementById('ProductNameInput');
const BrandNameInput =document.getElementById('BrandNameInput');
const SubCategoryInput =document.getElementById('SubCategoryInput');
const ProductCategoryInput =document.getElementById('ProductCategoryInput');
const ProductPriceInput =document.getElementById('ProductPriceInput');
const ProductDiscountInput =document.getElementById('ProductDiscountInput');
const ProductQuantityInput =document.getElementById('ProductQuantityInput');
const ProductDescriptionInput =document.getElementById('ProductDescriptionInput');
const ProductImage =document.getElementById('productImage');
const addProductBtn =document.getElementById('addProductBtn');
const SearchInput = document.getElementById('search_data');
const updateProductBtn =document.getElementById('updateProductBtn')

let ProductContainer = [];

if (localStorage.getItem('products') !== null) {
  ProductContainer = JSON.parse(localStorage.getItem('products'))
  display()
}


function addProduct() {
  if (check() , checkbrandname() , checkcategoryname() , checkdescriptionname() , checksubcategoryname() ,
  checkprice() , checkquantity() , checkdiscount()) {
    const Product = {
      name:ProductNameInput.value,
      brand:BrandNameInput.value,
      subcategory:SubCategoryInput.value,
      category:ProductCategoryInput.value,
      price:ProductPriceInput.value,
      discount:ProductDiscountInput.value,
      quantity:ProductQuantityInput.value,
      description:ProductDescriptionInput.value,
    }
    ProductContainer.push(Product)
    console.log(ProductContainer);
    localStorage.setItem('products' ,JSON.stringify(ProductContainer))
    display();
    clearinputs();
  }
  else {
    ProductNameInput.placeholder = `invalid`
    BrandNameInput.placeholder = `invalid`
    SubCategoryInput.placeholder = `invalid`
    ProductCategoryInput.placeholder = `invalid`
    ProductDescriptionInput.placeholder = `invalid`
    ProductPriceInput.placeholder = `invalid`
    ProductDiscountInput.placeholder = `invalid`
    ProductQuantityInput.placeholder = `invalid`
  }

}

addProductBtn.addEventListener('click' ,addProduct)

function display (){

  let space = '';

  for (let i = 0; i < ProductContainer.length; i++){
    
    space+= `
    <tr>
    <Td>${ProductContainer[i].name}</Td>
    <Td>${ProductContainer[i].brand}</Td>
    <Td>${ProductContainer[i].subcategory}</Td>
    <Td>${ProductContainer[i].category}</Td>
    <Td>${ProductContainer[i].price}</Td>
    <Td>${ProductContainer[i].discount}</Td>
    <Td>${ProductContainer[i].quantity}</Td>
    <Td>${ProductContainer[i].description}</Td>
    <Td><button onclick='setform(${i})' class="fas fa-pen-to-square btn btn-success"></button></Td>
    <Td><button onclick='Delete(${i})' class="btn btn-danger fa-xmark fas"></button></Td>        
</tr>
    `
  }
document.getElementById('Data').innerHTML = space ;
}
function Delete (index) {
  ProductContainer.splice(index,1)
  localStorage.setItem('products' ,JSON.stringify(ProductContainer))
  display()
}

function clearinputs() { 
  ProductNameInput.value = ''
  BrandNameInput.value = ''
  SubCategoryInput.value = ''
  ProductCategoryInput.value = ''
  ProductPriceInput.value = ''
  ProductDiscountInput.value = ''
  ProductQuantityInput.value = ''
  ProductDescriptionInput.value = ''
}

function searchProduct (term) {
  let space = '';

  for (let i = 0; i < ProductContainer.length; i++){
    if (ProductContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      space+= `
      <tr>
      <Td>${ProductContainer[i].name}</Td>
      <Td>${ProductContainer[i].brand}</Td>
      <Td>${ProductContainer[i].subcategory}</Td>
      <Td>${ProductContainer[i].category}</Td>
      <Td>${ProductContainer[i].price}</Td>
      <Td>${ProductContainer[i].discount}</Td>
      <Td>${ProductContainer[i].quantity}</Td>
      <Td>${ProductContainer[i].description}</Td>
      <Td><button class="fas fa-pen-to-square btn btn-success"></button></Td>
      <Td><button onclick='Delete(${i})' class="btn btn-danger fa-xmark fas"></button></Td>        
  </tr>
      `
    }
  document.getElementById('Data').innerHTML = space ;
    }

}

SearchInput.addEventListener('input' , ()=>{
  searchProduct(SearchInput.value)
} )

let x = 0;

function setform (index) {
  x =index
  ProductNameInput.value = ProductContainer[index].name;
  BrandNameInput.value = ProductContainer[index].brand;
  SubCategoryInput.value = ProductContainer[index].subcategory;
  ProductCategoryInput.value = ProductContainer[index].category;
  ProductPriceInput.value = ProductContainer[index].price;
  ProductDiscountInput.value = ProductContainer[index].discount;
  ProductQuantityInput.value = ProductContainer[index].quantity;
  ProductDescriptionInput.value = ProductContainer[index].description;
  addProductBtn.classList.add('d-none')
  updateProductBtn.classList.remove('d-none')
}

function updateProduct() {
  ProductContainer[x].name = ProductNameInput.value;
  ProductContainer[x].brand = BrandNameInput.value;
  ProductContainer[x].subcategory = SubCategoryInput.value;
  ProductContainer[x].category = ProductCategoryInput.value;
  ProductContainer[x].price = ProductPriceInput.value;
  ProductContainer[x].discount = ProductDiscountInput.value;
  ProductContainer[x].quantity = ProductQuantityInput.value;
  ProductContainer[x].description = ProductDescriptionInput.value;
  localStorage.setItem('products' , JSON.stringify(ProductContainer));
  addProductBtn.classList.remove('d-none');
  updateProductBtn.classList.add('d-none');
  display();
  localStorage.setItem('products' , JSON.stringify(ProductContainer));
  clearinputs();
}
updateProductBtn.addEventListener('click' , updateProduct)

function check() {
  let regx = /^\w{2,30}$/
  if(regx.test(ProductNameInput.value)){
    return true
  }
  else{
    return false
  }
}
function checkbrandname() {
  let regx = /^\w{2,15}$/
  if(regx.test(BrandNameInput.value)){
    return true
  }
  else{
    return false
  }
}
function checksubcategoryname() {
  let regx = /^\w{2,15}$/
  if(regx.test(SubCategoryInput.value)){
    return true
  }
  else{
    return false
  }
}
function checkcategoryname() {
  let regx = /^\w{2,15}$/
  if(regx.test(ProductCategoryInput.value)){
    return true
  }
  else{
    return false
  }
}
function checkdescriptionname() {
  let regx = /^\w{50,9999}$/
  if(regx.test(ProductDescriptionInput.value)){
    return true
  }
  else{
    return false
  }
}
function checkprice() {
  let regx = /^[0-9]+$/
  if(regx.test(ProductPriceInput.value)){
    return true
  }
  else{
    return false
  }
}
function checkdiscount() {
  let regx = /^[0-9]+$/
  if(regx.test(ProductDiscountInput.value)){
    return true
  }
  else{
    return false
  }
}
function checkquantity() {
  let regx = /^[0-9]+$/
  if(regx.test(ProductQuantityInput.value)){
    return true
  }
  else{
    return false
  }
}
//-------------------shopping cart---------------//
let get_data_from_api = async () => {
  let res = await fetch ("http://localhost:3000/product",{
    method:"get",
  }).then((res) => res.json());
  console.log(res);
}

window.addEventListener("DOMContentLoaded",() => {
  get_data_from_api();
});

