<template lang="pug">
  Formalization
</template>

<script>
  import Formalization from '../../components/pages/formalization/Formalization.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'FormalizationPage',
    components: { Formalization },
    mixins: [pageData]
  };
</script>
