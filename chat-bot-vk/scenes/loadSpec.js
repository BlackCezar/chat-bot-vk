const Scene = require('node-vk-bot-api/lib/scene')
const Makrup = require('node-vk-bot-api/lib/markup')

let {platno, zaocj, budjet} = require('./../utils/loadSpec')

const scene = new Scene('loadSpec',
(ctx) => {
    ctx.reply('Выбирете форму обучения', null, Makrup
      .keyboard([
        Makrup.button('Очная (бюджет)', 'primary', {button: 1}),
        Makrup.button('Очная (платно)', 'primary', {button: 2}),
        Makrup.button('Заочная (платно)', 'primary', {button: 3}),
        Makrup.button('Назад', null, {button: 4}),
      ], {
        columns: 1
      }))
    ctx.scene.next()
    let buf = '';
    for (el of budjet) {
        buf += el;
    }
    budjet = buf
    buf = ''
    for (el of platno) {
        buf += el;
    }
    platno = buf
    buf = ''
    for (el of zaocj) {
        buf += el;
    }
    zaocj = buf
    buf = ''
    console.log(platno)
}, ctx => {
  try {
    let select = JSON.parse(ctx.message.payload).button
    ctx.session.clientType = ctx.message.text

    if (select == 1) {
        ctx.reply(budjet.toString())
      } else if (select == 2) {
        ctx.reply(platno.toString())
      } else if (select == 3) {
        ctx.reply(zaocj.toString())      
      } else if (select == 4) {
        ctx.scene.leave()
        ctx.scene.enter('abitStart')
      } 
    ctx.scene.leave()
    ctx.scene.enter('abitStart')
  } catch (err) {
    console.log(err)
    ctx.reply('Извините, я не понял вас, повторите')
    ctx.scene.selectStep(1)
  }
}
)

module.exports = scene