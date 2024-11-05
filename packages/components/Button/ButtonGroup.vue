<script lang='ts' setup>
import type { ButtonGroupContext, ButtonGroupProps } from './types'
import { provide, reactive, toRef } from 'vue'
import { BUTTON_GROUP_CTX_KEY } from './constants'

defineOptions({
  name: 'YButtonGroup',
})

const props = defineProps<ButtonGroupProps>()

provide<ButtonGroupContext>(BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
    disabled: toRef(props, 'disabled'),
  }),
)
</script>

<template>
  <div class="y-button-group">
    <slot />
  </div>
</template>

<style scoped src="./style.css"></style>
