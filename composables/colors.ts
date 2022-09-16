const counter = ref(0)
function time_lapsus() {
  counter.value++
}
const control_color = ref()
export function activate_colors() {
  control_color.value = setInterval(time_lapsus, 500)
}
export function deactivate_colors() {
  clearInterval(control_color.value)
}

export function color_return(i: number) {
  return `hsl(${((i * 10) + counter.value * 6 % 360)},80%,50%)`
}
