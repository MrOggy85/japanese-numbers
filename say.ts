export async function sayCorrect() {
  const process = Deno.run({
    cmd: ['say', '-v', 'Kyoko', '正解'],
  });
  await process.status();
  process.close()
}

export async function sayWrong() {
  const process = Deno.run({
    cmd: ['say', '-v', 'Kyoko', '違う'],
  });
  await process.status();
  process.close()
}

export async function sayNumber(number: string, slowVoice: boolean) {
  const process = slowVoice
    ? Deno.run({
      cmd: ['say', '-v', 'Kyoko', '-r', '100', number],
    })
    : Deno.run({
      cmd: ['say', '-v', 'Kyoko', number],
    })

  await process.status();
  process.close()
}
