<template>
<div class="shop-cart-wrapper">
    <div class="shop-cart" @click="toggleFold()">
      <span class="shop-cart-left">
        <span class="logoWrap">
          <span :class="{highlight:num>0}"><i class="icon-shopping_cart"></i></span>
          <span v-show="num">{{num}}</span>
        </span>
        <span :class="{highlight:num}">￥{{total}}</span>
        <span>另需配送费￥{{deliveryPrice}}元</span>
      </span>
      <span class="shop-cart-right" :class="{enough:total>minPrice}">
        <span>{{payMes}}</span>
      </span>
      <div class="ball-wrap">
            <div v-for="(ball,index) in balls" :key="index">
              <transition name="drop" @before-enter="_beforeEnter" @enter="_enter" @after-enter="_afterEnter">
                <div class="drop" v-show="ball.show">
                <div class="ball"></div>
                </div>
              </transition>
            </div>
      </div>
    </div>
    <transition name="fold">
      <div class="shop-cart-list" v-show="showList">
        <h3>
          <span>购物车</span>
          <span class="empty" @click="$emit('empty')">清空</span>
        </h3>
        <div class="chosen-items" ref="choseItem">
          <ul>
            <li class="chosen-item" v-for="food in foods " :key="food.name">
              <span>{{food.name}}</span>
              <span>￥<span class="price">{{food.price}}</span></span>
              <add-des :food="food" @addToCart="addToCart" @decToCart="decToCart"/>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="fade" v-show="showList" @click="toggleFold()"></div>
</div>
</template>

