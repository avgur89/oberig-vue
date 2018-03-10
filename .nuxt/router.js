import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _27207f7d = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _546de22e = () => import('../pages/thanks.vue' /* webpackChunkName: "pages/thanks" */).then(m => m.default || m)
const _d8527af8 = () => import('../pages/catalog.vue' /* webpackChunkName: "pages/catalog" */).then(m => m.default || m)
const _34700856 = () => import('../pages/philosophy.vue' /* webpackChunkName: "pages/philosophy" */).then(m => m.default || m)
const _69990065 = () => import('../pages/constructor.vue' /* webpackChunkName: "pages/constructor" */).then(m => m.default || m)
const _6ae69db3 = () => import('../pages/error.vue' /* webpackChunkName: "pages/error" */).then(m => m.default || m)
const _fc4e378c = () => import('../pages/boutiques.vue' /* webpackChunkName: "pages/boutiques" */).then(m => m.default || m)
const _6a3679fa = () => import('../pages/cookies.vue' /* webpackChunkName: "pages/cookies" */).then(m => m.default || m)
const _ba383d06 = () => import('../pages/symbol.vue' /* webpackChunkName: "pages/symbol" */).then(m => m.default || m)
const _1de00880 = () => import('../pages/collections.vue' /* webpackChunkName: "pages/collections" */).then(m => m.default || m)
const _448c8a03 = () => import('../pages/services.vue' /* webpackChunkName: "pages/services" */).then(m => m.default || m)
const _24244bc0 = () => import('../pages/formalization.vue' /* webpackChunkName: "pages/formalization" */).then(m => m.default || m)
const _41ff9ffe = () => import('../pages/how-to-order.vue' /* webpackChunkName: "pages/how-to-order" */).then(m => m.default || m)
const _29172cd6 = () => import('../pages/product/_alias.vue' /* webpackChunkName: "pages/product/_alias" */).then(m => m.default || m)
const _5fafd13e = () => import('../pages/personal/_guid.vue' /* webpackChunkName: "pages/personal/_guid" */).then(m => m.default || m)
const _81ad2fe6 = () => import('../pages/collection/_alias.vue' /* webpackChunkName: "pages/collection/_alias" */).then(m => m.default || m)
const _82164f0a = () => import('../pages/_lang/index.vue' /* webpackChunkName: "pages/_lang/index" */).then(m => m.default || m)
const _6c82cd40 = () => import('../pages/_lang/how-to-order.vue' /* webpackChunkName: "pages/_lang/how-to-order" */).then(m => m.default || m)
const _1486e390 = () => import('../pages/_lang/boutiques.vue' /* webpackChunkName: "pages/_lang/boutiques" */).then(m => m.default || m)
const _3d019e18 = () => import('../pages/_lang/philosophy.vue' /* webpackChunkName: "pages/_lang/philosophy" */).then(m => m.default || m)
const _02baf6b1 = () => import('../pages/_lang/error.vue' /* webpackChunkName: "pages/_lang/error" */).then(m => m.default || m)
const _059aa83f = () => import('../pages/_lang/symbol.vue' /* webpackChunkName: "pages/_lang/symbol" */).then(m => m.default || m)
const _56a6af76 = () => import('../pages/_lang/services.vue' /* webpackChunkName: "pages/_lang/services" */).then(m => m.default || m)
const _4a06c6be = () => import('../pages/_lang/formalization.vue' /* webpackChunkName: "pages/_lang/formalization" */).then(m => m.default || m)
const _5e588b78 = () => import('../pages/_lang/cookies.vue' /* webpackChunkName: "pages/_lang/cookies" */).then(m => m.default || m)
const _91b6ae20 = () => import('../pages/_lang/thanks.vue' /* webpackChunkName: "pages/_lang/thanks" */).then(m => m.default || m)
const _733a22e3 = () => import('../pages/_lang/constructor.vue' /* webpackChunkName: "pages/_lang/constructor" */).then(m => m.default || m)
const _f00e57fc = () => import('../pages/_lang/catalog.vue' /* webpackChunkName: "pages/_lang/catalog" */).then(m => m.default || m)
const _27812afe = () => import('../pages/_lang/collections.vue' /* webpackChunkName: "pages/_lang/collections" */).then(m => m.default || m)
const _2d8b97ea = () => import('../pages/_lang/collection/_alias.vue' /* webpackChunkName: "pages/_lang/collection/_alias" */).then(m => m.default || m)
const _13c69400 = () => import('../pages/_lang/personal/_guid.vue' /* webpackChunkName: "pages/_lang/personal/_guid" */).then(m => m.default || m)
const _80f7dcd0 = () => import('../pages/_lang/product/_alias.vue' /* webpackChunkName: "pages/_lang/product/_alias" */).then(m => m.default || m)



