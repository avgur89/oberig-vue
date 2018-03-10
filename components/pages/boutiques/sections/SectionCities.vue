<template lang="pug">
  section.SectionCities
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-50",
      :action="revealSection"
    )
    .SectionCities__list(:class="{ [$style.center]: pageData.boutiques.length < 2 }")
      article.SectionCities__item(
        v-for="(city, index) in pageData.boutiques",
        :key="index"
      )
        .SectionCities__title {{ city.label }}
        .SectionCities__desc
          span.SectionCities__address {{ city.address }}
          span.SectionCities__hours {{ city.working_hours }}
        .SectionCities__phone
          span.SectionCities__phone-text {{ t.boutique_phone_numbers_label }}:
          a.SectionCities__phone-number(
            v-for="phone in city.phones",
            :key="phone.id",
            :href="`tel:${phone.phone}`"
          ) {{ phone.phone }}
        .SectionCities__icons
          ButtonCircleIcon(
            :url="`https://www.google.com/maps/?q=${city.coordinates}`",
            icon="location_icon",
            width="14",
            height="18",
            v-if="city.coordinates"
          )
          ButtonCircleIcon(
            :url="`mailto:${city.email}`",
            :targetBlank="false",
            icon="email_icon",
            width="16",
            height="12",
            v-if="city.email"
          )
          ButtonCircleIcon(
            :url="`https://api.whatsapp.com/send?phone=${city.whatsapp_account}`",
            icon="whatsapp_icon",
            width="17",
            height="17",
            v-if="city.whatsapp_account"
          )
</template>

<script>
  import '~/assets/svg/dist/email_icon';
  import '~/assets/svg/dist/location_icon';
  import '~/assets/svg/dist/whatsapp_icon';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { Resp } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import ButtonCircleIcon from '../../../ui/ButtonCircleIcon.vue';

  @Component({
    components: { ButtonCircleIcon, BaseReveal },
    computed: mapGetters(['pageData', 't'])
  })
  export default class SectionCities extends Vue {
    /**
     * Animate cities screen.
     */
    revealSection() {
      new TimelineMax({ delay: 0.1 })
        // city items
        .staggerFromTo(
          '.SectionCities__item',
          0.75,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, ease: Power1.easeOut },
          Resp.isMobile ? 0 : 0.2
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionCities {
    position: relative;

    margin-bottom: 137px;

    @media (max-width: $minTablet) {
      margin-bottom: 96px;
    }

    &__list {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      @media (max-width: $minDesktop) {
        flex-direction: column;
        justify-content: flex-start;
      }
    }

    &__item {
      flex: 0 1 48%;
      width: 100%;

      margin-bottom: 49px;

      text-align: center;

      opacity: 0;

      &:nth-last-child(-n + 2) {
        margin-bottom: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;

        margin-bottom: 76px;

        &:nth-last-child(-n + 2) {
          margin-bottom: 76px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &__title {
      @include gradient-text(false);

      margin-bottom: 21px;

      font-family: $MinionProDisp;
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 1.4px;

      color: #3f4144;

      text-transform: uppercase;

      @media (max-width: $minTablet) {
        font-size: 25px;
        letter-spacing: 1px;
      }
    }

    &__desc {
      margin-bottom: 24px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }

    &__address {
      margin-right: 5px;
    }

    &__phone {
      margin-bottom: 28px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      &-text {
        display: block;

        margin-bottom: 23px;
      }

      &-number {
        display: block;

        margin-bottom: 2px;

        color: #444344;

        text-decoration: none;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>

<style lang="scss" module>
  .center {
    justify-content: center !important;
  }
</style>
