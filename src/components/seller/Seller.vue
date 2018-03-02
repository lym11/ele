<template>
<div class="seller-wrap">
  <div class="seller-title">
    <h2>{{seller.name}}</h2>
    <p>
      <start class="seller-score" size="36" :score="seller.score"/>
      <span>({{seller.score}})</span>
      <span>月售{{seller.sellCount}}单</span>
      <span class="like">
        <span class="icon-favorite" @click="toggleLike" :class="{active: isLike === true}"></span><br/>
        <span>{{isLike === true ? '已收藏' : '收藏'}}</span>
      </span>
    </p>
  </div>
  <ul class="seller-mess">
    <li>
      <p>
        <span>起送价</span><br/>
        <strong>{{seller.minPrice}}</strong>元
      </p>
    </li>
    <li>
      <p>
        <span>商家配送</span><br/>
        <strong>{{seller.deliveryPrice}}</strong>元
      </p>
    </li>
    <li>
      <p>
        <span>平均送达时间</span><br/>
        <strong>{{seller.deliveryTime}}</strong>分钟
      </p>
    </li>
  </ul>
  <split/>
  <h2>公告与活动</h2>
  <p class="seller-bulletin">{{seller.bulletin}}</p>
  <ul class="seller-supports">
    <li v-for="support in seller.supports" :key="support.type">
      <span class="supp-icon" :class="iconMap[support.type]"></span>
      <span>{{support.description}}</span>
    </li>
  </ul>
  <split/>
  <h2 class="seller-pic-title">商家实景</h2>
  <div class="seller-pic" ref="sellerPic">
    <ul>
      <li v-for="(pic, index) in seller.pics" :key="index">
        <img :src="pic" width="120" height="90"/>
      </li>
    </ul>
  </div>
  <split/>
  <h2 class="seller-inform-title">商家信息</h2>
  <ul class="seller-inform">
    <li v-for="(inform, index) in seller.infos" :key="index">{{inform}}</li>
  </ul>
</div>
</template>

<script>
  import Start from '../start/Start'
  import Split from '../split/Split'
  import IScroll from 'iscroll/build/iscroll-probe'
    export default {
      props: {
        seller: Object
      },
      data () {
        return {
          iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
          isLike: false
        }
      },
      created () {
        this.$nextTick(() => {
          this.sellerPic = new IScroll(this.$refs.sellerPic, {
            click: true,
            scrollX: true,
            scrollY: false
          })
        })
      },
      components: {
        Start,
        Split
      },
      methods: {
        toggleLike () {
          this.isLike = !this.isLike
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .seller-wrap
    .seller-title
      position relative
      margin 0 18px
      padding 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      & > h2
        margin 0 0 8px 0
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .seller-score
        display inline-block
        margin-right 8px
        vertical-align top
      & > p
        line-height 18px
        font-size 10px
        color rgb(77, 85, 93)
        & > span:nth-of-type(2)
          margin-left 12px
        .like
          position absolute
          top 18px
          right 0
          line-height 10px
          font-size 10px
          .icon-favorite
            display inline-block
            line-height 24px
            font-size 24px
            color rgba(7, 17, 27, 0.1)
            margin-bottom 4px
            &.active
              color rgb(240, 20, 20)
    .seller-mess
      display flex
      & > li
        flex 1
        margin 18px 0
        text-align center
        line-height 10px
        font-size 10px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        color rgb(7, 17, 27)
        &  span:nth-of-type(1)
          color rgb(147, 153, 159)
        & strong
          display inline-block
          margin-top 4px
          line-height 24px
          font-size 24px
          font-weight 200
      & > li:last-of-type
        border-right none
    h2
      margin 18px 18px 8px 18px
      line-height 14px
      font-size 14px
      color rgb(7, 17, 27)
    .seller-bulletin
      margin 0 30px
      padding-bottom 16px
      line-height 24px
      font-size 12px
      font-weight 200
      color rgb(240, 20, 20)
      border-1px(rgba(7, 17, 27, 0.1))
    .seller-supports
      margin 0 30px
      border-1px(rgba(7, 17, 27, 0.1))
      & > li
        padding 16px 0
        font-size 0
        border-1px(rgba(7, 17, 27, 0.1))
        & > span:nth-of-type(2)
          line-height 16px
          font-size 12px
          font-weight 200
          color rgb(7, 17, 27)
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
          bg-image("../../common/img/decrease_4")
        .discount
          bg-image("../../common/img/discount_4")
        .special
          bg-image("../../common/img/special_4")
        .invoice
          bg-image("../../common/img/invoice_4")
        .guarantee
          bg-image("../../common/img/guarantee_4")
      & > li:last-of-type
        border-none()
    .seller-pic-title
      margin-bottom 12px
    .seller-pic
      margin  0 18px 18px 18px
      width 100%
      & > ul
        display flex
        height 90px
        width 200%
        & > li
          flex 0 0 120px
          margin-right 6px
        & > li:last-of-type
          margin-right 0
    .seller-inform-title
      margin-bottom 0
      padding-bottom 12px
      border-1px(rgba(7, 17, 27, 0.1))
    .seller-inform
      margin 0 18px
      & > li
        padding 16px 12px
        line-height 16px
        font-size 12px
        font-weight 200
        border-1px(rgba(7, 17, 27, 0.1))
        color rgb(7, 17, 27)
      & > li:last-of-type
        border-none()
</style>
