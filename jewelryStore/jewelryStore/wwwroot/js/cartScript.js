let products = null;

var x = "";

function showOrder() {//получение id текущего заказа и его отображение
    var request2 = new XMLHttpRequest();
    request2.open("GET", uri2, false);
    orders = null; x = "";
    request2.onload = function () {
        orders = JSON.parse(request2.responseText);
        for (j in orders) {
            if (orders[j].active == 1) {
                order = orders[j].id;
                x += "<h2> Сумма заказа: " + orders[j].sumOrder + "</h2>";
            }
        }
        loadProducts();//загружаем изделия, входящие в этот заказ
        document.getElementById("CartDiv").innerHTML = x; //выводим скрипт в элемент CartDiv
    };
    request2.send();
    
}

//function loadHistory() {//загрузка истории заказов пользователя
//    var i, y = "";
//    var request = new XMLHttpRequest();
//    request.open("GET", uri2, false);
//    request.onload = function () {
//        orders = JSON.parse(request.responseText);
//        for (i in orders) {
//            if (orders[i].dateOrder) {
//                y += "<hr>";
//                y += "<p> Дата заказа: " + orders[i].dateOrder + "</p>";
//                y += "<p> Дата доставки: " + orders[i].dateDelivery + "</p>";
//                y += "<p> Сумма: " + orders[i].sumOrder + "</p>";
//                y += "<p> Стоимость доставки: " + orders[i].sumDelivery + "</p>";
//            } else { order = orders[i].id; }
//        }
//        document.getElementById("BasketHistoryDiv").innerHTML = y;
//    };
//    request.send();
//}

function loadProducts() {       //загрузить украшения
    var i;
    items = null;
    var request = new XMLHttpRequest();
    request.open("GET", uri1, false);
    request.onload = function () {
        items = JSON.parse(request.responseText);
        for (i in items) {
            if (items[i].orderId == order) {
                loadProduct(items[i].productId, items[i].id);
            }
        }
    };
    request.send();
}

function MakeOrder() {      //Active=0, создать новый текущий заказ для этого пользователя
    var request = new XMLHttpRequest();
    var url = uri2 + order; //получить текущий заказ
    request.open("GET", url, false);
    request.onload = function () {
        if (request.status === 200) {
            var CurOrder = JSON.parse(request.responseText); //получение текущего заказа
            CurOrder.active = 0;
            var d = new Date();
            CurOrder.dateOrder = "" + String(d.getFullYear()) + "-" + String(d.getMonth()).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0');
            var request2 = new XMLHttpRequest();
            request2.open("PUT", url, false);
            request2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request2.onload = function () {
                var request1 = new XMLHttpRequest();
                request1.open("POST", "/api/Orders/", false);
                request1.setRequestHeader("Accepts",
                    "application/json;charset=UTF-8");
                request1.setRequestHeader("Content-Type",
                    "application/json;charset=UTF-8");
                request1.onload = function () {
                    GetOrder();
                };
                request1.send(JSON.stringify({

                    dateDelivery: "0001-01-01",
                    dateOrder: "0001-01-01",
                    sumDelivery: 50,
                    sumOrder: 0,
                    active: 1,
                    userId: "1"
                }));

            };
            request2.send(JSON.stringify(CurOrder));
        }

    };
    request.send();
}

function loadProduct(pid, idItem) {      //отображение конкретной ювелирки
    var i;
    products = null;
    var request = new XMLHttpRequest();
    request.open("GET", "/api/jewelry", false);
    request.onload = function () {
        products = JSON.parse(request.responseText);
        for (i in products) {
            if (products[i].id == pid) {
                x += "<br /> <br />";
                x += "<img src=\"" + products[i].image + "\" width=\"150\" height=\"150\" alt=\"" + products[i].title + "\">";
                x += "<h5>" + products[i].title + "</h5>";
                x += "<h6> Описание: " + products[i].description + "</h6>";
                x += "<h5> Цена: " + products[i].price + "</h5>";
                x += "<button onclick=\"deleteOrderLine(" + idItem + "," + products[i].price + ");\"> Удалить </button> </div >";
            }
        }
    };
    request.send();
}

function deleteOrderLine(id, cost) { //order.sum-sum of book
    //перерисовать список книг и сумму заказа

    var request = new XMLHttpRequest();
    var url = uri1 + id;
    request.open("DELETE", url, false);
    request.onload = function () {
        updateOrder(cost);
        showOrder();
        loadProducts();
    };
    request.send();
}

function updateOrder(cost) {
    //добавление к заказу книги
    ///Получение данных о заказе + сумму новой книги
    uri3 = uri2 + order;
    var request1 = new XMLHttpRequest();
    request1.open("GET", uri3, false);
    var item;
    request1.onload = function () {
        item = JSON.parse(request1.responseText);
        item.sumOrder -= cost;
        if (item.sumOrder < 0) item.sumOrder = 0;
        ///Изменение данных о заказе
        var request2 = new XMLHttpRequest();
        request2.open("PUT", uri3);
        request2.onload = function () {
        };
        request2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request2.send(JSON.stringify(item));
        GetOrder();
        loadProducts();

    };
    request1.send();
}
//==================
