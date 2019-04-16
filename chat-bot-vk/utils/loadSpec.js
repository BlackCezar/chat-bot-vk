const Request = require('request')
const cherio = require('cherio')
let specsB = [],
    specsZ = [],
    specsP = []

async function main () {
    await Request.get("http://kraskrit.ru/index.php/advanced-stuff/2018-04-03-02-04-16", null, (err, res, body) => {
        let page = cherio.load(body)
        let headers = [],
            obj = "",
            fr = true
            for (let r = 0; r < page('table tr').toArray().length; r++) {
                let row =  page('table tr').toArray()[r]
                if (fr) {
                    let fl = true
                    for (td of row.children) {
                        let text = cherio(td).text().toString().trim()
                        if (fl && text) {
                            text = text.split('\n')[0] + text.split('\n')[1]
                            fl = false
                            headers.push(text)
                        } else {
                            if (text) headers.push(text)
                        }
                    }
                    fr = false
                } else {
                    let b = 0;
                    if (r != 1 & r < 12) {
                        for (let i = 0; i < row.children.length; i++) {
                            let text = cherio(row.children[i]).text().trim()
                            if (text) {
                                obj +=`${headers[b]} — ${text}; \n\n`
                                b++
                            }
                        }
                        obj += `—————— \n`
                        specsB.push(obj)
                        obj = ""
                        b = 0
                    } else if (r > 14 & r < 26) {
                        for (let i = 0; i < row.children.length; i++) {
                            let text = cherio(row.children[i]).text().trim()
                            if (text) {
                                obj +=`${headers[b]} — ${text}; \n\n`
                                b++
                            }
                        }
                        obj += `—————— \n`
                        specsP.push(obj)
                        b = 0
                        obj = ""
                    } else if (r > 27 & r < 33) {
                        for (let i = 0; i < row.children.length; i++) {
                            let text = cherio(row.children[i]).text().trim()
                            if (text) {
                                obj +=`${headers[b]} — ${text}; \n\n`
                                b++
                            }
                        }
                        obj += `—————— \n`
                        specsZ.push(obj)
                        obj = ""
                        b = 0
                    }
                }
            }
            
            
        })
    }
main()
module.exports.budjet = specsB
module.exports.platno = specsP
module.exports.zaocj = specsZ