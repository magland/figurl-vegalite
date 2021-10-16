import { FigurlRequest, FigurlResponse } from "./FigurlRequestTypes";

const pendingRequests: {[key: string]: {
    onResponse: (response: FigurlResponse) => void
    onError: (err: any) => void
}} = {}

window.addEventListener('message', e => {
    const msg = e.data
    let x
    try {
        x = JSON.parse(msg)
    }
    catch(err) {
        return
    }
    if (x.type === 'figurlResponse') {
        const requestId = x.requestId
        const response = x.response
        if (requestId in pendingRequests) {
            pendingRequests[requestId].onResponse(response)
            delete pendingRequests[requestId]
        }
    }
})

const urlSearchParams = new URLSearchParams(window.location.search)
const queryParams = Object.fromEntries(urlSearchParams.entries())

const sendRequestToParent = async (request: FigurlRequest) => {
    return new Promise((resolve, reject) => {
        const requestId = randomAlphaString(10)
        pendingRequests[requestId] = {
            onResponse: (response: FigurlResponse) => {
                resolve(response)
            },
            onError: (err: any) => {
                reject(err)
            }
        }
        ;(window.top as any).postMessage(JSON.stringify({
            type: 'figurlRequest',
            figureId: queryParams.figureId,
            requestId,
            request
        }), queryParams.parentOrigin)
    })
}

const randomAlphaString = (num_chars: number) => {
    if (!num_chars) {
        /* istanbul ignore next */
        throw Error('randomAlphaString: num_chars needs to be a positive integer.')
    }
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < num_chars; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export default sendRequestToParent