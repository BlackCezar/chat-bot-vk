const Scene = require('node-vk-bot-api/lib/scene')
const Makrup = require('node-vk-bot-api/lib/markup')

let date = require('../utils/getVacant').date

const scene = new Scene('getVacant',
(ctx) => {
    console.log(date.day.map(el => {return el.name}).toLocaleString())
    ctx.reply('Выберите отделение', null, Makrup
    .keyboard([
        'Очное', 'Заочное'
    ]).oneTime())
    ctx.scene.next()
},
ctx => {
    ctx.session.selection = ctx.message.text.trim()
    ctx.reply('Введите номер нужной специальности')
    let newarr
    let arr
    if (ctx.session.selection == 'Очное') {
        arr = date.day
        newarr = date.day.map(el => {return el.name}).filter((val, ind, self) => {
            return self.indexOf(val) === ind
        })
    } else {
        arr = date.nigth
        newarr = date.nigth.map(el => {return el.name}).filter((val, ind, self) => {
            return self.indexOf(val) === ind
        })
    }
    let arrString = ''
    for (name of newarr) {
        for (row of arr){
            if (row.name == name) {
                arrString += `\n${row.id} — ${name}`; break;
            }
        }
    }
    ctx.reply(arrString).toLocaleString()
    ctx.scene.next()
},
ctx => {
    ctx.session.id = Number(ctx.message.text.trim())
    ctx.reply
}
// arr.map(el => {return el.name}).filter((val, ind, self) => {
	// return self.indexOf(val) === ind
// }).map(name => {return arr.map(el => {if (el.name == name) return `\n${el.id} — ${el.name}`}).filter(val => {if (val) return val})})
//     ctx.reply('Выберите отделение', null, Makrup
//       .keyboard([
//         Makrup.button('Дневное', 'primary', {button: 1}),
//         Makrup.button('Дополнительные документы', 'primary', {button: 2}),
//         Makrup.button('Отправить заявку', 'primary', {button: 3}),
//         Makrup.button('Назад', null, {button: 4}),
//       ], {
//         columns: 1
//       })
//       .oneTime())
//     ctx.scene.next()

    
// }, ctx => {
//     try {
//         let select = JSON.parse(ctx.message.payload).button
//         ctx.scene.leave() 
//         if (select == 1) {
//             ctx.reply(mainInfo)
//             ctx.scene.enter('abitStart')
//         } else if (select == 2) {
//             ctx.reply(secondInfo)
//             ctx.scene.enter('abitStart')
//         } else if (select == 3) {
//             ctx.reply('Простите, данные блок еще разрабатывается')
//             ctx.scene.enter('abitStart')
//         } else if (select == 4) {
//             ctx.scene.enter('abitStart')
//         } else {
//             throw new Error()
//         }
//         ctx.session.clientType = ctx.message.text
//     } catch (err) {
//         console.log(err)
//         ctx.reply('Извините, я не понял вас, повторите')
//         ctx.session.lastStep = ctx.scene.step
//         ctx.session.scene = ctx.scene
//         // ctx.scene.leave()
//         // ctx.scene.enter()
//         ctx.scene.selectStep(1)
//     }
// }
)

module.exports = scene