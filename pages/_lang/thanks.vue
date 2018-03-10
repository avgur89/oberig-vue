<template lang="pug">
  Thanks
</template>

<script>
  import Thanks from '~/components/pages/thanks/Thanks.vue';
  import pageData from '../../mixins/pageData';

  export default {
    name: 'ThanksPage',
    components: { Thanks },
    mixins: [pageData]
  };
</script>
