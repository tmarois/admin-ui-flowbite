interface Instance {
    id: string;
    key: string;
    object: object;
}

export const useInstances = (): Ref<Instance[]> => {
    return useState('instances', () => []);
}

export const addInstance = (id: string, key: string,  object: object) => {
    const instance = getInstance(id);
    const instances = useInstances()
    if (!instance) {
        instances.value.push({id, key, object})
    }
}

export const getInstance = (id: string) => {
    const instances = useInstances();
    if (instances.value.some((instance) => instance.id === id)) {
        return instances.value.find((instance) => instance.id === id);
    }
}

export const getInstanceIndex = (id: string) => {
    const instances = useInstances();
    const index = instances.value.findIndex((instance) => instance.id === id);
    if (index !== -1) {
        return index;
    }
}

export const removeInstance = (id: string) => {
    const instances = useInstances();
    instances.value = instances.value.filter(instance => instance.id !== id)
}

export const hideInstance = (id: string) => {
    const instance = getInstance(id)
    if (instance) instance.object.hide()
}

export const showInstance = (id: string) => {
    const instance = getInstance(id)
    if (instance) instance.object.show()
}

export const toggleInstance = (id: string) => {
    const instance = getInstance(id)
    if (instance) instance.object.toggle()
}