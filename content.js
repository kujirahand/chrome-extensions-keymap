// contents
console.log('--- content.js onLoad ---')
// init keymaps
document.keymaps = {}
chrome.runtime.sendMessage({action:'loadConfig'}, (obj) => {
    console.log('@@@callback=', obj)
    document.keymaps.keys = obj.keys
})

// keydown event
document.body.addEventListener('keydown', (e, elem) => {
    // console.log(e)
    // console.log('@@@=',document.keymaps.keys)
    const pat = []
    if (e.altKey) { pat.push('alt') }
    if (e.ctrlKey) { pat.push('ctrl') }
    if (e.metaKey) { pat.push('meta') }
    if (e.shiftKey) { pat.push('shift') }
    if (e.key) { pat.push(e.key) }
    const patStr = pat.join('+')
    if (document.keymaps.keys[patStr]) {
        const action = document.keymaps.keys[patStr]
        console.log('doAction=', action, 'keys=', patStr)
        chrome.runtime.sendMessage({
            action: 'action',
            name: action,
            args: [patStr]
        }, (result) => {
            console.log('result=', result)
        })
    }
})



