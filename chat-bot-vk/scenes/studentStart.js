const Scene = require('node-vk-bot-api/lib/scene')
const Makrup = require('node-vk-bot-api/lib/markup')


const scene = new Scene('studentStart',
  (ctx) => {
    ctx.scene.next()
    ctx.reply('Выбирете одно из предложенных команд', null, Makrup
    .keyboard([
      Makrup.button('Расписание лент', null, {button: 1}),
      Makrup.button('Расписание звонков', null, {button: 2}),
      Makrup.button('Список групп', null, {button: 3}),
      Makrup.button('Сайт колледжа', null, {button: 4}),
    ], {
      columns: 2
    })
    .oneTime())
  },
  (ctx) => {
    try {
      let select = JSON.parse(ctx.message.payload).button
      ctx.session.clientType = ctx.message.text
      if (select == 1) {
        ctx.reply('Сейчас загружу раписание')
      } else if (select == 2) {
        ctx.reply('Сейчас загружу раписание')
      } else if (select == 3) {
        ctx.reply('Сейчас отправлю список')      
      } else if (select == 4) {
        ctx.reply('Держи - kraskrit.ru')
      }
      ctx.scene.leave()
      ctx.scene.enter('studentStart')
    } catch (err) {
      console.log(err)
      ctx.reply('Извините, я не понял вас, повторите')
      ctx.scene.selectStep(1)
    }
  }
)

module.exports = scene