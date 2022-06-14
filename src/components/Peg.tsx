import { Text, Tooltip, useMantineTheme } from "@mantine/core";
import { ColorSwatch } from "@mantine/core";

type PegProp = {
  peg: number;
  size: number;
  style?: any;
};

export default function Peg({ peg, size, style }: PegProp) {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";
  const colourMap = [
    "black",
    "white",
    "#855c2d",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
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
      style={style}
      children={peg === 8 ? <Text>?</Text> : ""}
    />
  );
}
