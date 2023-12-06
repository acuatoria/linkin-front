<script>
export default {
  props: ['record'],
  emits: ['update'],
  data() {
    return ({
      showDialog: false,
      baseUrl: '',
    })
  },
  mounted() {
    this.baseUrl = window.location.origin
  },
  methods: {
    update() {
      this.$emit('update')
    },
  },
}
</script>

<template>
  <Dialog :message="`public link: ${baseUrl}/collection/${record.id}`" :show="showDialog" />
  <div class="collection">
    <v-item>
      <div flex flex-row justify-between items-center>
        <div text-left ml-3 overflow-x-auto>
          <NuxtLink :to="`/collection/${record.id}`">
            <div class="item-text">
              <span text-size-lg><v-chip color="lighten-1">{{ record.name }}</v-chip></span>
            </div>
            <div class="item-text" text-size-sm>
              {{ record.description || '{ your description }' }}
            </div>
          </NuxtLink>
          <div v-if="record.public" class="item-text" text-size-sm>
            <v-chip color="orange" @click="showDialog = !showDialog">
              public link: {{ `${baseUrl}/collection/${record.id}` }}
            </v-chip>
          </div>
          <div v-else class="item-text" text-size-sm>
            <v-chip color="red">
              This collection is private
            </v-chip>
          </div>
        </div>
        <div class="options_btn">
          <CollectionOptions :record="record" @update="update" />
        </div>
      </div>
    </v-item>
  </div>
</template>

<style scoped>
.options_btn{
  max-width: 50px;
}
.item-text{
  line-height: 1.5em;
  overflow-x: auto;
  white-space: nowrap;
}
.collection{
  min-height: 120px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.flex-no-overflow{
  min-width: 0;
}
</style>

