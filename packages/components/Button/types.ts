import type { Component, Ref } from 'vue'

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type NativeType = 'submit' | 'reset' | 'button'
export type ButtonSize = 'large' | 'default' | 'small' | 'mini'

export interface ButtonProps {
  tag?: string | Component
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeType
  disabled?: boolean
  loading?: boolean
  icon?: string
  loadingIcon?: string
  plain?: boolean
  round?: boolean
  circle?: boolean
  autofocus?: boolean
  throttled?: boolean
  throttleDuration?: number
}

export interface ButtonEmits {
  (e: 'click', value: MouseEvent): void
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
}