const scrollBehavior = function() {}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _27207f7d,
			name: "index"
		},
		{
			path: "/thanks",
			component: _546de22e,
			name: "thanks"
		},
		{
			path: "/catalog",
			component: _d8527af8,
			name: "catalog"
		},
		{
			path: "/philosophy",
			component: _34700856,
			name: "philosophy"
		},
		{
			path: "/constructor",
			component: _69990065,
			name: "constructor"
		},
		{
			path: "/error",
			component: _6ae69db3,
			name: "error"
		},
		{
			path: "/boutiques",
			component: _fc4e378c,
			name: "boutiques"
		},
		{
			path: "/cookies",
			component: _6a3679fa,
			name: "cookies"
		},
		{
			path: "/symbol",
			component: _ba383d06,
			name: "symbol"
		},
		{
			path: "/collections",
			component: _1de00880,
			name: "collections"
		},
		{
			path: "/services",
			component: _448c8a03,
			name: "services"
		},
		{
			path: "/formalization",
			component: _24244bc0,
			name: "formalization"
		},
		{
			path: "/how-to-order",
			component: _41ff9ffe,
			name: "how-to-order"
		},
		{
			path: "/product/:alias?",
			component: _29172cd6,
			name: "product-alias"
		},
		{
			path: "/personal/:guid?",
			component: _5fafd13e,
			name: "personal-guid"
		},
		{
			path: "/collection/:alias?",
			component: _81ad2fe6,
			name: "collection-alias"
		},
		{
			path: "/:lang",
			component: _82164f0a,
			name: "lang"
		},
		{
			path: "/:lang/how-to-order",
			component: _6c82cd40,
			name: "lang-how-to-order"
		},
		{
			path: "/:lang/boutiques",
			component: _1486e390,
			name: "lang-boutiques"
		},
		{
			path: "/:lang/philosophy",
			component: _3d019e18,
			name: "lang-philosophy"
		},
		{
			path: "/:lang/error",
			component: _02baf6b1,
			name: "lang-error"
		},
		{
			path: "/:lang/symbol",
			component: _059aa83f,
			name: "lang-symbol"
		},
		{
			path: "/:lang/services",
			component: _56a6af76,
			name: "lang-services"
		},
		{
			path: "/:lang/formalization",
			component: _4a06c6be,
			name: "lang-formalization"
		},
		{
			path: "/:lang/cookies",
			component: _5e588b78,
			name: "lang-cookies"
		},
		{
			path: "/:lang/thanks",
			component: _91b6ae20,
			name: "lang-thanks"
		},
		{
			path: "/:lang/constructor",
			component: _733a22e3,
			name: "lang-constructor"
		},
		{
			path: "/:lang/catalog",
			component: _f00e57fc,
			name: "lang-catalog"
		},
		{
			path: "/:lang/collections",
			component: _27812afe,
			name: "lang-collections"
		},
		{
			path: "/:lang/collection/:alias?",
			component: _2d8b97ea,
			name: "lang-collection-alias"
		},
		{
			path: "/:lang/personal/:guid?",
			component: _13c69400,
			name: "lang-personal-guid"
		},
		{
			path: "/:lang/product/:alias?",
			component: _80f7dcd0,
			name: "lang-product-alias"
		}
    ],
    fallback: false
  })
}
