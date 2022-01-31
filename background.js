console.log('background.js executed')
const INIT_DATA = {
    'keys': {
        'ctrl+i': 'zoomin',
        'ctrl+o': 'zoomout'
    },
    'counter': 1
}

// global localStorage
chrome.runtime.onMessage.addListener((request, sender, response) => {
    console.log('request=', request)
    console.log('sender=', sender)
    if (request.action === 'loadConfig') {
        chrome.storage.sync.get(null, (items) => {
            if (chrome.runtime.lastError || !items.counter) {
                chrome.storage.sync.set(INIT_DATA, () => {
                    console.log('ng:storage=', INIT_DATA)
                    response(INIT_DATA)
                })
                return true
            }
            console.log('storage=', items)
            response(items)
        })
        return true
    }
    if (request.action === 'action') {
        return doAction(request.name, request.args, response)
    }

    return true
})

function doAction(name, args, callback) {
    if (name === 'zoomin') {
        chrome.tabs.query({currentWindow: true, active: true}).then(function(tab) {
            chrome.tabs.getZoom(tab[0].id).then(function(zoomFactor) {
                chrome.tabs.setZoom(tab[0].id, zoomFactor + 0.1)
            })
        })
        callback(true)
        return true
    }
    if (name === 'zoomout') {
        chrome.tabs.query({currentWindow: true, active: true}).then(function(tab) {
            chrome.tabs.getZoom(tab[0].id).then(function(zoomFactor) {
                chrome.tabs.setZoom(tab[0].id, zoomFactor - 0.1)
            })
        })
        callback(true)
        return true
    }
    return false
}
