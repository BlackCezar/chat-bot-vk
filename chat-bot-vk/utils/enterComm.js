const Request = require('request')
const cherio = require('cherio')
let content = []
let docuemtns = []
let docs2 = []

async function main () {
    await Request.get("http://kraskrit.ru/index.php/advanced-stuff/2018-04-03-02-15-40", null, (err, res, body) => {
        let page = cherio.load(body)
            content.push(cherio(page('.page-header')).text().trim() + ' ')
            for (let r = 0; r < page('#column_column-6 > div > div.item-page > div:nth-child(4) > p').toArray().length; r++) {
                let row =  page('#column_column-6 > div > div.item-page > div:nth-child(4) > p').toArray()[r]
                if (r < 8) {
                    text = ' ' + cherio(row).text().trim()
                    if (r == 3) text += '\n\n'
                    if (r == 4) text += '\n'
                    if (r == 5) text += '\n'

                    if (text) content.push(text)
                } 
            }
            for (let r = 0; r < page('table tr > td:first-child').toArray().length; r++) {
                let row = page('table tr > td:first-child').toArray()[r]
                text = ' ' + cherio(row).text().trim() + '\n\n'
                    if (text.length > 1) docuemtns.push(text)
            }
            for (let r = 0; r < page('table tr > td:nth-child(2)').toArray().length; r++) {
                let row = page('table tr > td:nth-child(2)').toArray()[r]
                text = ' ' + cherio(row).text().trim() + '\n\n'
                    if (text.length > 1) docs2.push(text)
            }
        })
    }
main()
module.exports.textInfo = content
module.exports.mainInfo = docuemtns
module.exports.secondInfo = docs2
