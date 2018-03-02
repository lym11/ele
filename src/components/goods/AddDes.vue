<template>
<div class="wrapper">
  <transition name="move">
    <span class="cart-dec icon-remove_circle_outline"
          v-show="food.count>0"
          @click="$emit('decToCart',food.name)"
    ></span>
  </transition>
  <span class="cart-count" v-show="food.count>0">{{food.count}}</span>
  <span class="cart-add icon-add_circle" @click.stop="add(food.name, $event)"></span>
</div>
</template>

<script>
    export default {
        props: {
          food: Object
        },
        data () {
            return {}
        },
        methods: {
          add (name, event) {
            this.$emit('addToCart', name, event.target)
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.wrapper
  font-size 0
  .cart-dec
    display inline-block
    line-height 24px
    vertical-align top
    font-size 24px
    color rgb(0, 160, 220)
    transition all 0.4s linear
    &.move-enter, &.move-leave-to
      opacity  0
      transform translateX(24px) rotate(180deg)
  .cart-count
    display inline-block
    width 24px
    line-height 24px
    vertical-align top
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
  .cart-add
    display inline-block
    line-height 24px
    vertical-align top
    font-size 24px
    color rgb(0, 160, 220)
</style>
