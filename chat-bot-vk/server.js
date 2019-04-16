const VkBot = require('node-vk-bot-api')
const Makrup = require('node-vk-bot-api/lib/markup')
const Stage = require('node-vk-bot-api/lib/stage')
const Session = require('node-vk-bot-api/lib/session')
const session = new Session()

require('dotenv').config();

const bot = new VkBot({
    token: process.env.TOKEN,
    group_id: 180062734
})
let stage = new Stage(
  require('./scenes/startScene'),
  require('./scenes/studentStart'),
  require('./scenes/abitStart'),
  require('./scenes/loadSpec'),
  require('./scenes/enterComm'),
  require('./scenes/getVacant'),
)

bot.use(session.middleware())
bot.use(stage.middleware())

bot.command('/start', (ctx) => {
  ctx.scene.enter('start')
})
bot.command('/help', ctx => {
  ctx.reply('Нужна помощь? Нет. Не помогу.')
})

   
bot.startPolling(() => {
    console.log('Bot started.')
})
