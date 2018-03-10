<template lang="pug">
  main.page-view(:class="$style.pageView")
    BaseBreadcrumbs(
      :baseItemLabel="catalog.label",
      :baseItemUrl="catalog.url"
    )
    SectionMain
    SectionConstruct(
      v-for="(category, categoryName, index) in constructCategories",
      :key="index",
      :title="category.title",
      :desc="category.desc",
      :items="category.items",
      :otherText="t.other_button",
      :isSymbols="categoryName === 'symbols'"
    )
    BlockWishlist(
      ref="ConstructorBlockWishlistRef",
      :hasMeaning="true",
      :wishTitle="p.subTitle6",
      :wishDesc="p.description6",
      :wishPlaceholder="p.placeholder6",
      :meaningTitle="p.subTitle5",
      :meaningDesc="p.description5",
      :meaningPlaceholder="p.placeholder5"
    )
    transition(name="fade")
      SectionSelected(
        :title="t.your_select_label",
        :items="constructorSelected",
        v-if="constructorHasSelected"
      )
    BlockContacts(
      :class="$style.blockContacts",
      :onSubmitAction="collectDataAndSend"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters, mapActions } from 'vuex';
  import { generateUrl } from '../../../modules/_helpers';
  import { sendForm } from '../../../api/formalization';
  import { groupBy } from 'lodash';
  import BaseBreadcrumbs from '../../ui/BaseBreadcrumbs.vue';
  import SectionMain from './sections/SectionMain.vue';
  import SectionConstruct from './sections/SectionConstruct.vue';
  import BlockWishlist from '../../blocks/BlockWishlist.vue';
  import SectionSelected from './sections/SectionSelected.vue';
  import BlockContacts from '../../blocks/BlockContacts.vue';

  @Component({
    components: {
      BaseBreadcrumbs,
      SectionMain,
      SectionConstruct,
      BlockWishlist,
      SectionSelected,
      BlockContacts
    },
    methods: mapActions(['clearConstructorItems']),
    computed: mapGetters(['t', 'p', 'pageData', 'constructorSelected', 'constructorHasSelected'])
  })
  export default class Constructor extends Vue {
    /**
     * @return {String}
     */
    get catalog() {
      return {
        url: generateUrl(this.$route.params.lang, 'catalog'),
        label: this.pageData.breadLabel
      };
    }

    /**
     * @return {Object}
     */
    get constructData() {
      const pageDataCopy = {
        productCategories: [...this.pageData.productCategories],
        metals: [...this.pageData.metals],
        stones: [...this.pageData.stones],
        symbols: [...this.pageData.symbols]
      };

      Object.keys(pageDataCopy).forEach((key, index) => {
        // create 'Other button' item
        pageDataCopy[key].push({
          id: 'other',
          category: key,
          categoryId: index,
          categoryName: this.p[`subTitle${index + 1}`],
          label: this.t.other_button
        });
        // set initially active items state, add 'category' field
        pageDataCopy[key].forEach((item) => {
          const isSelected = this.constructorSelected.some(({ category, id }) => (
            category === key && id === item.id
          ));
          item.category = key;
          item.categoryId = index;
          if (isSelected) item.selected = true;
        });
      });

      return pageDataCopy;
    }

    /**
     * @return {Object}
     */
    get constructCategories() {
      return {
        productCategories: {
          title: this.p.subTitle1,
          desc: this.p.description1,
          items: this.constructData.productCategories
        },
        metals: {
          title: this.p.subTitle2,
          desc: this.p.description2,
          items: this.constructData.metals
        },
        stones: {
          title: this.p.subTitle3,
          desc: this.p.description3,
          items: this.constructData.stones
        },
        symbols: {
          title: this.p.subTitle4,
          desc: this.p.description4,
          items: this.constructData.symbols
        }
      };
    }

    /**
     * @return {String}
     */
    get catalogUrl() {
      return generateUrl(this.$route.params.lang, 'catalog');
    }

    /**
     * Get data from the page and send to the server
     *
     * @param {Object} formData
     */
    collectDataAndSend(formData) {
      const productsSelected = {};
      const groupedSelected = groupBy(this.constructorSelected, 'category');

      Object.keys(groupedSelected).forEach((categoryName) => {
        productsSelected[categoryName] = groupedSelected[categoryName].map(item => item.id);
      });

      const messages = [...this.$refs.ConstructorBlockWishlistRef.$el.querySelectorAll('textarea')];
      const pageUserData = {
        ...formData,
        ...productsSelected,
      };

      messages.forEach(({ name, value }) => {
        pageUserData[name] = value;
      });

      sendForm(pageUserData, this.$router, this.clearConstructorItems);
    }
  }
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    position: relative;
    padding-top: 80px;

    @media (min-width: $desktop) {
      max-width: 1200px;

      margin: 0 auto;
    }

    @media (max-width: $minDesktop) {
      padding-top: 92px;
    }

    @media (max-width: $minTablet) {
      padding-top: 124px;
    }
  }

  .blockContacts {
    float: left;

    width: 100%;
  }
</style>
