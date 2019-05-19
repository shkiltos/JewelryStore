const uri = "/api/jewelry/";
const uri1 = "/api/OrderLine/";
const uri2 = "/api/Orders/";
let items = null;
let Role = null;
let orders = null;
var order = 0;

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
    this.isAdmin()
        .then(
        response => {
            Role = response.message; 

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
                                        '<div class="btn-group" style="width:100%">';
                                    if (Role == "admin") {
                                        productsHTML += '<button type="button" onclick="editProduct(' + products[i].id + ')">Edit</button>' +
                                                        '<button type="button" onclick="deleteProduct(' + products[i].id + ')">Delete</button>'
                                    }
                                    productsHTML += '<button type="button" onclick="addToCart(' + products[i].id + "," + products[i].price + ');" style="width:100%">Add to cart</button>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>';
                                }
                            }
                        }
                        items = products;
                        let createProductsHTML = "";
                        if (Role == "admin") {
                            createProductsHTML +=
                                '<h3>Add new product to list</h3>' +
                                '<form>' +
                                '<label for="createTitleDiv">Title:</label>' +
                                '<input id="createTitleDiv" type="text" /><br />' +
                                '<label for="createPriceDiv">Price:</label>' +
                                '<input id="createPriceDiv" type="number" /><br />' +
                                '<label for="createDescriptionDiv">Description:</label>' +
                                '<input id="createDescriptionDiv" type="text" /><br />' +
                                '<label for="createImageDiv">Image:</label>' +
                                '<input id="createImageDiv" type="text" /><br />' +
                                '<button onclick="createProduct(); return false;">Add</button>' +
                                '</form>';
                        }
                        
                        document.querySelector("#productsDiv").innerHTML = productsHTML;
                        document.querySelector("#createNewProduct").innerHTML = createProductsHTML;
                    }
                };
            request.send();
            GetOrder();
        });
}

function createProduct() {
    let titleText = "";
    titleText = document.querySelector("#createTitleDiv").value;
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
        document.querySelector("#createPriceDiv").value = 0;
        document.querySelector("#createDescriptionDiv").value = "";
        document.querySelector("#createImageDiv").value = "";
    };
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(request.send(JSON.stringify({ typeId: 1, title: titleText, price: priceText, description: descriptionText, image: imageText })));
}

function editProduct(id) {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "block";
    if (items) {
        let i;
        for (i in items) {
            if (id === items[i].id) {
                document.querySelector("#edit-id").value = items[i].id;
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
        var mydiv = document.getElementById("formError");
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
                    var ul = document.getElementById("formError");
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(msg.error[i]));
                    ul.appendChild(li);
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

function isAdmin() {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("POST", "api/account/isAdmin");

        request.onload = function() {
            var response = JSON.parse(this.responseText);
            resolve(response);
        };

        request.onerror = function () {
            reject(new Error("Network Error"));
        };

        request.send();
    });
}

function testIsAdmin() {
    isAdmin()
        .then(
            response => alert("Response:" + response.message),
            error => alert("Rejected:" + error.message)
        );
}

// Обработка кликов по кнопкам
document.getElementById("loginBtn").addEventListener("click", logIn);
document.getElementById("logoffBtn").addEventListener("click", logOff);

function addToCart(id, sum) {
    //добавляем новое поле в промежуточную таблицу
    try {
        var OrderLine = {
            'productId': id,
            'orderId': order,
            'quantity': 1,
            'price': sum
        }
        var request = new XMLHttpRequest();
        request.open("POST", uri1);
        request.onload = function () {
            // Обработка кода ответа
            var msg = "";//сообщение
            if (request.status === 200) {
                msg = "Не добавлено";
            } else if (request.status === 201) {
                msg = "Продукт добавлен в корзину";
                uri3 = uri2 + order;//получение текущего заказа
                var request1 = new XMLHttpRequest();
                request1.open("GET", uri3, false);
                var item;///Получение данных о заказе + сумму новой ювелирки
                request1.onload = function () {
                    item = JSON.parse(request1.responseText);
                    item.sumOrder += sum;//к сумме текущего заказа прибавляется стоимость книги
                    ///Изменение данных о заказе -- отправка изменений в БД
                    var request2 = new XMLHttpRequest();
                    request2.open("PUT", uri3);
                    request2.onload = function () {
                        //loadBasket();//загрузка корзины для обновления данных о заказе
                    };
                    request2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    request2.send(JSON.stringify(item));
                };
                request1.send();

            } else if (request.status === 404) {
                msg = "Пожалуйста, авторизируйтесь"
            } else {
                msg = "Неизвестная ошибка";
            }
            document.querySelector("#actionMsg").innerHTML = msg;//вывод сообщения
        };
        request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(OrderLine));//добавление строки заказа
    } catch (e) { alert("Возникла непредвиденая ошибка! Попробуйте позже!"); }
}


function GetOrder() {//получение id текущего заказа и его отображение
    try {
        //GetRole();
        getIdUser();
        //if (Role === "user") {
            var request2 = new XMLHttpRequest();
            request2.open("GET", "/api/orders/");
            orders = null;
            request2.onload = function () {
                if (request2.status === 200) { //если мы получили список заказов
                    orders = JSON.parse(request2.responseText);

                    for (j in orders) {//в цикле ищем заказ пользователя, который является активным
                        if (orders[j].active === 1) {
                            order = orders[j].id;
                        }
                    }          //если список заказов получить не удалось
                } else if (request2.status !== 204) {
                    alert("Возникла неизвестная ошибка! Попробуйте повторить позже! Статус ошибки: " + request2.status);
                }
            };
            request2.send();
        //}
    } catch (e) { alert("Возникла непредвиденая ошибка! Попробуйте позже!"); }
}


var myObj = "";
function getIdUser() {
    try {
        let request = new XMLHttpRequest();
        request.open("GET", "/api/Account/WhoisAuthenticated", true);
        request.onload = function () {
            if (request.status === 200) {
                myObj = JSON.parse(request.responseText);
            }
        };
        request.send();
    } catch (e) { alert("Возникла непредвиденая ошибка! Попробуйте позже!"); }
}