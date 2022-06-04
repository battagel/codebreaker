import { Text, Group } from "@mantine/core";

export default function MyFooter() {
  return (
    <Group position="center">
      <Text
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        })}
      >
        Made by Matthew Battagel
      </Text>
    </Group>
  );
}
