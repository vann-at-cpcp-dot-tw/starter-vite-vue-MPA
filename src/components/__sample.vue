<script setup>
import { useSlots, onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent } from 'vue'

import useViewport from '@src/use/useViewport'
import { useStore } from 'vuex'
import { router, useRoute } from '@src/routes'
import { isEmpty, publicUrl } from '@src/helpers'

const props = defineProps({})
const emit = defineEmits([])
const route = useRoute()
const viewport = useViewport()
const store = useStore()
const state = reactive({})
</script>

<template>

</template>
