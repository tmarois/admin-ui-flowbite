export const useModal = () => {
    return useState('modal', () => '')
}

export const hideModal = () => {
    const modal = useModal()
    modal.value=''
}

export const showModal = (name: string) => {
    const modal = useModal()
    modal.value = name
}