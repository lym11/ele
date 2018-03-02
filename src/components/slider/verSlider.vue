<template>
<div class="suppWrap">
  <ul ref="supps">
    <li class="supp" v-for="(item,index) in supports.concat(supports[0])" :key="index">
      <span class="supp-icon" :class="iconMap[item.type]"></span>
      <span class="supp-text">{{item.description}}</span>
    </li>
  </ul>
</div>
</template>

<script>
  export default {
    props: {
      supports: {
        type: Array
      },
      iconMap: {
        type: Array
      }
    },
    data () {
      return {
        idx: 0,
        timer: 0
      }
    },
    methods: {
      slider () {
        let ul = this.$refs.supps;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.idx++;
          ul.style.transition = `all 0.5s`;
          ul.style.webkitTransition = `all 0.5s`;
          ul.style.transform = `translateY(${-this.idx * 16}px)`;
          ul.style.webkitTransform = `translateY(${-this.idx * 16}px)`;
        }, 1500);
        ul.addEventListener('transitionEnd', () => {
          if (this.idx === this.supports.length) {
            ul.style.transition = 'none';
            ul.style.webkitTransition = 'none';
            ul.style.transform = `translateY(0)`;
            ul.style.webkitTransform = `translateY(0)`;
            this.idx = 0;
          }
        });
        ul.addEventListener('webkitTransitionEnd', () => {
          if (this.idx === this.supports.length) {
            ul.style.transition = 'none';
            ul.style.webkitTransition = 'none';
            ul.style.transform = `translateY(0)`;
            ul.style.webkitTransform = `translateY(0)`;
            this.idx = 0;
          }
        });
      }
    },
    mounted () {
      if (this.supports.length > 1) {
        this.slider()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .suppWrap
    height 12px
    margin-bottom 2px
    overflow hidden
    li
      margin-bottom 4px
      line-height 12px
      font-size 12px
      font-weight 200
      @media only screen and (max-width:320px)
        width : 160px;
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .supp-icon
        display inline-block
        width 12px
        height 12px
        margin-right 4px
        vertical-align top
        background-repeat no-repeat
        background-position center center
        background-size 12px 12px
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
</style>
