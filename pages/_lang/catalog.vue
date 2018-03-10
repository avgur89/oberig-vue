<template lang="pug">
  Catalog
</template>

<script>
  import Catalog from '~/components/pages/catalog/Catalog.vue';
  import pageData from '~/mixins/pageData';

  export default {
    name: 'CatalogPage',
    components: { Catalog },
    mixins: [pageData]
  };
</script>
