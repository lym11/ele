<template>
  <div class="detail-wrap">
    <div class="detail-main">
      <h2>{{seller.name}}</h2>
      <start class="seller-score" size="48" v-if="seller.score" :score="seller.score"/>
      <div class="item-title">
        <span class="line"></span>
        <span>优惠信息</span>
        <span class="line"></span>
      </div>
      <div class="discount-mes">
        <p v-for="support in seller.supports" :key="support.type">
          <span class="supp-icon" :class="iconMap[support.type]"></span>
          <span>{{support.description}}</span>
        </p>
      </div>
      <div class="item-title">
        <span class="line"></span>
        <span>商家公告</span>
        <span class="line"></span>
      </div>
      <div class="seller-inform">
        <p>{{seller.bulletin}}</p>
      </div>
    </div>
    <div class="close-wrap">
      <span class="icon-close" @click="$emit('update:show',false)"></span>
    </div>
  </div>
</template>

<script>
  import Start from '../start/Start'
  export default {
    data () {
      return {}
    },
    props: {
      seller: Object,
      iconMap: Array
    },
    components: {
      Start
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
.detail-main
  margin 64px 36px 0 36px
  padding-bottom 32px
  min-height 100%
  font-size 0
  & > h2
    margin-bottom 16px
    line-height 16px
    font-size 16px
    font-weight 700
    text-align center
  .seller-score
   text-align center
  .item-title
    display flex
    margin 28px 0 24px
    & > span:nth-of-type(1), & > span:nth-of-type(3)
      flex 1
      display inline-block
      margin-top 6px
      vertical-align middle
      border-top 1px solid rgba(255, 255, 255, 0.2)
    & > span:nth-of-type(2)
      margin 0 12px
      line-height 14px
      text-align center
      font-size 14px
      font-weight 700
  .discount-mes
    padding 0 12px
    & > p
      margin-bottom 6px
      & > span:nth-of-type(2)
        line-height 12px
        font-size 12px
        font-weight 200
        color #fff
      .supp-icon
        display inline-block
        width 16px
        height 16px
        margin-right 6px
        vertical-align top
        background-repeat no-repeat
        background-position center center
        background-size 16px 16px
      .decrease
        bg-image("../../common/img/decrease_2")
      .discount
        bg-image("../../common/img/discount_2")
      .special
        bg-image("../../common/img/special_2")
      .invoice
        bg-image("../../common/img/invoice_2")
      .guarantee
        bg-image("../../common/img/guarantee_2")
    & > p:last-of-type
      margin-bottom 0
  .seller-inform
    padding 0 12px
    & > p
      line-height 24px
      font-size 12px
      font-weight 200
.close-wrap
  position relative
  margin-top -128px
  width 100%
  text-align center
  @media only screen and (max-width: 320px)
    margin-top -32px
  .icon-close
    font-size 32px
    color rgba(255, 255, 255, 0.5)
</style>
