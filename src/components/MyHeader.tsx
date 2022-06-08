import { Image, Group, Header, Title } from "@mantine/core";
import ThemeButton from "./ThemeButton";

export default function MyHeader() {
  return (
    <Header height={100}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Image
          src="codebreaker-logo512.png"
          withPlaceholder={true}
          width={64}
          height={64}
        />
        <Title
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            fontSize: "clamp(25px, 7vw, 60px)",
          })}
        >
          Codebreaker
        </Title>
        <ThemeButton />
      </Group>
    </Header>
  );
}
