const mineflayer = require('mineflayer');

// Definindo as credenciais em variáveis
const serverConfig = {
    host: 'nerdzone.gg',
    port: 25565,
    username: 'Lardas', // Seu username
    version: '1.8.9'
};

// Definindo a senha em uma variável separada
const password = 'wilkergms,6666';

// Definindo o comando de party
const partyCommand = '/home spawner';

// Função para configurar os eventos do bot
function configurarBot(bot) {
    // Evento de spawn (bot entrou no servidor)
    bot.once('spawn', () => {
        console.log('Bot conectado ao servidor!');
        logareIrAteDestino(); // Chama a função após o spawn
    });

    // Evento de desconexão (bot saiu do servidor)
    bot.on('end', () => {
        console.log('Bot foi desconectado! Tentando reconectar...');
        reconectar(); // Reconectar o bot após desconexão
    });

    // Evento de kick (bot foi kickado do servidor)
    bot.on('kicked', (reason) => {
        console.log(`Desconectado: ${reason}`);
        reconectar(); // Reconectar em caso de kick
    });

    // Evento de erro (erro no bot)
    bot.on('error', (err) => {
        console.log(`Erro: ${err}`);
        reconectar(); // Reconectar em caso de erro
    });

    // Evento para mostrar as mensagens
    bot.on("message", (message) => {
        console.log(message.toString());
    });
}

// Criando o bot com as configurações
let bot = mineflayer.createBot(serverConfig);

// Configurando os eventos inicialmente
configurarBot(bot);

// Função que o bot executa após entrar no servidor
async function logareIrAteDestino() {
    await new Promise(resolve => setTimeout(resolve, 10000)); // Espera 10s
    bot.chat(`/login ${password}`); // Usa a variável de senha

    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2s
    bot.setQuickBarSlot(4);

    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2s
    bot.activateItem();

    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2s

    try {
        await bot.clickWindow(13, 0, 0);
    } catch (err) {
        console.log("Erro ao clicar:", err);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    bot.chat(partyCommand);
}

// Função de reconexão
function reconectar() {
    console.log("Reiniciando em 10 segundos...");
    setTimeout(() => {
        if (bot) {
            bot.removeAllListeners(); // Remove todos os listeners antes de criar um novo bot
        }
        
        // Cria um novo bot
        bot = mineflayer.createBot(serverConfig);
        
        // Reconfigura os eventos para o novo bot
        configurarBot(bot);
    }, 10000); // Espera 10s antes de tentar reconectar
}
