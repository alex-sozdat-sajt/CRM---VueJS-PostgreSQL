export default{
    install(Vue, options) {
        Vue.prototype.$message = function(text) {
            console.log('text ',text)
            M.toast({html: text})
        }
        Vue.prototype.$error = function(html) {
            M.toast({html: `[Ошибка]: ${html}`})
        }
    }
}