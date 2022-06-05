import { v4 as uuidv4 } from "uuid";
import {
  Text,
  Container,
  Stack,
  Group,
  Space,
  Paper,
} from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { useModals } from "@mantine/modals";
import { useState } from "react";
import MyFooter from "./MyFooter";
import Peg from "./Peg";
import ColourPicker from "./colourPicker";

export default function Game() {
  const [hiddenCode, setHiddenCode] = useState<boolean>(true);
  const [prevGuesses, setPrevGuesses] = useLocalStorageValue<
    Array<Array<number[]>>
  >({
    key: "previous_guesses",
    defaultValue: [],
  });

  const [currentGuess, setCurrentGuess] = useState<number[]>([0, 0, 0, 0, 0]);
  const [currentCode, setCurrentCode] = useLocalStorageValue<number[]>({
    key: "current_code",
    defaultValue: [1, 2, 3, 4, 5],
  });

  const CODE_LENGTH = 5;
  const NUM_COLOURS = 8;
  const MAX_GUESSES = 6;

  function newGame() {
    console.log("Starting new game...");
    setPrevGuesses([]);
    newCode();
  }

  function newCode() {
    console.log("Generating new code");
    var new_code: number[] = [];
    for (var i = 0; i < CODE_LENGTH; i++) {
      new_code.push(Math.floor(Math.random() * NUM_COLOURS));
    }
    console.log(new_code);
    setCurrentCode(new_code);
  }

  function makeGuess() {
    const guessString: string = currentGuess.toString();
    console.log("Making guess of: " + guessString);
    const guessResult: number[] = checkGuess();
    const guessAndResult: Array<number[]> = [guessResult, currentGuess];
    setPrevGuesses([guessAndResult, ...prevGuesses]);
    console.log(guessResult);
    if (JSON.stringify(guessResult) === JSON.stringify([0, 0, 0, 0, 0])) {
      // You have to convert arrays to strings to compare the values rather than addresses
      winGameModal();
    } else if (prevGuesses.length === MAX_GUESSES) {
      // Disable the user input
      loseGameModal();
    }
  }

  function checkGuess() {
    var blacks: number = 0;
    var whites: number = 0;

    var code: Array<string | number> = [...currentCode];
    var guess: Array<string | number> = [...currentGuess];

    for (var i = 0; i < code.length; i++) {
      if (guess[i] === code[i]) {
        blacks += 1;
        guess[i] = "B";
        code[i] = "B";
      }
    }
    for (var ptrA = 0; ptrA < code.length; ptrA++) {
      for (var ptrB = 0; ptrB < code.length; ptrB++) {
        if (
          code[ptrA] === guess[ptrB] &&
          code[ptrA] !== "B" &&
          code[ptrA] !== "W"
        ) {
          whites += 1;
          code[code.indexOf(guess[ptrB])] = "W";
          guess[ptrB] = "W";
        }
      }
    }

    var blacksAndWhites: number[] = [];
    for (var i = 0; i < blacks; i++) blacksAndWhites.push(0);
    for (var i = 0; i < whites; i++) blacksAndWhites.push(1);
    while (blacksAndWhites.length < 5) {
      blacksAndWhites.push(9);
    }
    return blacksAndWhites;
  }

  const modals = useModals();
  const winGameModal = () =>
    modals.openConfirmModal({
      title: "Congradulations You Won!",
      children: <Text size="sm">Press new game to start a new game :)</Text>,
      labels: { confirm: "New Game", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => newGame(),
    });

  const loseGameModal = () =>
    modals.openConfirmModal({
      title: "Unlucky you lost!",
      children: <Text size="sm">Press new game to start a new game :)</Text>,
      labels: { confirm: "New Game", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => newGame(),
    });

  return (
    <Stack
      justify="space-between"
      sx={{ height: "100%", marginLeft: "10%", marginRight: "10%" }}
    >
      <Paper p="md">
        <Container>
          <Code code={currentCode} hidden={hiddenCode} />
        </Container>
      </Paper>
      <Paper p="md" sx={{ height: "100%" }}>
        <Space h="md" />
        <Container>
          <Stack>
            {prevGuesses.map((prevGuess: Array<number[]>) => (
              <GuessRow key={uuidv4()} prevGuess={prevGuess} />
            ))}
          </Stack>
        </Container>
      </Paper>
      <Paper p="md">
        <ColourPicker
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          makeGuess={makeGuess}
        />
      </Paper>
      <MyFooter />
    </Stack>
  );
}

type CodeProp = {
  code: number[];
  hidden: boolean;
};

function Code({ code, hidden }: CodeProp) {
  return (
    <Group position="center">
      {code.map((peg: number) => (
        <Peg key={uuidv4()} peg={hidden === true ? 8 : peg} size={40} />
      ))}
    </Group>
  );
}

type prevGuessProp = {
  prevGuess: Array<number[]>;
};

function GuessRow({ prevGuess }: prevGuessProp) {
  return (
    <Group position="center">
      {prevGuess[0].map((peg: number) => (
        <Peg key={uuidv4()} peg={peg} size={20} />
      ))}
      |
      {prevGuess[1].map((peg: number) => (
        <Peg key={uuidv4()} peg={peg} size={30} />
      ))}
    </Group>
  );
}
