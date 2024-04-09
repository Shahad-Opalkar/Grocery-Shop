let carts = document.querySelectorAll('.add-cart');

let products =[
{ name: "SugarCane juice" ,tag:"Sj", price : 40 , inCart:0},
{ name: "Berry Crush" ,tag:"BC", price :200 , inCart:0},
{ name: "Mint Lime" ,tag:"ML", price : 40, inCart:0},
{name: "Hazelnut cold coffee" , tag:"HCC",price : 100 , inCart:0}, 
{name: "Spiced Buttermilk" ,tag:"SB", price :40 , inCart:0},
{name: "Mango Lassi" , tag:"Sj",price : 100 , inCart:0},
{name: "Dragon Fruit Chiller" , tag:"DFC",price : 200, inCart:0},
{name: "Blue tea" , tag:"BT",price : 100 , inCart:0}
];
for(let i=0; i< carts.length;i++)
{
    carts[i].addEventListener('click' , () =>
    {
        cartNumber(products[i]);
        totalCost(products[i]);
    })
}
function cartNumber(product)
{
let productNumbers = localStorage.getItem('cartNumbers');

productNumbers = parseInt(productNumbers);

if( productNumbers )
{
    localStorage.setItem('cartNumbers', productNumbers + 1 );
    document.querySelector('.cart span').textContent = productNumbers+1;
}
else
{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.top-right span').textContent =1;
}


setItems(product)

}

function setItems(product)
{
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null)
    {   
        if(cartItems[product.tag] == undefined)
        {
            cartItems={

                ...cartItems,

                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else
    {
        product.inCart = 1;
             cartItems = {
                 [product.tag]:product
                         }
    }
   
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product)
{
    //console.log("The products price is",product.price)
    let cartCost = localStorage.getItem('totalCost');
    console.log("my cart cost is ", cartCost);
    
    if(cartCost != null)
   {
        cartCost= parseInt(cartCost);
        localStorage.setItem("totalCost", (cartCost + product.price));
   }else
   {
        localStorage.setItem("totalCost", product.price);
   }


   
}
function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || {};
    let productContainer = document.querySelector(".products");

    if (productContainer) {
        productContainer.innerHTML = '';

        Object.values(cartItems).forEach(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <ion-icon name="close-circle-outline" class="remove-item" data-tag="${item.tag}"></ion-icon>
                    <img src="./images/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class="price">Rs ${item.price}.00</div>
                <div class="quantity">
                    <ion-icon name="caret-back-circle-outline" class="decrease-quantity" data-tag="${item.tag}"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon name="caret-forward-circle-outline" class="increase-quantity" data-tag="${item.tag}"></ion-icon>
                </div>
                <div class="total">Rs ${item.inCart * item.price}.00</div>
            `;
        });

        let basketTotal = Object.values(cartItems).reduce((total, item) => total + (item.inCart * item.price), 0);
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">Rs ${basketTotal}.00</h4>
            </div>
        `;
    }

    // Event listeners for increasing, decreasing quantities, and removing items
    productContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase-quantity')) {
            let tag = event.target.dataset.tag;
            cartItems[tag].inCart++;
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        } else if (event.target.classList.contains('decrease-quantity')) {
            let tag = event.target.dataset.tag;
            if (cartItems[tag].inCart > 1) {
                cartItems[tag].inCart--;
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        } else if (event.target.classList.contains('remove-item')) {
            let tag = event.target.dataset.tag;
            delete cartItems[tag];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        }
    });
}
