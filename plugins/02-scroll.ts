export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        // window.scrollTo(0, 0);
        let pagebody = document.getElementById('pagebody');
        if (pagebody) {
            pagebody.scrollTo({top: 0,behavior: "smooth"});
        }
    })
})