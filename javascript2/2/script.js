//класс карточки товара
class GoodsItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3>
    <div><img class="goods-img" src="http://unsplash.it/150/150?random&gravity=center" alt=""></div>
    <p>${this.price}</p>
    <button id="${this.id}" class='cart-button buy-button'>Add to cart</button></div>`;
  }
}

//класс страницы товаров
class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150, id: 0 },
      { title: "Socks", price: 50, id: 1 },
      { title: "Jacket", price: 350, id: 2 },
      { title: "Shoes", price: 250, id: 3 },
    ];
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price, good.id);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
  //метод подсчета стоимости всех товаров (потом перенесу в корзину)
  amountPrices() {
    let amount = 0;
    this.goods.forEach((price) => {      
      amount += price.price;
    });
    console.log(`Сумма всех товаров на странице: ${amount}`);
  }
}

//класс страницы корзины товаров
class ShoppingCart extends GoodsList {
  constructor(goods, listCart) {
    super(goods);
    this.listCart = [];
  }
  //когда будем брать объекты из сервера, я думаю, что лучше убрать наследование от GoodsList. 
  //сейчас сделала, чтобы не переписывать список goods

  //добавление товара в корзину
  addToCart() {
    let buttonAddToCart = document.querySelectorAll('.buy-button');
    buttonAddToCart.forEach(button => {
      button.addEventListener('click', (event) => {
        let goodItemCart = this.goods[event.target.id];
        this.listCart.push(goodItemCart);
        console.log(this.listCart)
      })
    })
    return this.listCart;
  }

  //отображение корзины товаров
  renderCart() {
    let listCartHtml = "";
    this.listCart.forEach((goodCart) => {
      const goodItemCart = new GoodsInShoppingCart(goodCart.title, goodCart.price, goodCart.id, goodCart.size, goodCart.color, goodCart.quantity);
      listCartHtml += goodItemCart.render();
    });
    document.querySelector(".cart-list").innerHTML = listCartHtml;
    console.log(listCartHtml); //не уверена, что это работает, но вроде должно =(
  }
}

//класс карточки товара в корзине
class GoodsInShoppingCart extends GoodsItem {
  constructor(title, price, id, size, color, quantity) {
    super(title, price, id);
    this.size = size;
    this.color = color;
    this.quantity = quantity;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3>
    <div><img class="goods-img" src="http://unsplash.it/150/150?random&gravity=center" alt=""></div>
    <p>${this.price}</p>
    <select><option value="${this.size}"></option>
    <select><option value="${this.color}"></option>
    <input type="text" value="${this.quantity}">
    <button id="${this.id}" class='cart-button buy-button'>And one more</button></div>
    <button id="${this.id}" class='cart-button buy-button'>Remove from cart</button></div>`;
    //пока не совсем понятно, как выводить инпуты через js
  }

  removeFromCart() {
    //удаление элемента при нажатии кнопки в карточке товара
  }
}


const init = () => {
  const list = new GoodsList();
  list.fetchGoods();
  list.render();
  list.amountPrices();

  const shoppingList = new ShoppingCart();
  shoppingList.fetchGoods();
  shoppingList.addToCart();
  

  
};

window.onload = init;

