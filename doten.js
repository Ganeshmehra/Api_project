let allProducts = [];

const click2 = async () => {
    const Array1 = ["men's clothing", "jewelery", "electronics", "women's clothing"];
    allProducts = await Promise.all(Array1.map(category => fetchProducts(category)));
    AllProducts();
};

const fetchProducts = async (category) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return response.json();
};

const AllProducts = () => {
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";

    allProducts.forEach(products => {
        products.map((product, i) => {
            const div = createProductDiv(product, i);
            mainDiv.appendChild(div);
        });
    });
};

const ProductsCategory = () => {
    const selectedCategory = document.querySelector('select').value;
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";

    allProducts.forEach(products => {
        products.map((product, i) => {
            if (product.category === selectedCategory) {
                const div = createProductDiv(product, i);
                mainDiv.appendChild(div);
            }
        });
    });
};

const handleTitleSearch = () => {
    const searchValue = document.getElementById('titleInput').value.toLowerCase();
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";

    allProducts.forEach(products => {
        products.map((product, i) => {
            if (product.title.toLowerCase().includes(searchValue)) {
                const div = createProductDiv(product, i);
                mainDiv.appendChild(div);
            }
        });
    });
};

const createProductDiv = (product, index) => {
    const div = document.createElement('div');
    div.classList.add(`pre-${index}`);
    div.style.width = "250px";
    div.style.height = "auto";
    div.style.padding = "20px";
    div.style.display = "block";
    // div.style.border = "4px solid red";
    div.style.backgroundColor = "aliceblue";
    div.style.borderRadius = "12px";
    div.innerHTML = `
    <p class="b"> ${product.id}</p>
    <p class="b"> ${product.title.slice(0, 10)}</p>
    <img src="${product.image}" width="110px" height="90px" class="a" >
    <p class="c">Price: ${product.price}</p>
    <a href="#" class="addToCartBtn"><i class='bx bx-cart-add'></i></a hrf>
    <p class="d">Description: ${product.description.slice(0, 20)}</p>
`;
    return div;
};

const handelselect = () => {
    const selectedCategory = document.querySelector('select').value;
    if (selectedCategory === "") {
        AllProducts();
    } else {
        ProductsCategory();
    }
};

const handlePriceRange = () => {
    const priceRange = document.querySelector('input[type="range"]').value;
    document.getElementById('priceDisplay').innerHTML = "Price: " + priceRange;
    displayProductsByPrice(priceRange);
};

const displayProductsByPrice = (price) => {
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML = "";

    allProducts.forEach(products => {
        products.map((product, i) => {
            if (parseFloat(product.price) <= price) {
                const div = createProductDiv(product, i);
                mainDiv.appendChild(div);
            }
        });
    });
};


window.onload = click2;