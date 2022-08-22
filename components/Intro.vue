<script lang="ts">
import { Icon } from '@iconify/vue'

export default {
  components: {
    Icon,
  },
}
</script>

<template>
  <div class="intro grid grid-flow-column">
    <ul class="text-lg">
      <li>
        <!-- <Icon icon="eos-icons:installing" /> -->
        Searching is important but also discovering
      </li>
      <li>
        <Icon icon="eos-icons:atom-electron" />
        Your urls everywhere
      </li>
      <li>
        <Icon icon="eos-icons:atom-electron" />
        Share urls
      </li>
      <li>
        <Icon icon="eos-icons:atom-electron" />
        Comments on urls
      </li>
      <li>
        <Icon icon="eos-icons:atom-electron" />
        Discover urls
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
}

li {
  flex:1;
  display: flex;
  align-items: center;
}

li > * {
  margin:10px;
}

.intro{
  display: grid;

}
</style>
