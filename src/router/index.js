import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/Goods'
import Ratings from '../components/ratings/Ratings'
import Seller from '../components/seller/Seller'

Vue.use(Router);
const routes = [
  { path: '/goods', name: 'Goods', component: Goods },
  { path: '/ratings', name: 'Ratings', component: Ratings },
  { path: '/seller', name: 'Seller', component: Seller }
];
let router = new Router({
  routes,
  linkActiveClass: 'active'
});
router.push('/goods');
export default router;
