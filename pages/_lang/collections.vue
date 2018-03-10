<template lang="pug">
  Collections
</template>

<script>
  import Collections from '../../components/pages/collections/Collections.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'CollectionsPage',
    components: { Collections },
    mixins: [pageData]
  };
</script>
