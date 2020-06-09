export function sayCorrect() {
  Deno.run({
    cmd: ['say', '-v', 'Kyoko', '正解'],
  });
}

export function sayWrong() {
  Deno.run({
    cmd: ['say', '-v', 'Kyoko', '違う'],
  });
}

export function sayNumber(number: string) {
  Deno.run({
    cmd: ['say', '-v', 'Kyoko', number],
  });
}
