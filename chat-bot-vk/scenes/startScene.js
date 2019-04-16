const Scene = require('node-vk-bot-api/lib/scene')
const Makrup = require('node-vk-bot-api/lib/markup')


const scene = new Scene('start',
  (ctx) => {
    ctx.session.scene = 'start'
    ctx.scene.next()
    ctx.reply('Привет! \n Ты студент или абитуриент?', null, Makrup.keyboard([
      Makrup.button('Студент', 'primary'),
      Makrup.button('Абитуриент', 'primary'),
    ]))
  },
  (ctx) => {
    try {
      ctx.session.clientType = ctx.message.text
      console.log(ctx.message)
      ctx.scene.leave()
      if (ctx.session.clientType == 'Студент' ) {
        ctx.reply('Отлично!')
          ctx.scene.enter('studentStart')
      } else if (ctx.session.clientType == 'Абитуриент') {
        ctx.reply('Отлично!')        
        ctx.scene.enter('abitStart')
      } else throw new Error('Nothing not selected') 
    } catch (err) {
      console.log(err)
      ctx.reply('Извините, я не понял вас, повторите')
      ctx.scene.selectStep(1)
    }
  }
)

module.exports = scene