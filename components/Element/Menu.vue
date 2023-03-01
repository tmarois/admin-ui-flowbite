<template>
    <div class="relative">
        <div ref="triggerEl" class="relative">
            <slot
                :dropdown="dropdown"
                :visible="isVisible"
            ></slot>
        </div>
        <div ref="targetEl" class="relative hidden">
            <transition name="fade">
                <slot name="menu" 
                    :dropdown="dropdown"
                    :visible="isVisible">
                </slot>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: all .2s cubic-bezier(.25,.8,.25,1);
	z-index: 50;
}
.fade-enter, .fade-leave-to {
	z-index: 50;
	opacity: 0;
    transform: translateY(-5%);
}
</style>

<script setup>
import { Dropdown } from 'flowbite';

const props = defineProps({
    placement: {
        type: String,
        default: 'bottom'
    },
});

const dropdown = ref(false)
const visible = ref(false)
const targetEl = ref(null)
const triggerEl = ref(null)

const isVisible = computed(() => {
    return visible.value;
})

onMounted(() => {
    const options = {
        placement: props.placement,
        triggerType: 'click',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {
            visible.value = false
        },
        onShow: () => {
            visible.value = true
        }
    };
    dropdown.value = new Dropdown(targetEl.value, triggerEl.value, options);
});
</script>