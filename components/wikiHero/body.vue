<template>
    <bHeroBody>
        <template #title>
            <template v-if="!!$store.state.page.data?.document && $store.state.page.viewName !== 'error'">
                <span v-if="$store.state.page.data.document.forceShowNamespace !== false" class="namespace"
                    >{{ $store.state.page.data.document.namespace }}:</span
                >{{ $store.state.page.data.document.title }}
            </template>
            <template v-else>
                {{ $store.state.page.title }}
            </template>
        </template>
        <template #subtitle>
            <span v-if="$store.state.page.viewName === 'wiki' && $store.state.page.data.date">
				{{ $t('skin_buma:last_edit', { date: new Date(store.state.page.data.date * 1000).toLocaleString() }) }}
            </span>

            <span v-else-if="$store.state.page.viewName === 'notfound'"> {{ $t('skin_buma:notfound') }} </span>

            <span v-else> Powered by the tree engine </span>
        </template>
    </bHeroBody>
</template>

<style lang="css" scoped>
.namespace {
    opacity: 70%;
}
</style>

<script setup>
import localDate from '~/components/localDate.vue';
import bHeroBody from '../bulma/b-heroBody.vue';

import { watch, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()


function updateNotFoundImage(viewName) {
  const article = document.querySelector('.wiki-article')
  const existing = document.querySelector('#notfoundImg')

  if (existing) existing.remove()

  if (viewName === 'notfound' && article) {
    const count = 2 // notfound 이미지 개수
    const randomNum = Math.floor(Math.random() * count) + 1
    const randomSrc = `/notfound${randomNum}.png`
    const alertBox = article.querySelector('.thetree-alert')
    article.insertAdjacentHTML(
      'afterbegin',
      `<img id="notfoundImg"
            src="${randomSrc}"
            style="width: 299px;opacity:0.4;right: 0px;padding-right:10px;margin-right:20px;z-index: -1;position: absolute;">`
    )
  }
}
onMounted(() => {
  updateNotFoundImage(store.state.page.viewName)

  watch(
    () => store.state.page.viewName,
    (newVal) => updateNotFoundImage(newVal)
  )
})
</script>
