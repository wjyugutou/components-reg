<script lang='ts' setup>
import type { ButtonEmits, ButtonInstance, ButtonProps } from './types.ts'
import { throttle } from 'lodash-es'
import { computed, useTemplateRef } from 'vue'

defineOptions({
  name: 'YButton',
})

const {
  size = 'default',
  nativeType = 'button',
  tag = 'button',
  type = 'info',
  disabled = false,
  plain = false,
  round = false,
  loading = false,
  circle = false,
  throttled = false,
  throttleDuration = 1000,
} = defineProps<ButtonProps>()

const emit = defineEmits<ButtonEmits>()

const slots = defineSlots()

const _ref = useTemplateRef<HTMLButtonElement>('button')

const handleClick = (e: MouseEvent) => emit('click', e)
const handleClickThrottled = throttle(handleClick, throttleDuration)

const clickFunc = computed(() => throttled ? handleClickThrottled : handleClick)

defineExpose<ButtonInstance>({
  ref: _ref,
})
</script>

<template>
  <component
    :is="tag"
    ref="button"
    :type="nativeType === 'button' ? nativeType : undefined"
    class="y-button"
    :class="{
      [`y-button--${type}`]: type,
      [`y-button--${size}`]: size,
      'is-disabled': disabled,
      'is-loading': loading,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
    }"
    :disabled="disabled || !!loading"
    @click="clickFunc"
  >
    <slot />
  </component>
</template>

<style>
@import './style.css';
</style>
