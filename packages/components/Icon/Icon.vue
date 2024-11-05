<script lang='ts' setup>
import type { IconProps } from './type'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'

defineOptions({ name: 'YIcon' })

const props = defineProps<IconProps>()

const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return { color: props.color ?? undefined }
})
</script>

<template>
  <i
    class="y-icon"
    :class="{ [`er-icon--${type}`]: type }"
    :style="customStyles"
  >
    <FontAwesomeIcon v-bind="filterProps" />
  </i>
</template>

<style>
@import url('./style.css');
</style>
