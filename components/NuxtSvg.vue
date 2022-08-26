<!-- eslint-disable vue/no-v-html -->

<template>
  <div
    :style="{ width, height, fill }"
    v-html="require(`~/static/svgs/${name}.svg?raw`)"
  ></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) name!: string
  @Prop({ required: false }) width?: string
  @Prop({ required: false }) height?: string
  @Prop({ required: false }) fill?: string
}
</script>
