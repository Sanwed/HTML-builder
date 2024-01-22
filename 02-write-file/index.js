const readline = require('readline');
const { stdin: input, stdout: output } = process;
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({ input, output });
const ws = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const promptText = 'Enter text (Ctrl+C or type "exit" to end): ';

console.log('Welcome! Write some text here');

function inputHandler(text) {
  if (text.toLowerCase() === 'exit') {
    console.log('Goodbye');
    rl.close();
    process.exit(0);
  }

  ws.write(text + '\n');
  rl.question(promptText, inputHandler);
}

rl.question(promptText, inputHandler);

rl.on('SIGINT', () => {
  console.log('\nGoodbye!');
  rl.close();
  process.exit(0);
});
