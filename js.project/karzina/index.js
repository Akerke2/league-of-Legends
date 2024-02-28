function createProductCard(product) {
    // Create elements
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('id', product.id);
    cardDiv.classList.add('card');

    const boxCardDiv = document.createElement('div');
    boxCardDiv.classList.add('box-card');
    boxCardDiv.style.display = "flex"

    const cardImgDiv = document.createElement('div');
    cardImgDiv.classList.add('card-img');


    const img = document.createElement('img');
    img.setAttribute('src', product.img);
    img.setAttribute('alt', '');

    const pricePara = document.createElement('p');
    pricePara.classList.add('card_price');
    // pricePara.textContent = product.Sub_text;

    const padPanelDiv = document.createElement('div');
    padPanelDiv.classList.add('pad_panel');

    const addToCartBtn = document.createElement('button');
    // addToCartBtn.classList.add('add_btn');
    // addToCartBtn.textContent = 'ADD TO CART';

    const textCardDiv = document.createElement('div');
    textCardDiv.classList.add('text-card');

    const titleHeading = document.createElement('h2');
    titleHeading.classList.add('card_text_one');
    titleHeading.textContent = product.title;

    const textPara = document.createElement('p');
    textPara.classList.add('card_text');
    textPara.textContent = product.text;


    const closeButton = document.createElement("button");
    closeButton.innerHTML = 'x';
    closeButton.classList.add("remove-btn")

    // Construct the structure
    padPanelDiv.appendChild(addToCartBtn);
    cardImgDiv.appendChild(img);
    cardImgDiv.appendChild(pricePara);
    cardImgDiv.appendChild(padPanelDiv);

    textCardDiv.appendChild(titleHeading);
    textCardDiv.appendChild(textPara);

    boxCardDiv.appendChild(cardImgDiv);
    boxCardDiv.appendChild(textCardDiv);

    cardDiv.appendChild(boxCardDiv);
    cardDiv.appendChild(closeButton);



    return cardDiv;
}



const products = JSON.parse(localStorage.getItem('cart')) || []
const crt = document.querySelector(".cart-items")
products.forEach(i => {
    let card = createProductCard(i)
    crt.appendChild(card)
    removeCards(card, products)
})


function removeCards(card, products){
    let btn = card.children[1];
    btn.onclick=()=>{
        products = products.filter(p=>p.id!=btn.parentElement.id);
        localStorage.setItem("cart", JSON.stringify(products))
        btn.parentElement.remove()
    }
}