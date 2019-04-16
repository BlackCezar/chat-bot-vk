const Request = require('request')
const cherio = require('cherio')
let date = {
    headers: [],
    day: [],
    nigth: []
}
const HtmlTableToJson = require('html-table-to-json');

async function main () {
    await Request.get("http://kraskrit.ru/index.php/advanced-stuff/2018-04-03-04-46-02", null, (err, res, body) => {
        let page = cherio.load(body)
        let json = new HtmlTableToJson(`<table> ${cherio(page('table')).html()}</table>`).results[0]
        for (index in json[0]) {
            date.headers.push(json[0][index])
        }
        let selection = 'day'
        let row
        for (let i = 2; i < json.length; i++) {
            if (json[i][1].trim() == 'ЗАОЧНОЕ ОТДЕЛЕНИЕ') {
                if (row) date[selection].push(row)
                row = null
                selection = 'nigth'
                
            } else {
                if (json[i][3]) {
                    if (row) date[selection].push(row)
                    row = {
                        id: json[i][1],
                        name: json[i][2],
                        level: json[i][3],
                        type: json[i][4],
                        kurses: [
                            {kurs: json[i][5], vac: json[i][6]}
                        ]
                    }
                } else {
                    row.kurses.push({
                        kurs: json[i][1], vac: json[i][2]
                    })
                }
            }
            
        }
    })
}
main()
module.exports.date = date