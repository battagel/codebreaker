import {
  Text,
  useMantineTheme,
  Container,
  Stack,
  ColorSwatch,
  Button,
  Group,
  Modal,
} from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { useState } from "react";

export default function Game() {
  const [hiddenCode, setHiddenCode] = useState<boolean>(true);
  const [prevGuesses, setPrevGuesses] = useState<Array<number[]>>([]);

  const [newGameModal, setNewGameModal] = useState<boolean>(false);
  const [winGameModal, setWinGameModal] = useState<boolean>(false);
  const [loseGameModal, setLoseGameModal] = useState<boolean>(false);
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
      new_code.push(Math.floor(Math.random() * NUM_COLOURS) + 1);
    }
    setCurrentCode(new_code);
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
      <Container>
        <Stack>
          {prevGuesses.map((prevGuess: number[]) => (
            <GuessRow prevGuess={prevGuess} />
          ))}
        </Stack>
      </Container>
      <Container>
        <Text>Debug buttons</Text>
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
        <Peg peg={hidden === true ? 0 : peg} />
      ))}
    </Group>
  );
}

type prevGuessProp = {
  prevGuess: number[];
};

function GuessRow({ prevGuess }: prevGuessProp) {
  return (
    <>
      {prevGuess.map((peg: number) => (
        <Peg peg={peg} />
      ))}
    </>
  );
}

type PegProp = {
  peg: number;
};

function Peg({ peg }: PegProp) {
  const theme = useMantineTheme();
  return <ColorSwatch color={theme.colors.orange[peg]} />;
}
