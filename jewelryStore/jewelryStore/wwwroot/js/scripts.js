const uri = "/api/jewelry/";
let items = null;

document.addEventListener("DOMContentLoaded", function (event) {
    getProducts();
    getCurrentUser();
});

function getCurrentUser() {
    let request = new XMLHttpRequest();
    request.open("POST", "/api/Account/isAuthenticated", true);
    request.onload = function () {
        let myObj = "";
        myObj = request.responseText !== "" ?
            JSON.parse(request.responseText) : {};
        document.getElementById("msg").innerHTML = myObj.message;
    };
    request.send();
}

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
            //getCount(products.length);
            if (products.length > 0) {
                if (products) {
                    var i;
                    for (i in products) {
                        //productsHTML += '<div class="productText"><span>' + products[i].id + ' : ' + products[i].title + ' : ' + products[i].typeId + ' : ' + products[i].price + ' : ' + products[i].description + "<image class=\"product__image\" src=\"" + products[i].image + "\">" + ' </span>';
                        //productsHTML += '<button onclick="editProduct(' + products[i].id + ')">Изменить</button>';
                        //productsHTML += '<button onclick="deleteProduct(' + products[i].id + ')">Удалить</button></div>';
                        productsHTML += '<div class="col-md-4">' +
                                '<div class="card mb-4 shadow-sm">' +
                                    '<img src=\"' + products[i].image + '\" width="100%" height="100%" />' +
                            '<div class="card-body">' +
                            '<h1>' + products[i].title + '</h1>' +
                            '<h3>' + products[i].price + '₽</h3>' +
                            '<p class="card-text">' + products[i].description + '</p>' +
                                        '<div class="d-flex justify-content-between align-items-center">' +
                                            '<div class="btn-group">' +
                                                '<button type="button" onclick="editProduct(' + products[i].id + ')">Edit</button>' +
                                                '<button type="button" onclick="deleteProduct(' + products[i].id + ')">Delete</button>' +
                                            '</div>' +
                                         '</div>' +
                                        '</div>' +
                                    '</div>' +
                            '</div>';
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
        // Обработка кода ответа
        var msg = "";
        if (request.status === 401) {
            msg = "У вас не хватает прав для создания";
        } else if (request.status === 201) {
            msg = "Запись добавлена";
            getProducts();
        } else {
            msg = "Неизвестная ошибка";
        }
        document.querySelector("#actionMsg").innerHTML = msg;

        document.querySelector("#createTitleDiv").value = "";
        document.querySelector("#createTypeIdDiv").value = 1;
        document.querySelector("#createPriceDiv").value = 0;
        document.querySelector("#createDescriptionDiv").value = "";
        document.querySelector("#createImageDiv").value = "";
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
        getProducts();
        closeInput();
    };
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(request.send(JSON.stringify(Product)));
}

function deleteProduct(id) {
    let request = new XMLHttpRequest();
    request.open("DELETE", uri + id, false);
    request.onload = function () {
        getProducts();
    };
    request.send();
}

function closeInput() {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "none";
}

function logIn() {
    var email, password = "";
    // Считывание данных с формы
    email = document.getElementById("Email").value;
    password = document.getElementById("Password").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/api/Account/Login");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        // Очистка контейнера вывода сообщений
        document.getElementById("msg").innerHTML = "";
        var mydiv = document.getElementById('formError');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        // Обработка ответа от сервера
        if (request.responseText !== "") {
            var msg = null;
            msg = JSON.parse(request.responseText);
            document.getElementById("msg").innerHTML = msg.message;
            // Вывод сообщений об ошибках
            if (typeof msg.error !== "undefined" && msg.error.length > 0) {
                for (var i = 0; i < msg.error.length; i++) {
                    var ul = document.getElementsByTagName("ul");
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(msg.error[i]));
                    ul[0].appendChild(li);
                }
            }
            document.getElementById("Password").value = "";
        }
    };
    // Запрос на сервер
    request.send(JSON.stringify({
        email: email,
        password: password
    }));
}

function logOff() {
    var request = new XMLHttpRequest();
    request.open("POST", "api/account/logoff");
    request.onload = function () {
        var msg = JSON.parse(this.responseText);
        document.getElementById("msg").innerHTML = "";
        var mydiv = document.getElementById('formError');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        document.getElementById("msg").innerHTML = msg.message;
    };
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send();
}

// Обработка кликов по кнопкам
document.getElementById("loginBtn").addEventListener("click", logIn);
document.getElementById("logoffBtn").addEventListener("click", logOff);