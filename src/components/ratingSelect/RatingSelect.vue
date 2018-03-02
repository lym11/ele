<template>
<div class="select-wrapper">
  <div class="select-top border-1px">
    <span class="positive"
          :class="{active: selectType === 2}"
          @click="$emit('update:selectType',2)">{{desc.all}}<span>{{ratings.length}}</span></span>
    <span class="positive"
          :class="{active: selectType === 0}"
          @click="$emit('update:selectType',0)">{{desc.positive}}<span>{{positive.length}}</span></span>
    <span class="negative"
          :class="{active: selectType === 1}"
          @click="$emit('update:selectType',1)">{{desc.negative}}<span>{{negative.length}}</span></span>
  </div>
  <div class="select-bottom">
    <span class="icon-check_circle" :class="{on:onlyContent}" @click="$emit('update:onlyContent',!onlyContent)"></span>
    <span>只看有内容的评价</span>
  </div>
</div>
</template>

<script>
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
    export default {
        props: {
          selectType: {
            type: Number,
            default: ALL
          },
          ratings: {
            type: Array,
            default () {
              return []
            }
          },
          desc: {
            type: Object,
            default () {
              return {
                all: '全部',
                positive: '满意',
                negative: '不满意'
              }
            }
          },
          onlyContent: {
            type: Boolean,
            default: false
          }
        },
        data () {
            return {}
        },
      computed: {
          positive () {
            return this.ratings.filter(val => {
              return val.rateType === POSITIVE
            })
          },
        negative () {
          return this.ratings.filter(val => {
              return val.rateType === NEGATIVE
            })
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
.select-top
  margin 0 18px
  padding 18px 0
  border-1px(rgba(7, 17, 27, 0.1))
  & > span
    display: inline-block
    margin-right 8px
    padding 8px 12px
    line-height 16px
    text-align center
    border-radius 2px
    font-size 12px
    color rgb(77, 85, 93)
    &.positive
      background rgba(0, 160, 220, 0.2)
      &.active
        background rgb(0, 160, 220)
        color #fff
    &.negative
      margin-right  0
      background rgba(77, 85, 93, 0.2)
      &.active
        background rgb(77, 85, 93)
        color #fff
    & > span
      font-size 8px
.select-bottom
  padding 12px 18px
  border-1px(rgba(7, 17, 27, 0.1))
  font-size 0
  color rgb(147, 153, 159)
  & >span
    line-height 24px
    vertical-align top
    font-size 12px
  .icon-check_circle
    font-size 24px
    margin-right 4px
  .on
    color #00c850
</style>