<script>
  import AddDes from './AddDes'
  import IScroll from 'iscroll'
    export default {
        props: {
          minPrice: Number,
          deliveryPrice: Number,
          foods: Array
        },
        data () {
          return {
            fold: true,
            balls: [
              {show: false},
              {show: false},
              {show: false},
              {show: false},
              {show: false}
            ],
            dropBalls: []
          }
        },
        components: {
          AddDes
        },
        computed: {
          num () {
            let num = 0;
            this.foods.forEach(value => {
              num += value.count
            });
            return num;
          },
          total () {
            let total = 0;
            this.foods.forEach(value => {
              total += value.price * value.count
            });
            return total
          },
          payMes () {
            if (!this.num) {
              return `￥${this.minPrice}起送`;
            } else if (this.minPrice > this.total) {
              return `还差￥${this.minPrice - this.total}`
            } else {
              return `去付款`;
            }
          },
          showList () {
            if (!this.num) {
              // eslint-disable-next-line
              this.fold = true;
              return false;
            }
            let show = !this.fold;
            if (show) {
              this.$nextTick(() => {
                if (!this.scroll) {
                  // eslint-disable-next-line
                  this.scroll = new IScroll(this.$refs.choseItem, {
                    click: true
                  })
                } else {
                  this.scroll.refresh();
                }
              })
            }
            return show;
          }
        },
        methods: {
          toggleFold () {
            if (!this.num) {
              return;
            }
            this.fold = !this.fold
          },
          addToCart (name) {
            this.$emit('addToCart', name)
          },
          decToCart (name) {
            this.$emit('decToCart', name)
          },
          drop (target) {
            for (let i = 0; i < this.balls.length; i++) {
              let ball = this.balls[i];
              if (!ball.show) {
                ball.show = true;
                ball.el = target;
                this.dropBalls.push(ball);
                return;
              }
            }
          },
          _beforeEnter (el) {
            for (let i = 0; i < this.balls.length; i++) {
              let ball = this.balls[i];
              if (ball.show) {
                let rect = ball.el.getBoundingClientRect();
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top - 32);
                el.style.transform = `translateY(${y}px)`;
                el.style.webkitTransform = `translateY(${y}px)`;
                let child = el.firstElementChild;
                child.style.transform = `translateX(${x}px)`;
                child.style.webkitTransform = `translateX(${x}px)`;
              }
            }
          },
          _enter (el, done) {
            // eslint-disable-next-line
            let rf = el.offsetHeight;
            // TODO: 刷新页面
            this.$nextTick(() => {
              el.style.transform = `translateY(0)`;
              el.style.webkitTransform = `translateY(0)`;
              let child = el.firstElementChild;
              child.style.transform = `translateX(0)`;
              child.style.webkitTransform = `translateX(0)`;
              el.addEventListener('transitionend', done)
            })
          },
          _afterEnter (el) {
            let ball = this.dropBalls.shift();
            if (ball) {
              ball.show = false;
              el.style.display = 'none';
            }
            let logoWrap = document.getElementsByClassName('logoWrap')[0];
            logoWrap.style.transition = `all 0.5s linear`;
            logoWrap.style.transform = `scale(0.8)`;
            logoWrap.style.transform = `scale(1.2)`;
            logoWrap.style.transform = `scale(1.0)`;
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
.shop-cart
  position fixed
  bottom 0
  left 0
  z-index 35
  display flex
  width 100%
  height 48px
  font-size 0
  background #141d27
  .shop-cart-left
    flex 1
    padding 12px 0
    & > span:nth-of-type(1)
      position absolute
      left 12px
      top -12px
      z-index 10
      width 56px
      height 56px
      padding 6px
      border-radius 50%
      background #141d27
      @media only screen and (max-width:320px)
        left 2px
      & > span:nth-of-type(1)
        display inline-block
        width 100%
        height 100%
        line-height 44px
        vertical-align top
        text-align center
        font-size 24px
        border-radius 50%
        background #2B333B
        color rgba(255, 255, 255, 0.4)
        &.highlight
          color #fff
          background rgb(0, 160, 220)
      & > span:nth-of-type(2)
        position absolute
        top 0
        right 0
        width 24px
        height 12px
        line-height 12px
        padding 0 6px
        border-radius 6px
        text-align center
        font-size 9px
        font-weight 700
        color #fff
        background rgb(240, 20, 20)
        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
    & > span:nth-of-type(2)
        margin 0 12px 0 80px
        padding-right 12px
        line-height 24px
        border-right 1px solid rgba(255, 255, 255, 0.1)
        font-size 24px
        font-weight 700
        color rgba(255, 255, 255, 0.4)
        @media only screen and (max-width: 320px)
          margin  0 4px 0 56px
          font-size 18px
        &.highlight
          color #fff
    & > span:nth-of-type(3)
        line-height 24px
        font-size 12px
        color rgba(255, 255, 255, 0.4)
        vertical-align top
  .shop-cart-right
    flex  0 0 105px
    width 105px
    padding 12px 8px
    line-height 24px
    text-align center
    font-size 14px
    font-weight 700
    color rgba(255, 255, 255, 0.4)
    background #2B333B
    @media only screen and (max-width: 320px)
      flex 0 0 80px
    &.enough
      background #00c850
      color #fff
  .ball-wrap
    display inline-block
    .drop
      position fixed
      bottom 26px
      left 32px
      z-index 100
      transition all 0.4s cubic-bezier(0.49, -0.55, 0.75, 0.41)
      @media only screen and (max-width: 320px)
        left 22px
      .ball
        width 16px
        height 16px
        border-radius 50%
        background rgb(0, 160, 220)
        transition all 0.4s linear
.shop-cart-list
  position absolute
  left 0
  bottom 0
  z-index 30
  width 100%
  transition all 0.5s linear
  & >h3
    width 100%
    height 40px
    line-height 40px
    padding 0 18px
    overflow hidden
    background #f3f5f7
    font-size 0
    & > span:nth-of-type(1)
      float left
      font-size 14px
      font-weight 200
      color rgb(7, 17, 27)
    .empty
      float right
      font-size 12px
      color rgb(0, 160, 220)
  .chosen-items
    max-height 287.5px
    overflow hidden
    background #fff
    .chosen-item
      display flex
      margin 0 18px
      height 48px
      padding 12px 0
      border-1px(rgba(7, 17, 27, 0.1))
      & > span:nth-of-type(1)
        flex 1
        line-height 24px
        font-size 14px
        color rgb(7, 17, 27)
      & > span:nth-of-type(2)
        flex 0 0 56px
        margin 0 12px 0 18px
        line-height 24px
        font-size 10px
        font-weight normal
        color rgb(240 , 20, 20)
        .price
          font-size 14px
          font-weight 700
    & li:last-of-type
      border-none()
  &.fold-enter, &.fold-leave-to
    opacity 0
    transform translateY(100%)
.fade
  position fixed
  top 0
  left 0
  z-index 25
  width 100%;
  height 100%;
  background rgba(7, 17, 27, 0.6)
  background-filter blur(10px)
</style>
