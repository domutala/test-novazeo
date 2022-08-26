<!-- eslint-disable vue/no-v-html -->

<template>
  <div class="card" :class="{ disable }" @click="sendSelect">
    <!-- séparer la carte en deux parties top et bottom -->

    <!-- top: contien l'image, le nom et rarity -->
    <div class="top">
      <div class="img-content">
        <img :src="`https://art.hearthstonejson.com/v1/orig/${card.id}.png`" />
      </div>

      <div class="name">
        {{ card.name }}
      </div>

      <div v-if="card.rarity" class="rarity" :class="[card.rarity]"></div>
    </div>

    <!-- bottom: contient le text -->
    <div class="bottom">
      <div>
        <div class="text">
          <span v-html="card.text"></span>
        </div>
      </div>
    </div>

    <!-- cost -->
    <div class="cost">
      {{ card.cost }}
    </div>

    <!-- cost -->
    <div v-if="card.attack" class="attack">
      {{ card.attack }}
    </div>

    <!-- cost -->
    <div v-if="card.health" class="health">
      {{ card.health }}
    </div>

    <div v-if="select" class="select">
      <nuxt-svg name="trash" class="svg" />
    </div>

    <div class="disable"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Card extends Vue {
  @Prop({ required: true }) card!: any
  @Prop({ type: Boolean, default: false }) select!: boolean
  @Prop({ type: Boolean, default: false }) disable!: boolean

  sendSelect() {
    // vérifier si la carte n'est pas désactivée
    if (this.disable) return

    this.$emit('select')
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles/vars';

.card {
  height: $card-height;
  width: $card-width;
  background-color: $card-color;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 0.6em;
  margin: 20px;
  cursor: pointer;
  transition: all 0.5s ease;

  .top {
    height: 100%;
    position: relative;

    .img-content {
      width: 90%;
      height: calc(100% + 20px);
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);

      img {
        max-width: 100%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .name {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: darken($card-color, 10);
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px !important;
      text-align: center;
    }

    .rarity {
      position: absolute;
      width: 15px;
      height: 20px;
      border-radius: 100%;
      background-color: darken($card-color, 15);
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 15px);
      border: 3px solid darken($card-color, 3);
    }
  }

  .bottom {
    > * {
      height: $card-height * 0.35;
      width: 100%;
      display: flex;
      justify-content: center;

      .text {
        width: 90%;
        height: 80%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: darken($card-color, 3);

        > span {
          padding: 5px;
          font-size: 14px;
        }
      }
    }
  }

  .cost,
  .attack,
  .health {
    width: 40px;
    height: 40px;
    position: absolute;
    border-radius: 0.2em;
    background-color: #868686;
    background-color: darken($card-color, 10);

    &.cost {
      top: 0;
      left: 0;
      transform: translate(-5px, -5px);
    }

    &.attack {
      bottom: 0;
      left: 0;
      transform: translate(-5px, 5px);
    }

    &.health {
      bottom: 0;
      right: 0;
      transform: translate(5px, 5px);
    }
  }

  .top .name,
  .health,
  .attack,
  .cost {
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
    font-family: 'Libre Baskerville', serif;
    font-size: 24px;
    color: #fff;
    text-shadow: rgb(0, 0, 0) 1px 0px 0px,
      rgb(0, 0, 0) 0.540302px 0.841471px 0px,
      rgb(0, 0, 0) -0.416147px 0.909297px 0px,
      rgb(0, 0, 0) -0.989992px 0.14112px 0px,
      rgb(0, 0, 0) -0.653644px -0.756802px 0px,
      rgb(0, 0, 0) 0.283662px -0.958924px 0px,
      rgb(0, 0, 0) 0.96017px -0.279416px 0px;

    .svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }

  .select {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    border-radius: 0.9em;
    background-color: rgb(255, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;

    .svg {
      fill: #fff;
      width: 32px;
    }
  }

  &.disable {
    cursor: default;

    .disable {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(darken($card-color, 20), 0.8);
      border-radius: inherit;
    }
  }

  &:hover:not(.disable) {
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
}
</style>
