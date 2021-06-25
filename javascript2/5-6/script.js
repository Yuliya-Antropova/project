const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

console.log(window);
//:toCart="addToCart"
//@click="toCart({id: goodProp.id_product})"

Vue.component("search", {
  data() {
    return {
      search: "",
    };
  },
  template: `
    <div>
      <input type="text" class="goods-search" v-model="search"/>
      <button class="search-button" type="button" @click="searching">Искать</button>
    </div>
  `,

  methods: {
    searching() {
      this.$emit("searching", this.search);
    },
  },
});

Vue.component("goods-list", {
  props: ["goods"],
  template: `
    <div class="goods-list">
      <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"></goods-item>
    </div>
  `,
});

Vue.component("goods-item", {
  props: ["goodProp"],
  methods: {
    toCart: function (event) {
      this.$root.addToCart(event);
    },
  },
  template: `
      <div class="goods-item">
        <h3>{{goodProp.product_name}}</h3>
        <p>{{goodProp.price}}</p>
        <button class='cart-button buy-button' v-bind:id="goodProp.id_product" @click="toCart">Add to cart</button>        
      </div>
    `,
});

//корзина
Vue.component("cart-list", {
  props: ["goodsInCart"],
  template: `
      <div class="goods-list cart-list">
        <goods-item-in-cart v-for="goodEntity in goodsInCart" :goodPropCart="goodEntity"></goods-item-in-cart>
      </div>
    `,
});

//товары в корзине
Vue.component("goods-item-in-cart", {
  props: ["goodPropCart"],
  methods: {
    toCart: function (event) {
      this.$root.addToCart(event);
    },
  },
  template: `
        <div class="goods-item">
          <h3>{{goodPropCart.product_name}}</h3>
          <p>{{goodPropCart.price}}</p>
          <p>{{goodPropCart.quantity}}</p>
          <button class='cart-button buy-button' v-bind:id="goodPropCart.id_product" @click="toCart">Add to cart more</button>        
        </div>
      `,
});

Vue.component("cartVisible"), {
  methods: {
    addToCart2() {
      app.showBasket = true;
    }
  },
  template: `
  <p class="cart-header" v-bind="addToCart2">Shopping Cart</p>
  `
}

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    //searchLine: '',
    cartGoods: [],
    isVisibleCart: false,
    errorServer: false,
  },
  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalogData.json`);
      if (responce.ok) {
        const catalogItems = await responce.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        this.errorServer = true;
        alert("Ошибка при соединении с сервером");
      }
    },
    filterGoods(search) {
      if (search == "") {
        this.filteredGoods = this.goods;
      } else {
        this.filteredGoods = this.goods.filter(
          (elem) => elem.product_name == search
        );
      }
    },
    addToCart(event) {
      const cartGood = this.goods.find(
        (good) => event.target.id == good.id_product
      );
      if (this.cartGoods.includes(cartGood)) {
        cartGood.quantity = cartGood.quantity + 1;
      } else {
        this.cartGoods.push(cartGood);
        cartGood.quantity = 1;
      }
      console.log(cartGood.quantity);
    },
    /*showCart() {
      if(this.cartGoods.length > 0) {
        isVisibleCart = true;
      }
    }*/
  },

  async mounted() {
    await this.getProducts();
  },
});
