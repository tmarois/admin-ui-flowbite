<template>
    <component 
        v-bind="options.data" 
        :is="options.tag" 
        :class="classes"
    >
        <span v-if="loading || slots?.icon" :class="{
            'flex items-center justify-center' : true,
            'mr-2': slots?.default,
        }">
            <span v-if="loading" :class="{
                'btn__loader': loading && !slots?.default,
                'opacity-0': !loading,
            }">
                <slot name="loader">
                    <svg aria-hidden="true" role="status" class="w-5 h-5 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" :fill="fillColor"/></svg>
                </slot>
            </span>
            <span v-if="(slots?.icon && !slots?.default) || !loading && slots?.icon && slots?.default" :class="{
                'opacity-0': loading
            }">
                <slot name="icon" />
            </span>
        </span>
        <span v-if="slots?.default" :class="{
            'opacity-0': loading && !slots?.default
        }">
            <slot />
        </span>
        <span v-if="slots?.default && slots['icon-after']" class="ml-2">
            <slot name="icon-after" />
        </span>
    </component>
</template>

<style scoped>
.loading .btn__content {
	opacity: 0;
}
.btn__loader {
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
}
.btn {
    -webkit-user-select:none;
    user-select:none;
    transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;
    transition-duration:.2s;
    transition-timing-function:cubic-bezier(.4,0,.2,1);
    animation:button-pop .25s ease-out;
}
@keyframes button-pop{
    0%{
        transform:scale(.95)
    }
    40%{
        transform:scale(1.02)
    }
    to{
        transform:scale(1)
    }
}
.btn:active:hover,.btn:active:focus{
    animation:none;
    transform:scale(var(--btn-focus-scale,.95))
}
</style>

<script setup>
const isNuxt = typeof $nuxt !== 'undefined' || process.client;
const slots = useSlots()
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    circle: {
        type: Boolean,
        default: false
    },
    outlined: {
        type: Boolean,
        default: false
    },
    ghost: {
        type: Boolean,
        default: false
    },
    tag: {
        type: String,
        default: 'button'
    },
    target: {
        type: String,
        default: null
    },
    to: {
        type: String,
        default: null
    },
    href: {
        type: String,
        default: null
    },
});

const fillColor = computed(() => {
    if (props.disabled) return '#7c7c7c'
    return '#1C64F2';
})

const classes = computed(() => {
    return {
        'btn relative whitespace-nowrap font-medium rounded text-sm px-4 py-2 flex items-center justify-cente border': true,
        'border-transparent': !props.outlined,
        'text-white bg-blue-700 hover:bg-blue-800 shadow': !props.outlined && !props.ghost,
        'text-blue-600 border-blue-400 hover:border-blue-800 hover:bg-gray-100 hover:border-blue-700': props.outlined,
        'text-blue-600 hover:bg-gray-200': props.ghost && !props.outlined && !props.disabled,
        'cursor-pointer': !props.disabled,
        'cursor-not-allowed': props.disabled,
        '!bg-gray-300 !hover:bg-gray-300': !props.outlined && !props.ghost && props.disabled,
        '!border-gray-300 hover:!border-gray-300 text-gray-400': props.outlined && !props.ghost && props.disabled,
        'text-gray-400 !bg-gray-50': props.ghost && !props.outlined && props.disabled,
        'loading': props.loading,
        'rounded-full !p-2': props.circle
    };
});

const textClasses = computed(() => {
    return {
        'text-blue-600': props.outlined,
        'text-white': props.outlined,
    };
});

const options = computed(() => {
    let tag = '';

    const data = {
        disabled: false,
        target: null,
        href: null,
        to: null
    };

    if (!props.disabled) {
        if (props.to) {
            tag = isNuxt ? 'RouterLink' : 'RouterLink';
            data.to = props.to;
        } 
        else {
            tag = (props.href && 'a') || props.tag || 'div';
            if (tag === 'a' && props.href) data.href = props.href;
        }
        if (props.target) data.target = props.target;
    }
    else {
        tag = 'button'
    }

    if (tag === 'button' && props.disabled) {
        data.disabled = true;
    }

    return { tag, data };
});
</script>
