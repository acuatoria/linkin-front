const counter = ref(0)
function time_lapsus() {
  counter.value++
}
setInterval(time_lapsus, 500)
export function color_return(i: number) {
  return `hsl(${((i * 10) + counter.value * 6 % 360)},80%,50%)`
}
