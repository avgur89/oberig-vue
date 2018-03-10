<template lang="pug">
  Constructor
</template>

<script>
  import Constructor from '../../components/pages/constructor/Constructor.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'ConstructorPage',
    components: { Constructor },
    mixins: [pageData]
  };
</script>
