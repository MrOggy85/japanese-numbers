console.log('----------------------------');
console.log("Welcome to Japanese Numbers!");
console.log('----------------------------');

function sayCorrect() {
  Deno.run({
    cmd: ['say', '-v', 'Kyoko', '正解'],
  });
}

function sayWrong() {
  Deno.run({
    cmd: ['say', '-v', 'Kyoko', '違う'],
  });
}

const buf = new Uint8Array(1024);

const maxNumberRaw = Deno.args[0];
const maxNumber = Number(maxNumberRaw);
console.log('Max Number:', maxNumber);

while(true) {
  console.log('Press ENTER for next number');
  await Deno.stdin.read(buf);

  const nextNumber = Math.round(Math.random() * maxNumber);

  Deno.run({
    cmd: ['say', '-v', 'Kyoko', nextNumber.toString()],
  });

  const n2 = await Deno.stdin.read(buf);
  const textRaw = new TextDecoder().decode(buf.subarray(0, n2!));

  const text = textRaw.trim();

  if (text.length === 0) {
    continue;
  }

  const numberGuess = Number(text);

  if (numberGuess === nextNumber) {
    sayCorrect();
    console.log('✅');
  } else {
    sayWrong();
    console.log('❌ correct number', nextNumber);
  }
}
