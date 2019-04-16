const Scene = require('node-vk-bot-api/lib/scene')
const Makrup = require('node-vk-bot-api/lib/markup')

let {textInfo, mainInfo, secondInfo} = require('./../utils/enterComm')

const scene = new Scene('enterComm',
(ctx) => {
    let buf = '';
    for (el of textInfo) {
        buf += el;
    }
    textInfo = buf
    buf = '';
    for (el of mainInfo) {
        buf += el;
    }
    mainInfo = buf
    buf = '';
    for (el of secondInfo) {
        buf += el;
    }
    secondInfo = buf

    ctx.reply(textInfo, null, Makrup
      .keyboard([
        Makrup.button('Основные документы', 'primary', {button: 1}),
        Makrup.button('Дополнительные документы', 'primary', {button: 2}),
        Makrup.button('Отправить заявку', 'primary', {button: 3}),
        Makrup.button('Назад', null, {button: 4}),
      ], {
        columns: 1
      })
      .oneTime())
    ctx.scene.next()

    
}, ctx => {
    try {
        let select = JSON.parse(ctx.message.payload).button
        ctx.scene.leave() 
        if (select == 1) {
            ctx.reply(mainInfo)
            ctx.scene.enter('abitStart')
        } else if (select == 2) {
            ctx.reply(secondInfo)
            ctx.scene.enter('abitStart')
        } else if (select == 3) {
            ctx.reply('Простите, данные блок еще разрабатывается')
            ctx.scene.enter('abitStart')
        } else if (select == 4) {
            ctx.scene.enter('abitStart')
        } else {
            throw new Error()
        }
        ctx.session.clientType = ctx.message.text
    } catch (err) {
        console.log(err)
        ctx.reply('Извините, я не понял вас, повторите')
        ctx.session.lastStep = ctx.scene.step
        ctx.session.scene = ctx.scene
        // ctx.scene.leave()
        // ctx.scene.enter()
        ctx.scene.selectStep(1)
    }
}
)

module.exports = scene