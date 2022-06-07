import "./App.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  AppShell,
} from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import MyHeader from "./components/MyHeader";
import Game from "./components/Game";
import { ModalsProvider } from "@mantine/modals";

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  function toggleColorScheme(value?: ColorScheme) {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    console.log(colorScheme);
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <ModalsProvider>
          <AppShell
            padding="md"
            header={<MyHeader />}
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
            fixed
          >
            <Game />
          </AppShell>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
