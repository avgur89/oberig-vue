<template lang="pug">
  Product
</template>

<script>
  import Product from '~/components/pages/product/Product.vue';
  import pageData from '~/mixins/pageData';

  export default {
    name: 'ProductPage',
    components: { Product },
    mixins: [pageData]
  };
</script>
