<template lang="pug">
  Collection
</template>

<script>
  import Collection from '~/components/pages/collection/Collection.vue';
  import pageData from '~/mixins/pageData';

  export default {
    name: 'CollectionPage',
    components: { Collection },
    mixins: [pageData]
  };
</script>
