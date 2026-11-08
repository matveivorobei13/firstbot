require('dotenv').config()
const { Bot, InlineKeyboard, Keyboard, session } = require("grammy");
const { conversations, createConversation } = require("@grammyjs/conversations");
const bot = new Bot(process.env.BOT_TOKEN)

bot.use(session({initial: () => ({}) }))
bot.use(conversations())

async function movieAnketa(conversation, ctx){
    await ctx.reply("чтобі соціалізіроваться заполните анкету, для начала скажіте как вас завуть")

    const nameContext = await conversation.wait()
    const userName = nameContext.message.text
    let response
    if(userName.toLowerCase() === "лера" || userName.toLowerCase() === "лирика") {
        response = "сама ебучая лера нахкуй!! скоко вам лет?"
    }
    else{
        response = "слава богу что не лера, лет то скоко?"
    }

    ctx.reply(response)

    const ageContext = await conversation.wait()
    const age = ageContext.message.text
     ctx.reply(`агась, ${userName}, ${age} лет, иди нахуй вот єто ті відела?`)
}

bot.use(createConversation(movieAnketa))

bot.command("start", (ctx) => {
    const mainKeyboard = new Keyboard()
    .text("файн")
    .text("елда")
    .row()
    .text("соціалізція")
    .placeholder("выбрала фастом")
    .resized()
    ctx.reply("поковыряйся в носу", {
        reply_markup: mainKeyboard
    })
})

bot.command("fuckyou", (ctx) => {
    console.log("1")
    const key = new InlineKeyboard().
    text("вправить спину нахуй", "offer_1")
    .row()
    .text("позвать медведя", "offer_2")
    console.log("2")
    ctx.reply("ты шо ахуела, выбирай нахуй:", {
        reply_markup: key
    })
})

bot.hears("елда", (ctx) => {
    ctx.reply(`${ctx.from.first_name}, у вас нет елды если вы девушка`)
})
bot.hears("файн", (ctx) => {
    ctx.reply("how are fucking you")
})
bot.hears("соціалізція", async (ctx) => {
  await ctx.conversation.enter("movieAnketa"); // Входим в режим диалога
});


bot.callbackQuery("offer_1", async (ctx) => {
   
    await ctx.reply("ошибка, повтори все заново и выбери медведя")
})

bot.callbackQuery("offer_2", async(ctx) => {
    await ctx.reply("Он рядом елдунья!!")
})



bot.start()