const TelegramApi = require("node-telegram-bot-api");
const token = "1881103755:AAGyBDC2jjkgANN_SW9H0yiu8YM9gLmrUJg";
const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "restarting the bot" },
  { command: "/info", description: "info about the Bot" },
  { command: "/game", description: "play a game" },
]);

const chats = {};

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0", callback_data: "0" }],
    ],
  }),
};

const again = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "play again", callback_data: "/again" }]],
  }),
};

async function startGame(chatId) {
  await bot.sendMessage(chatId, "0 dan 9 gacha son tanladim");
  const pcNum = Math.floor(Math.random() * 10);
  chats[chatId] = pcNum;
  return bot.sendMessage(chatId, "sonni top", gameOptions);
}

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text; // /start
    const chatId = msg.chat.id; //5745748478

    if (text === "/start") {
      const destWelcomePhoto =
        "https://image.shutterstock.com/image-vector/welcome-poster-spectrum-brush-strokes-260nw-1146069941.jpg";
      await bot.sendPhoto(chatId, destWelcomePhoto);
      return bot.sendMessage(
        chatId,
        "Xush kelibsiz" + ` ${msg.from.first_name}`
      );
    }

    if (text === "/info") {
      return bot.sendMessage(chatId, `Bu Bot Alisher Kambarovning game boti`);
    }

    if (text === "/game") {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, "Noaniq komanda berildi!");
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      return startGame(chatId);
    }

    if (data === chats[chatId]) {
      return bot.sendMessage(chatId, "siz togri tanladingiz", again);
    } else {
      return bot.sendMessage(
        chatId,
        `xato tanlov boldi, tugri javob ${chats[chatId]} edi`,
        again
      );
    }
  });
};

start();
