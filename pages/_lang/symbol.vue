<template lang="pug">
  Symbols
</template>

<script>
  import Symbols from '../../components/pages/symbol/Symbols.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'SymbolPage',
    components: { Symbols },
    mixins: [pageData]
  };
</script>
