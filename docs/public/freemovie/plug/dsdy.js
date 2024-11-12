const CryptoJS = require('CryptoJS')
const Http = require('http')

const meta = {
    name: '毒蛇电影',
    available: true,
    priority: 10,
    from: 'https://www.dushe03.com/',
    imgUrl: 'https://vres.jxlfl.cn'
}
const search = async function (title, page) {
    title = title.replaceAll(' ', '')
    const url = meta.from + 'search?k=' + title + '&page=' + page
    const modelData = []
    var res = await fetch(url)
    if (!res || res.status !== 200) throw new Error(meta.name + '请求失败')
    const parser = new DOMParser()
    const doc = parser.parseFromString(await res.text(), 'text/html')

    const aTag = doc.querySelectorAll('.search-result-item')

    for (var i = 0; i < aTag.length; i++) {
        var item = aTag[i]
        var code = item.getAttribute('href').match(/\d+/g)[0]
        var tag = ""
        var img = item.querySelectorAll('img')[1].getAttribute('data-original')
        var title = item.querySelectorAll('.title')[1].textContent

        const obj = {
            platform: meta.from,
            title: title,
            img: meta.imgUrl + img,
            id: code,
            tag: tag
        }
        modelData.push(obj)
    }
    console.log(modelData)
    return {
        data: modelData
    }
}

async function getDetailData(item) {
    const url = meta.from + 'detail/' + item.id + '.html'
    let res = await fetch(url)
    if (!res || res.status !== 200) throw new Error(meta.name + '请求失败')

    const parser = new DOMParser()
    const doc = parser.parseFromString(await res.text(), 'text/html')
    const detailData = doc.querySelector('.detail-box-main')
    const itemList = detailData.querySelectorAll('.detail-info-row-main')

    const lineHeader = doc.querySelectorAll('.swiper-wrapper>.source-swiper-slide')
    const lineData = doc.querySelectorAll('.episode-box-main>.episode-list')


    const region = ""
    const desc = detailData.querySelector('.detail-desc').textContent
    const director = itemList[0].textContent
    const actor = itemList[1].textContent
    const updateTime = itemList[2].textContent
    const tag = itemList[3].textContent
    const line = {}

    for (let i = 0; i < lineData.length; i++) {
        const itemLine = lineData[i]
        const itemHeader = lineHeader[i]
        const itemHeaderSource = itemHeader.querySelectorAll('.source-item-label')[1]
        const aEls = itemLine.querySelectorAll('a')

        if (itemHeaderSource.textContent.includes('4K')) continue

        const itemValue = {
            html: itemHeaderSource.textContent,
            value: aEls.length > 0 ? aEls[0].getAttribute('href').split('-')[1] : '',
            total: []
        }
        line[itemValue.html] = itemValue
        for (const aEl of aEls) {
            const totalItem = {}
            itemValue.total.push(totalItem)
            totalItem.html = aEl.textContent
            const href = aEl.getAttribute('href')
            totalItem.href = href
        }


    }
    item.region = region
    item.desc = desc
    item.director = director
    item.actor = actor
    item.updateTime = updateTime
    item.line = line
    item.tag = tag
    return item
}

const play = async function (option) {

    let url = ''
    const total = option.line[option.activeLine].total
    for (let i = 0; i < total.length; i++) {
        if (total[i].html == option.activeNumber) {
            url = total[i].href
        }
    }

    const res = await fetch(meta.from + url)
    if (!res || res.status !== 200) throw new Error(meta.name + '请求失败')
    const data = await res.text()

    const cachePattern = /whatTMDwhatTMDPPPP = '(.*?)'/g


    var resourseUrl = cachePattern.exec(data)[1].replaceAll('\\', '')



    return {
        url: decrypt(resourseUrl)
    }



}
function decrypt(encryptStr) {
    var str = "FNF9aVQF!G*0ux@2hAigUeB3"
    var cs = CryptoJS['enc']['Utf8']['parse'](str)
    //let nextstr=window["whatTMDwhatTMDPPPP"]
    let nextstr = encryptStr

    var cs2 = CryptoJS['enc']['Base64']['parse'](nextstr)

    const obj = {
        ciphertext: cs2
    }

    var dec = CryptoJS['AES']['decrypt'](obj, cs, { mode: CryptoJS['mode']['ECB'], padding: CryptoJS['pad']['Pkcs7'] })

    var url = dec['toString'](CryptoJS['enc']['Utf8'])
    return url
}

module.exports = {
    author: 'MetaSola',
    name: meta.name,
    version: 1.0,
    srcUrl:"https://blog.metasola.cn/freemovie/plug/dsdy.js",
    getDetailData: getDetailData,
    search: search,
    play: play
}