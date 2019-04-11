const uri = "/api/jewelry/";
let items = null;

document.addEventListener("DOMContentLoaded", function (event) {
    getProducts();
});

function getCount(data) {
    const el = document.querySelector("#counter");
    let name = "Всего изделий: ";
    if (data > 0) {
        el.innerText = name + data;
    } else {
        el.innerText = "Изделий еще нет";
    }
}

function getProducts() {
    let request = new XMLHttpRequest();
    request.open("GET", uri);
    request.onload = function () {
        let products = "";
        let productsHTML = "";
        products = JSON.parse(request.responseText);

        if (typeof products !== "undefined") {
            getCount(products.length);
            if (products.length > 0) {
                if (products) {
                    var i;
                    for (i in products) {
                        productsHTML += '<div class="productText"><span>' + products[i].id + ' : ' + products[i].title + ' : ' + products[i].typeId + ' : ' + products[i].price + ' : ' + products[i].description + "<image class=\"product__image\" src=\"" + products[i].image + "\">" + ' </span>';
                        productsHTML += '<button onclick="editProduct(' + products[i].id + ')">Изменить</button>';
                        productsHTML += '<button onclick="deleteProduct(' + products[i].id + ')">Удалить</button></div>';
                        //if (typeof products[i].post !== "undefined" && products[i].post.length > 0) {
                        //    let j;
                        //    for (j in products[i].post) {
                        //        productsHTML += "<p>" + products[i].post[j].content + "</p>";
                        //    }
                        //}
                    }
                }
            }
            items = products;
            document.querySelector("#productsDiv" ).innerHTML = productsHTML;
        }
    };
    request.send();
}

function createProduct() {
    let titleText = "";
    titleText = document.querySelector("#createTitleDiv").value;
    let typeidText = 1;
    typeidText = document.querySelector("#createTypeIdDiv").value;
    let priceText = 0;
    priceText = document.querySelector("#createPriceDiv").value;
    let descriptionText = "";
    descriptionText = document.querySelector("#createDescriptionDiv").value;
    let imageText = "";
    imageText = document.querySelector("#createImageDiv").value;
    var request = new XMLHttpRequest();
    request.open("POST", uri);
    request.onload = function () {
        getproducts();
        document.querySelector("#createTitleDiv").value = "";
        document.querySelector("#createTypeIdDiv").value = 1;
        document.querySelector("#createPriceDiv").value = 0;
        document.querySelector("#createDescriptionDiv").value = "";
    };
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //console.log(request);
    console.log(request.send(JSON.stringify({ typeId: 1, title: titleText, typeId: typeidText, price: priceText, description: descriptionText, image: imageText })));
}

function editProduct(id) {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "block";
    if (items) {
        let i;
        for (i in items) {
            if (id === items[i].id) {
                document.querySelector("#edit-id").value = items[i].id;
                document.querySelector("#edit-typeid").value = items[i].typeId;
                document.querySelector("#edit-title").value = items[i].title;
                document.querySelector("#edit-price").value = items[i].price;
                document.querySelector("#edit-description").value = items[i].description;
                document.querySelector("#edit-image").value = items[i].image;
            }
        }
    }
}

function updateProduct() {
    const Product = {
        id: document.querySelector("#edit-id").value,
        typeId: document.querySelector("#edit-typeid").value,
        title: document.querySelector("#edit-title").value,
        price: document.querySelector("#edit-price").value,
        description: document.querySelector("#edit-description").value,
        image: document.querySelector("#edit-image").value
    };
    var request = new XMLHttpRequest();
    request.open("PUT", uri + Product.id);
    request.onload = function () {
        getproducts();
        closeInput();
    };
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(Product));
}

function deleteProduct(id) {
    let request = new XMLHttpRequest();
    request.open("DELETE", uri + id, false);
    request.onload = function () {
        getproducts();
    };
    request.send();
}

function closeInput() {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "none";
}