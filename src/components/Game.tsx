import {
  Text,
  useMantineTheme,
  Container,
  Stack,
  ColorSwatch,
  Button,
  Group,
  TextInput,
  Space,
} from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { useState } from "react";

export default function Game() {
  const [hiddenCode, setHiddenCode] = useState<boolean>(true);
  const [prevGuesses, setPrevGuesses] = useLocalStorageValue<
    Array<Array<number[]>>
  >({
    key: "previous_guesses",
    defaultValue: [],
  });

  const [newGameModal, setNewGameModal] = useState<boolean>(false);
  const [winGameModal, setWinGameModal] = useState<boolean>(false);
  const [loseGameModal, setLoseGameModal] = useState<boolean>(false);
  const [currentGuess, setCurrentGuess] = useState<number[]>([]);
  const [currentCode, setCurrentCode] = useLocalStorageValue<number[]>({
    key: "current_code",
    defaultValue: [1, 2, 3, 4, 5],
  });

  const CODE_LENGTH = 5;
  const NUM_COLOURS = 8;

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
    setCurrentCode(new_code);
  }

  function makeGuess() {
    const guessString: string = currentGuess.toString();
    console.log("Making guess of: " + guessString);
    const guessResult: number[] = checkGuess();
    const guessAndResult: Array<number[]> = [guessResult, currentGuess];
    setPrevGuesses([guessAndResult, ...prevGuesses]);
    if (guessResult === [5, 0]) {
      winGame();
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
    console.log(blacksAndWhites);
    return blacksAndWhites;
  }

  function winGame() {
    console.log("Game Won!");
    setWinGameModal(true);
  }

  function loseGame() {
    console.log("Game lost!");
    setLoseGameModal(true);
  }

  return (
    <>
      <Container>
        <Code code={currentCode} hidden={hiddenCode} />
      </Container>
      <Space h="md" />
      <Container>
        <Stack>
          {prevGuesses.map((prevGuess: Array<number[]>) => (
            <GuessRow prevGuess={prevGuess} />
          ))}
        </Stack>
      </Container>
      <Container>
        <Text>Debug buttons</Text>
        <TextInput
          placeholder="1,2,3,4,5"
          label="Your guess"
          onChange={(event) => {
            setCurrentGuess(event.currentTarget.value.split(",").map(Number));
          }}
        />
        <Button onClick={() => makeGuess()}>Submit</Button>

        <Button
          onClick={() => setHiddenCode(hiddenCode === false ? true : false)}
        >
          Toggle Hidden
        </Button>
        <Button onClick={() => newGame()}>New game</Button>
      </Container>
    </>
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
        <Peg peg={hidden === true ? 8 : peg} size={30} />
      ))}
    </Group>
  );
}

type prevGuessProp = {
  prevGuess: Array<number[]>;
};

function GuessRow({ prevGuess }: prevGuessProp) {
  console.log(prevGuess);
  return (
    <Group position="center">
      {prevGuess[0].map((peg: number) => (
        <Peg peg={peg} size={15} />
      ))}
      |
      {prevGuess[1].map((peg: number) => (
        <Peg peg={peg} size={25} />
      ))}
    </Group>
  );
}

type PegProp = {
  peg: number;
  size: number;
};

function Peg({ peg, size }: PegProp) {
  const theme = useMantineTheme();

  const colourMap = [
    "black",
    "white",
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "brown",
    "grey",
  ];

  return <ColorSwatch size={size} color={colourMap[peg]} />;
}
