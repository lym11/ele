<template>
<div class="ratings-wrap">
  <div class="overview">
    <div class="overview-left">
      <h3>{{seller.score}}</h3>
      <p>综合评分</p>
      <p>高于周边商家{{seller.rankRate}}%</p>
    </div>
    <div class="overview-right">
      <ul>
        <li class="overview-right-item">
          <div>服务态度</div>
          <star size="36" :score="seller.serviceScore"/>
          <div>{{seller.serviceScore}}</div>
        </li>
        <li class="overview-right-item">
          <div>菜品评价</div>
          <star size="36" :score="seller.foodScore"/>
          <div>{{seller.foodScore}}</div>
        </li>
        <li class="overview-right-item">
          <div>送达时间</div>
          <div>{{seller.deliveryTime}}分钟</div>
        </li>
      </ul>
    </div>
  </div>
  <split/>
  <rating-select :ratings="ratings" :onlyContent.sync="onlyContent" :selectType.sync="selectType"/>
  <ul>
    <li class="rating-item" v-for="(rating,index) in ratings" :key="index" v-show="needShow(rating.text, rating.rateType)">
      <div class="avatar"><img :src="rating.avatar" width="28" height="28" /></div>
      <div class="rating-content">
        <p>{{rating.username}}</p>
        <p>
          <star class="rating-star" size="24" :score="rating.score"/>
          <span v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
        </p>
        <p v-show="rating.text">{{rating.text}}</p>
        <p>
          <span :class="rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down'" v-show="rating.recommend.length > 0"></span>
          <span class="recommend" v-show="rating.recommend.length" v-for="item in rating.recommend" :key="item">{{item}}</span>
        </p>
        <p class="rateTime">{{rating.rateTime | formdate}}</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
  import Star from '../start/Start'
  import Split from '../split/Split'
  import RatingSelect from '../ratingSelect/RatingSelect'
  import {formDate} from '../../common/js/date'
  const ALL = 2;
    export default {
      props: {
        seller: Object
      },
      data () {
        return {
          ratings: [],
          onlyContent: false,
          selectType: ALL
        }
      },
      created () {
        this.$axios.get('/api/ratings')
          .then(res => {
            res = res.data;
            if (res.errorNum === 0) {
              this.ratings = res.data;
            }
          })
      },
      components: {
        Star,
        Split,
        RatingSelect
      },
      methods: {
        needShow (text, type) {
          if (this.onlyContent && !text) {
            return false
          }
          if (this.selectType === ALL) {
            return true
          } else {
            return this.selectType === type
          }
        }
      },
      filters: {
        formdate (time) {
          let date = new Date(time);
          return formDate(date, 'yyyy-MM-dd hh:mm')
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
.overview
  display flex
  padding 18px 0
  .overview-left
    flex 0 0 137px
    text-align center
    border-right 1px solid rgba(7, 17, 27, 0.1)
    font-size 0
    & > h3
      line-height 28px
      font-size 24px
      color rgb(255, 153, 0)
    & > p:nth-of-type(1)
      margin 6px 0 8px
      line-height 12px
      font-size 12px
      color rgb(7, 17, 27)
    & > p:nth-of-type(2)
      margin-bottom 6px
      line-height 10px
      font-size 10px
      color rgb(147, 153, 159)
  .overview-right
    flex 1
    padding 0 24px
    font-size 0
    @media only screen and (max-width: 320px)
      padding 0 8px
    .overview-right-item
      margin-bottom 8px
      &:last-of-type
        margin-bottom 0
      &>div
        display inline-block
        line-height 18px
        font-size 12px
        &:nth-of-type(1)
          margin-right 12px
          color rgb(7, 17, 27)
        &:nth-of-type(2)
          vertical-align top
        &:nth-of-type(3)
          color rgb(255, 153, 0)
.rating-item
  display flex
  padding 18px 0
  margin 0 18px
  border-1px(rgba(7, 17, 27, 0.2))
  .avatar
    flex 0 0 28px
    margin-right 12px
  .rating-content
    position relative
    flex 1
    font-size 0
    &>p:nth-of-type(1)
      line-height 24px
      font-size 12px
      color rgb(7, 17, 27, 0.2)
    &>p:nth-of-type(2)
      margin 4px 0 6px
      .rating-star
        display inline-block
        margin-right 6px
        vertical-align top
      &>span:nth-of-type(1)
        display inline-block
        line-height 12px
        font-size 10px
        font-weight 200
        color rgb(147, 153, 159)
    &>p:nth-of-type(3)
      margin-bottom 8px
      line-height 18px
      font-size 12px
      color rgb(7, 17, 27)
    .recommend
      display inline-block
      margin-right 8px
      margin-bottom 2px
      padding 0 6px
      line-height 16px
      border 1px solid rgba(7, 17, 27, 0.1)
      border-radius 2px
      font-size 9px
      color rgb(147, 153, 159)
      &:last-child
        margin-right 0
    .icon-thumb_down,.icon-thumb_up
      display inline-block
      margin-right 8px
      line-height 16px
      font-size 12px
    .icon-thumb_up
      color rgb(0, 160, 220)
    .icon-thumb_down
      color rgb(183, 187, 191)
    .rateTime
      position absolute
      top 0
      right 0
      line-height 12px
      font-size 10px
      font-weight 200
      color rgb(147, 153, 159)
</style>
