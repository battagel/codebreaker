import { Text, useMantineTheme } from "@mantine/core";
import { ColorSwatch } from "@mantine/core";

type PegProp = {
  peg: number;
  size: number;
};

export default function Peg({ peg, size }: PegProp) {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";
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
  // There are 9 colours assigned 0 through 8
  // 9 is reserved for "empty" pegs

  var pegColour: any;

  if (peg <= 8) {
    pegColour = colourMap[peg];
  } else {
    if (dark) {
      pegColour = theme.colors.dark[6];
    } else {
      pegColour = theme.colors.gray[0];
    }
  }

  const emptySize: number = 8;
  const padding: number = (size - emptySize) / 2;

  return (
    <ColorSwatch
      size={peg === 9 ? emptySize : size}
      m={peg === 9 ? padding : 0}
      color={pegColour}
      radius={peg === 9 ? "sm" : "xl"}
      children={peg === 8 ? <Text>?</Text> : ""}
    />
  );
}
