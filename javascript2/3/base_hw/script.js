const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

//класс карточки товара
class GoodsItem {
  constructor(product_name, price, id_product) {
    this.product_name = product_name;
    this.price = price;
    this.id_product = id_product;
  }
  //рисует карточку
  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3>
    <div><img class="goods-img" src="http://unsplash.it/150/150?random&gravity=center" alt=""></div>
    <p>${this.price}</p>
    <button id="${this.id_product}" ItemId="${this.id_product}" class='cart-button buy-button'>Add to cart</button></div>`;
  }
}

//класс страницы товаров
class GoodsList {
  constructor() {
    this.goods = [];
  }

  async fetchGoods() {
    const responce = await fetch(`${API_URL}/catalogData.json`);
    if (responce.ok) {
      const catalogItems = await responce.json();
      this.goods = catalogItems;
    } else {
      alert("Ошибка при соединении с сервером");
    }
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
  //метод подсчета стоимости всех товаров
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
  
  //добавление товара в корзину
  addToCart() {
    let buttonAddToCart = document.querySelectorAll('.buy-button');
    buttonAddToCart.forEach(button => {
      button.addEventListener('click', (event) => {
        //здесь вопрос. почему-то не могу обращаться по id к элементу. Когда был список товаров, такой проблемы не было
        // обращалась "let goodItemCart = this.goods[event.target.id]", товар выводился. сейчас выводит undefined
        let goodItemCart = this.goods.find(cartKey => cartKey.id_product == event.target.id);
        this.listCart.push(goodItemCart);
        this.renderCart();
      })
    })
    return this.listCart;
  }

  //удаление элемента при нажатии кнопки в карточке товара
  removeFromCart() {
    let buttonRemoveFromCart = document.querySelectorAll('.remove-button');
    buttonRemoveFromCart.forEach(button => {
      button.addEventListener('click', (event) => {
        //тут я совсем запуталась =(
          //все работает, но если оставить один элемент в корзине, сначла удаление / добавление происходит нормально, 
          // но через неско-ко итераций, элемент начинает заменяться. Например, удалила все из корзины, кроме мышки.
          //при добавлении ноутбука, мышка заменяется на ноутбук. самое интересное, что это может происходить через раз.
       this.listCart.pop(event.target.id);
        event.target.parentNode.remove();        
      })
      console.log(this.listCart)
      return this.listCart;
    })
    
  }

    //отображение корзины товаров
    renderCart() {
      let listCartHtml = "";
      document.querySelector('.cart-header').style.display = 'block';
      this.listCart.forEach((goodCart) => {
        const goodItemCart = new GoodsInShoppingCart(goodCart.product_name, goodCart.price, goodCart.id_product, goodCart.size, goodCart.color, goodCart.quantity);
        listCartHtml += goodItemCart.render();
      });
      document.querySelector(".cart-list").innerHTML = listCartHtml;
      this.removeFromCart();
    }
  }

//класс карточки товара в корзине
class GoodsInShoppingCart {
  constructor(product_name, price, id) {
    this.product_name = product_name;
    this.price = price;
    this.id = id;
  }
  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3>
    <div><img class="goods-img" src="http://unsplash.it/150/150?random&gravity=center" alt=""></div>
    <p>${this.price}</p>
    
    <button id="${this.id_product}" ItemId="${this.id_product}" class='cart-button buy-button'>And one more</button>
    <button id="${this.id_product}" ItemId="${this.id_product}" class='cart-button remove-button'>Remove from cart</button></div>`;
  }
}


const init = async () => {
  const list = new GoodsList();
  await list.fetchGoods();
  list.render();
  list.amountPrices();

  const shoppingList = new ShoppingCart();
  await shoppingList.fetchGoods();
  shoppingList.addToCart();
};

window.onload = init;

