import { sayCorrect, sayWrong, sayNumber } from './say.ts';
import { cuteBunny, happyBunny, angryBunny } from './bunny.ts';

async function clear() {
  const process = Deno.run({
    cmd: ['clear'],
  })

  await process.status()
  process.close()
}

const buffer = new Uint8Array(1024);

const maxNumberRaw = Deno.args[0];
const maxNumber = Number(maxNumberRaw);
if (Number.isNaN(maxNumber)) {
  console.log('Please start program like this:');
  console.log('./start.sh MAX_NUMBER');
  Deno.exit(0);
}

const playerStats = {
  corect: 0,
  wrong: 0,
}

let nextNumber = 0;
let result = false;

while(true) {
  await clear();
  const isFirstRound = !playerStats.corect && !playerStats.wrong;
  const totalRounds = playerStats.corect + playerStats.wrong;
  const successRate = Math.round((playerStats.corect / totalRounds) * 100);

  console.log('');
  if (isFirstRound) {
    cuteBunny();
  } else if (result) {
    happyBunny();
  } else {
    angryBunny();
  }
  console.log('----------------------------');
  console.log("Welcome to Japanese Numbers!");
  console.log('----------------------------');
  if (isFirstRound) {
    console.log('Stats: 0/0');
    console.log('Success Rate: 0%');
    console.log('');
    console.log('');
  } else {
    console.log(`Stats: ${playerStats.corect}/${totalRounds}`);
    console.log(`Success Rate: ${successRate}%`);
    console.log('');

    if (result) {
      sayCorrect();
      console.log('✅', nextNumber);
    } else {
      sayWrong();
      console.log('❌ correct number', nextNumber);
    }
  }
  console.log('');
  console.log('Press ENTER for next number');
  await Deno.stdin.read(buffer);
  console.log('What is the number? (press ENTER to listen again)');

  nextNumber = Math.round(Math.random() * maxNumber);

  let text = '';
  do {
    sayNumber(nextNumber.toString());

    const n2 = await Deno.stdin.read(buffer);
    const textRaw = new TextDecoder().decode(buffer.subarray(0, n2!));

    text = textRaw.trim();
  } while (text.length === 0);

  const numberGuess = Number(text);
  result = numberGuess === nextNumber;

  if (result) {
    playerStats.corect++;
  } else {
    playerStats.wrong++;
  }
}
