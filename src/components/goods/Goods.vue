<template>
  <div class="goods-wrapper">
    <div class="goods-menu" ref="goodsMenu">
      <ul>
        <li class="menu-item" v-for="(menu, index) in goods" :key="menu.name" :class="{current:currentIndex === index}" @click="selectSetMenu(index)">
          <span><span class="supp-icon" :class="iconMap[menu.type]" v-show="menu.type>0"></span>{{menu.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods" ref="goodsWrap">
      <ul>
        <li class="goods-item" v-for="good in goods" :key="good.name" ref="goodItem">
          <h2>{{good.name}}</h2>
          <ul>
            <li class="food-contain" v-for="food in good.foods" :key="food.name">
              <div class="food-icon">
                <img :src="food.icon" width="57" height="57"/>
              </div>
              <div class="food-des">
                <p>{{food.name}}</p>
                <p v-show="food.description">{{food.description}}</p>
                <p>
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </p>
                <p>
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </p>
                <p class="count-control">
                  <add-des
                  :food="findFood(food.name)"
                  @addToCart="addToCart"
                  @decToCart="decToCart"
                />
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart class="shop-cart" ref="shopCart"
               :min-price="seller.minPrice"
               :delivery-price="seller.deliveryPrice"
               :foods="shopCartGood"
               @addToCart="addToCart"
               @decToCart="decToCart"
               @empty="empty"
    />
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import ShopCart from './ShopCart'
  import AddDes from './AddDes'
  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        goods: [],
        iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        heightArr: [],
        scrollY: 0,
        shopCartGood: []
      }
    },
    created () {
      this.$axios.get('/api/goods')
        .then(res => {
          res = res.data;
          if (res.errorNum === 0) {
            this.goods = res.data;
          }
          this.$nextTick(() => {
            this._initIScroll();
            this._calculateHeight()
          })
        })
        .catch(err => {
          alert(err)
        })
    },
    methods: {
      _initIScroll () {
        this.goodsMenu = new IScroll(this.$refs.goodsMenu, {
          click: true
        });
        this.goodsWrap = new IScroll(this.$refs.goodsWrap, {
          click: true,
          probeType: 3
        });
        let self = this;
        this.goodsWrap.on('scroll', function () {
          self.scrollY = Math.abs(Math.round(this.y))
        })
        this.goodsWrap.on('scrollEnd', function () {
          console.log(0)
        })
      },
      _calculateHeight () {
        let goodItem = this.$refs.goodItem;
        let hei = 0;
        this.heightArr.push(hei);
        goodItem.forEach(item => {
          hei += item.clientHeight;
          this.heightArr.push(hei);
        })
      },
      selectSetMenu (index) {
        let toHeight = this.heightArr[index];
        this.goodsWrap.scrollTo(0, -toHeight, 500)
      },
      findFood (name) {
        let good = this.shopCartGood.find(value => value.name === name);
        if (!good) {
          good = {name, count: 0}
        }
        return good
      },
      addToCart (name, target) {
        let setMenu = this.shopCartGood.find(value => value.name === name);
        if (!setMenu) {
          let o;
          for (let i = 0; i < this.goods.length; i++) {
            let food = this.goods[i].foods;
            for (let j = 0; j < food.length; j++) {
              if (food[j].name === name) {
                o = food[j];
                break;
              }
            }
          }
          setMenu = Object.assign({}, o, {count: 1});
          this.shopCartGood.push(setMenu);
        } else {
          setMenu.count += 1;
        }
        this._drop(target)
    },
      _drop (target) {
        this.$refs.shopCart.drop(target)
      },
      decToCart (name) {
        let food = this.shopCartGood.find(value => value.name === name);
        if (food.count <= 1) {
          let index = this.shopCartGood.indexOf(food);
          this.shopCartGood.splice(index, 1)
        } else {
          food.count--;
        }
      },
      empty () {
        this.shopCartGood.splice(0, this.shopCartGood.length)
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.heightArr.length - 1; i++) {
          let height1 = this.heightArr[i];
          let height2 = this.heightArr[i + 1];
          if (this.scrollY >= height1 && this.scrollY < height2) {
            return i;
          }
        }
        return 0;
      }
    },
    components: {
      ShopCart,
      AddDes
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .goods-wrapper
    display flex
    position  absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .goods-menu
      flex 0 0 80px
      width 80px
      height 100%
      background #f3f5f7
      .menu-item
        position relative
        box-sizing content-box
        display table
        width 56px
        height 54px
        padding 0 12px
        text-align center
        font-size 0
        & > span
          display table-cell
          width 61px
          line-height 12px
          font-size 12px
          text-align center
          vertical-align middle
          color rgb(77, 85, 93)
          border-1px(rgba(7, 17, 27, 0.1))
          .supp-icon
            display inline-block
            width 12px
            height 12px
            vertical-align top
            background-size 12px 12px
            background-repeat no-repeat
            background-position center center
            &.decrease
              bg-image('../../common/img/decrease_3')
            &.discount
              bg-image('../../common/img/discount_3')
            &.special
              bg-image('../../common/img/special_3')
            &.invoice
              bg-image('../../common/img/invoice_3')
            &.guarantee
              bg-image('../../common/img/guarantee_3')
        &.current
          position relative
          top -1px
          z-index 10
          background #fff
          & > span
            font-weight 600
            color rgb(7, 17, 27)
            border-none()
      li:last-of-type > span
        border-none()
    .goods
      flex 1
      position relative
      height 100%
      .goods-item > h2
        height 26px
        line-height 26px
        padding-left 14px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-contain
        display flex
        margin 0 18px
        padding  18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .food-icon
          flex 0 0 57px
          vertical-align top
        .food-des
          flex 1
          margin-left 10px
          font-size 0
          .count-control
            position absolute
            bottom 18px
            right 18px
            @media only screen and (max-width:320px)
              right -14px
          & > p:nth-of-type(1)
            margin 2px 0 8px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          & > p:nth-of-type(2),& > p:nth-of-type(3)
            margin-bottom 8px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          & > p:nth-of-type(3)
            margin-bottom 0
            &:first-child
              margin-right 12px
          & > p:nth-of-type(4)
            line-height 24px
            font-size 10px
            font-weight 700
            color rgb(147, 152, 159)
            &>span:nth-child(1)
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            &>span:nth-child(2)
              text-decoration line-through

        &:last-of-type
          border-none()
</style>
