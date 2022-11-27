import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDialog } from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
    aliases: {
      MyVDialog: VDialog,
    },
    defaults: {
      MyVDialog: { closeOnBack: true },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
