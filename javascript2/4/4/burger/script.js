



class Items {
  constructor() {
    this.items = [];
    this.cake = [
      { id: 'small', price: 50, kkal: 20 },
      { id: 'big', price: 50, kkal: 20 }
    ]

    this.staffing = [
      { id: 'cheese', price: 10, kkal: 20 },
      { id: 'salad', price: 20, kkal: 5 },
      { id: 'potato', price: 15, kkal: 10 }
    ]

    this.topping = [
      { id: 'spicy', price: 15, kkal: 0 },
      { id: 'souse', price: 20, kkal: 5 }
    ]
    
    this.count = 0;
    this.calories = 0;
    this.burger = '';
    this.stuffingOrder = '';
    this.toppingOrder = [];
  }
  reset (reset) {
    this.items = [];
    this.count = 0;
    this.calories = 0;
    this.burger = '';
  }
  getSize(size) {
    let buttonsSize = document.querySelectorAll(".size-class");
    buttonsSize.forEach(buttonSize => {
      buttonSize.addEventListener('change', (event) => {
        let goodItemCart = this.cake.find(cartKey => cartKey.id == event.target.id);
        if (this.items.some(el => el.id === this.cake[0].id || el.id === this.cake[1].id)) {
          let elem = this.items.findIndex(el => el.id === this.cake[0].id || el.id === this.cake[1].id);
          this.items.splice(elem, 1, goodItemCart);
        } else {
          this.items.push(goodItemCart);
        }
        this.burger = goodItemCart.id;
      })
    })
  }
  getStuffing(stuffing) {
    let buttonsStuffing = document.querySelectorAll(".stuffing-class");
    buttonsStuffing.forEach(buttonStuffing => {
      buttonStuffing.addEventListener('change', (event) => {
        let goodItemCart = this.staffing.find(cartKey => cartKey.id == event.target.id);
        if (this.items.some(el => el.id === this.staffing[0].id || el.id === this.staffing[1].id || el.id === this.staffing[2].id)) {
          let elem = this.items.findIndex(el => el.id === this.staffing[0].id || el.id === this.staffing[1].id || el.id === this.staffing[2].id);
          this.items.splice(elem, 1, goodItemCart);
        } else {
          this.items.push(goodItemCart);
        }
        this.stuffingOrder = goodItemCart.id;
      })
    })
  }

  getTopping(topping) {
    let ButtonsTopping = document.querySelectorAll(".topping-class");
    ButtonsTopping.forEach(ButtonTopping => {
      ButtonTopping.addEventListener('change', (event) => {
        let goodItemCart = this.topping.find(cartKey => cartKey.id == event.target.id);
        if (event.target.checked) {
          this.items.push(goodItemCart);
          this.toppingOrder.push = goodItemCart.id;
        } else {
          let elem = this.items.findIndex(el => el.id === goodItemCart.id);
          this.items.splice(elem, 1);
        }        
      })
    });
  }
  calculatePrice(price) {
     this.items.forEach(priceEl => {
        this.count += priceEl.price;
      })
      console.log(`Стоимость вашего гамбургера: ${this.count}`)
  }
  calculateCalories(calories) {
      this.items.forEach(kkalEl => {
        this.calories += kkalEl.kkal;
      })
      console.log(`Калорийность вашего гамбургера: ${this.calories}`)
    }
  
}



const init = () => {

  let item1 = new Items('', '', '');
  item1.getSize();
  item1.getStuffing();
  item1.getTopping();

  document.querySelector('.cart-button').addEventListener('click', (event) => { 
    console.log(item1.items);
    item1.calculatePrice();
    item1.calculateCalories();
    item1.reset()
    document.querySelectorAll('input').forEach (elem => {
      elem.checked = false;
    })
  })

};

window.onload = init;