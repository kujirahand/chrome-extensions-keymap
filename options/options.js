// options.js
let langId = 'en'
window.addEventListener('load', initGetLang)
window.addEventListener('load', loadOptions)

function initGetLang() {
    // get lang code
    if (window.navigator.languages) {
        langId = window.navigator.languages[0]
        console.log('lang=', langId)
    }
    const messageData = window.getlang[langId]
    let langs = document.querySelectorAll('.getlang')
    if (!langs) { return }
    for (let el of langs) {
        const id = el.dataset.id
        console.log(id)
        if (messageData[id]) {
            el.innerHTML = messageData[id]
        }
    }
}

function loadOptions() {

}

