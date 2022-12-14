import { rand } from '@vueuse/core'

const counter = ref(rand(0, 255))

export function color_return(i: number) {
  return `hsl(${((i * 10) + counter.value * 6 % 360)},80%,50%)`
}
