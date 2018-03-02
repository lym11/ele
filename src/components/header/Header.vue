<template>
  <header>
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <seller-supports v-if="seller.supports" :supports="seller.supports" :icon-map="iconMap"/>
        <div class="support-total" v-if="seller.supports" @click="showDetail">
          <span class="total">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <div class="bulletin" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%"/>
    </div>
    <transition name="fade">
      <detail class="header-detail" v-show="detailShow" :seller="seller" :iconMap="iconMap" :show.sync="detailShow"/>
    </transition>
  </header>
</template>

<script>
  import sellerSupports from '../slider/verSlider'
  import Detail from './Detail'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailShow: false
      }
    },
    components: {
      sellerSupports,
      Detail
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  header
    position relative
    overflow hidden
    color #fff
    background rgba(7, 17, 27, .5)
    .content-wrap
      position relative
      margin 24px 12px 18px 24px
      font-size 0
      @media only screen and (max-width: 320px)
        margin 24px 6px 18px 14px
      .avatar
        display inline-block
        img
          border-radius 4px
      .content
        display inline-block
        margin-left 16px
        vertical-align top
        .title
          margin 2px 0 8px
          .brand
            display inline-block
            width 30px
            height 18px
            margin-right 6px
            vertical-align top
            background url("../../common/img/brand@2x.png") no-repeat center center
            background-size 30px 18px
          .name
            font-size 16px
            font-weight bold
            line-height 18px
        .desc
          margin-bottom 10px
          line-height 12px
          font-size 12px
          font-weight 200
        .support-total
          position absolute
          bottom 0
          right 10px
          padding 7px 8px
          background rgba(0, 0, 0, 0.2)
          height 24px
          text-align center
          border-radius 12px
          .total
            line-height 12px
            vertical-align top
            font-size 10px
            font-weight 200
          .icon-keyboard_arrow_right
            margin-left 2px
            line-height 12px
            font-size 10px
    .bulletin
      display flex
      padding 0 12px
      height 28px
      background rgba(7, 17, 27, 0.2)
      .bulletin-title
        flex 0 0 22px
        display inline-block
        width 22px 12px
        background url("../../common/img/bulletin@2x.png") no-repeat center center
        background-size 22px 12px
      .bulletin-text
        flex 0 1 auto
        margin 0 4px
        line-height 28px
        vertical-align top
        font-size 10px
        font-weight 200
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .icon-keyboard_arrow_right
        flex 0 0 10px
        display inline-block
        height 28px
        line-height 28px
        font-size 10px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .header-detail
      position: fixed
      z-index 100
      top 0
      left 0
      height 100%
      width 100%
      overflow auto;
      transition all 0.3s
      background rgba(7,17,27,0.8)
      backdrop-filter blur(10px)
      &.fade-enter, &.fade-leave-to
        opacity 0
</style>
