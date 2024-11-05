<script lang='ts' setup>
import type { ButtonEmits, ButtonGroupContext, ButtonInstance, ButtonProps } from './types.ts'
import { throttle } from 'lodash-es'
import { computed, inject, useTemplateRef } from 'vue'
import { YIcon } from 'yugutou-ui'
import { BUTTON_GROUP_CTX_KEY } from './constants.ts'

defineOptions({
  name: 'YButton',
})

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'default',
  nativeType: 'button',
  tag: 'button',
  type: 'info',
  throttleDuration: 1000,
})

const emit = defineEmits<ButtonEmits>()

const slots = defineSlots()

const btnGroupCtx = inject<ButtonGroupContext>(BUTTON_GROUP_CTX_KEY)

const _ref = useTemplateRef<HTMLButtonElement>('button')

const size = computed(() => btnGroupCtx ? btnGroupCtx.size : props.size)
const type = computed(() => btnGroupCtx ? btnGroupCtx.type : props.type)
const disabled = computed(() => (btnGroupCtx ? btnGroupCtx.disabled : props.disabled) || false)

const handleClick = (e: MouseEvent) => emit('click', e)
const handleClickThrottled = throttle(handleClick, props.throttleDuration)

function clickFunc(e: MouseEvent) {
  if (props.throttled) {
    handleClickThrottled(e)
  }
  else {
    handleClick(e)
  }
}

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
    :autofocus="autofocus"
    :disabled="disabled || loading ? true : undefined"
    @click="clickFunc"
  >
    <template v-if="loading">
      <slot name="loading">
        <YIcon class="loading-icon" :icon="loadingIcon ?? 'spinner'" spin size="1x" />
      </slot>
    </template>

    <YIcon v-if="icon && !loading" :icon="icon" size="1x" />

    <template v-if="!circle && slots.default">
      <span>
        <slot />
      </span>
    </template>
  </component>
</template>

<style>
@import url('./style.css');
</style>
