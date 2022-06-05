import { Text, Group } from "@mantine/core";

export default function MyFooter() {
  return (
    <Group position="center">
      <Text
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[3]
              : theme.colors.gray[5],
        })}
      >
        Made by Matthew Battagel
      </Text>
    </Group>
  );
}
