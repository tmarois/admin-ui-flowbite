export let variants = {
    'FormLabel': {
        default: {
            base: 'block transition-colors duration-150 flex items-center select-none cursor-pointer',
            theme: 'text-sm font-medium text-gray-800',
            disabled: '!cursor-not-allowed !text-gray-600',
            errors: '!text-red-600',
            icon: 'text-blue-600'
        }
    },
    'FormInput': {
        default: {
            root: 'relative w-full',
            inputWrapper: 'grow relative',
            inputTheme: 'text-gray-800 border-slate-300 hover:bg-slate-50 bg-slate-50 hover:border-slate-400 focus:border-slate-700 hover:text-slate-900',
            input: 'block w-full rounded text-sm focus:outline-none focus:ring-0 border px-2 py-2',
            inputPrepend: 'rounded-l-none',
            prepend: 'inline-flex items-center px-3 text-sm text-gray-800 bg-gray-100 border border-r-0 border-gray-200 rounded-l-md',
            icon: 'pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center',
            clearable: 'cursor-pointer absolute inset-y-0 right-0 p-2 flex items-center',
            counter: 'absolute text-right text-[11px] text-gray-600 right-0.5 -bottom-[18px]',
            disabled: 'cursor-default bg-gray-100 border-gray-200 focus:border-gray-200',
            readonly: 'cursor-default',
            errors: 'border-red-500 focus:border-red-500 text-red-500 hover:text-red-800'
        }
    },
    'FormCheckbox': {
        default: {
            root: 'relative flex items-center text-gray-200',
            inputWrapper: 'relative cursor-pointer flex items-center',
            inputCheck: 'check-animation rounded focus:ring-0 h-4 w-4 cursor-pointer',
            inputRadio: 'radio rounded-full focus:ring-0 h-4 w-4 cursor-pointer',
            inputDisabled: '!cursor-not-allowed text-gray-300 border-gray-300',
            labelFalseWrapper: 'pr-3 text-sm',
            labelWrapper: 'pl-3 text-sm',
            switchColor: 'bg-gray-400',
            switchColorChecked: 'bg-blue-600',
            switchColorBorderChecked: 'border-blue-600',
            switchColorBorder: 'border-gray-400',
            switchDisabledColor: 'bg-gray-100',
            switchDisabledColorChecked: 'bg-blue-200',
            switchDisabledColorBorderChecked: 'border-blue-200',
            switchFalseLabelColorChecked: '!text-gray-400',
            switchTrueLabelColorChecked: '!text-blue-600',
            switchTrueLabelColor:'!text-gray-400'
        }
    },
    'FormSelect': {
        default: {
            root: 'relative w-full',
            selectWrapper: 'relative w-full',
            input: 'w-full bg-transparent font-medium pl-2 text-sm placeholder-gray-500 my-auto truncate border-0 focus:outline-none focus:ring-0 text-gray-900 p-0',
            inputBadgeSearch: 'bg-transparent font-medium pl-2 text-sm placeholder-gray-500 my-auto truncate border-0 focus:outline-none focus:ring-0 text-gray-900 mr-1 p-0',
            inputDisabled: 'text-gray-500 cursor-not-allowed',
            inputSelected: 'placeholder-gray-900',
            placeholderText: 'truncate pl-2 font-medium text-gray-500',
            placeholderTextSelected: 'truncate pl-2 font-medium text-gray-900',
            placeholderTextDisabled: 'text-gray-500 cursor-not-allowed',
            clearableWrapper: 'cursor-pointer absolute right-6 p-2 flex items-center',
            loaderWrapper: 'px-2 h-full flex items-center ml-auto',
            arrowWrapper: 'px-2 h-full flex items-center ml-auto',
            fetchingText: 'flex items-center rounded m-4 font-medium',
            searchableText: 'flex items-center justify-between rounded m-4 font-medium',
            noDataText: 'flex items-center justify-between rounded p-4 font-medium',
            dropdownBase: 'absolute w-full overflow-y-auto z-10',
            dropdownTheme: 'text-sm rounded rounded-t-none shadow-lg text-gray-500 bg-white focus:outline-none border border-gray-200',
            dropdownItem: 'relative flex items-center transition duration-150',
            dropdownItemTheme: 'cursor-pointer hover:bg-gray-100 hover:text-black',
            dropdownItemSelected: '!text-white !bg-blue-800',
            dropdownItemDisabled: 'text-gray-300',
            button: 'flex justify-start items-center w-full py-2 focus:outline-none group',
            buttonTheme: 'border text-sm font-medium text-gray-800 border-slate-300 hover:bg-slate-50 bg-slate-50 hover:border-slate-400 focus:border-slate-700 hover:text-slate-900',
            buttonDisabled: 'bg-gray-100 cursor-not-allowed',
            badgesWrapper: 'px-2 flex flex-wrap -mb-1'
        }
    },
    'ElementTooltip' : {
        default: {
            base: 'absolute z-30 invisible inline-block opacity-0 tooltip transition-opacity duration-300 max-w-[250px] shadow-sm px-3 py-2',
            theme: 'text-xs font-medium text-white bg-gray-900 rounded'
        },
    },
    'ElementAvatar' : {
        default: {
            base: 'relative inline-flex',
            baseContent: 'inline-flex items-center justify-center overflow-hidden cursor-default',
            themeContent: 'h-8 w-8 bg-blue-700 rounded-full border border-white',
            content: 'font-medium text-white text-sm',
            statusDot: 'bottom-0 left-6 absolute w-3 h-3 bg-green-400 border-2 border-white rounded-full'
        }
    },
    'ElementBadge' : {
        default: {
            base: 'inline-flex items-center px-2 py-1 gap-x-0.5 cursor-default',
            theme: 'rounded text-sm font-normal bg-gray-100 text-gray-800',
            button: 'group relative -mr-1 h-4 w-4 rounded-full hover:bg-gray-600/20',
            buttonIcon: 'h-4 w-4 stroke-gray-700/50 group-hover:stroke-gray-700/75'
        }
    }
};

export function getVariantClass(component, variant) {
    const v = variants[component];
    if (v && v[variant]) {
        return {...v['default'], ...v[variant]};
    }
    return v['default'];
};

function deepMerge(target, source) {
    for (const key in source) {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = deepMerge({ ...targetValue }, sourceValue);
        } else if (sourceValue !== undefined) {
            target[key] = sourceValue;
        }
    }
    return target;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function updateVariants(newVariants) {
    variants = deepMerge(variants, newVariants);
}