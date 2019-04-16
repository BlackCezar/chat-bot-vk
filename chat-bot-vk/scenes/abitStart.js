const Scene = require('node-vk-bot-api/lib/scene')
const Makrup = require('node-vk-bot-api/lib/markup')


const scene = new Scene('abitStart',
(ctx) => {
  ctx.scene.next()
  ctx.reply('Выбирете одно из предложенных команд', null, Makrup
  .keyboard([
    Makrup.button('Специальности', 'primary', {button: 1}),
    Makrup.button('Приемная комиссия', 'primary', {button: 2}),
    Makrup.button('Вакантные места', 'primary', {button: 3}),
    Makrup.button('Общежитие', 'primary', {button: 4}),
    Makrup.button('Сайт колледжа', 'primary', {button: 5}),
    Makrup.button('Назад', null, {button: 6}),
  ], {
    columns: 2
  }))
},
(ctx) => {
  try {
    let select = JSON.parse(ctx.message.payload).button
    ctx.session.clientType = ctx.message.text
    ctx.scene.leave()
    if (select == 1) {
      ctx.reply('Загружаю специальности')
      ctx.scene.enter('loadSpec')
    } else if (select == 2) {
      ctx.scene.enter('enterComm')
    } else if (select == 3) {
      ctx.scene.enter('getVacant')         
    } else if (select == 4) {
      ctx.reply('Держи - kraskrit.ru')
    } else if (select == 5) {
      ctx.reply('Держи - kraskrit.ru')
    } else if (select == 6) {
      ctx.scene.enter('start')
    } else {
      ctx.scene.enter('abitStart')
    }
  } catch (err) {
    console.log(err)
    ctx.reply('Извините, я не понял вас, повторите')
    ctx.scene.selectStep(1)
  }
}
)

module.exports = scene
