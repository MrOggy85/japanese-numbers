# Japanese Numbers :jp:
CLI for learning Japanese numbers

Listen to the spoken number and write your guess.

## Prerequisites
This app has been developed and tested on MacOS Catalina.

Make sure that `say` command is present and that the voice `Kyoko` is listed.
```
$ say -v ? | grep Kyoko
```
Expected output:
```
Kyoko               ja_JP    # こんにちは、私の名前はKyokoです。日本語の音声をお届けします。
```

## Usage

Use `start.sh` and input the max number to practice with.
```
$ ./start.sh [max-number]
```
