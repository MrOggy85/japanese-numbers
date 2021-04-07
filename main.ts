import { sayCorrect, sayWrong, sayNumber } from './say.ts';
import { cuteBunny, happyBunny, angryBunny } from './bunny.ts';

async function clear() {
  const process = Deno.run({
    cmd: ['clear'],
  })

  await process.status()
  process.close()
}

function printUsage() {
  console.log('Japanese Numbers');
  console.log('');
  console.log('Usage:');
  console.log('Please start program like this:');
  console.log('./start.sh MAX_NUMBER [options]');
  console.log('');
  console.log('Options:');
  console.log('-nvf, --no-voice-feedback');
  console.log('  No Voice Feedback after guessed a number.');
  console.log('-f, --fast-mode');
  console.log('  Get a new number directly after guessed a number.');
  console.log('-sv, --slow-voice');
  console.log('  Slow down voice rate when speaking a number.');
  console.log('');
}

const buffer = new Uint8Array(1024);

const maxNumberRaw = Deno.args[0];
const maxNumber = Number(maxNumberRaw);
if (Number.isNaN(maxNumber)) {
  printUsage();
  Deno.exit(0);
}

let voiceFeedback = true;
let fastMode = false;
let slowVoice = false;

const START_OPTIONS = {
  NO_VOICE_FEEDBACK: '--no-voice-feedback',
  NO_VOICE_FEEDBACK_SHORT: '-nvf',
  FAST_MODE: '--fast-mode',
  FAST_MODE_SHORT: '-f',
  SLOW_VOICE: '--slow-voice',
  SLOW_VOICE_SHORT: '-sv',
}

Deno.args.forEach((x, i) => {
  if (i === 0) {
    return;
  }
  if (x === START_OPTIONS.NO_VOICE_FEEDBACK || x === START_OPTIONS.NO_VOICE_FEEDBACK_SHORT) {
    voiceFeedback = false;
  } else if(x === START_OPTIONS.FAST_MODE || x === START_OPTIONS.FAST_MODE_SHORT) {
    voiceFeedback = false
    fastMode = true;
  } else if(x === START_OPTIONS.SLOW_VOICE || x === START_OPTIONS.SLOW_VOICE_SHORT) {
    slowVoice = true;
  } else {
    printUsage();
    Deno.exit(0);
  }
})


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
      if (voiceFeedback) {
        sayCorrect();
      }
      console.log('✅', nextNumber);
    } else {
      if (voiceFeedback) {
        sayWrong();
      }
      console.log('❌ correct number', nextNumber);
    }
  }

  if (!fastMode) {
    console.log('');
    console.log('Press ENTER for next number');
    await Deno.stdin.read(buffer);
  }

  console.log('What is the number? (press ENTER to listen again)');

  nextNumber = Math.round(Math.random() * maxNumber);

  let text = '';
  do {
    sayNumber(nextNumber.toString(), slowVoice);

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
