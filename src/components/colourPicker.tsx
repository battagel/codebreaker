import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Peg from "./Peg";
import { Button, Group, Space, useMantineTheme } from "@mantine/core";

// Add these to context ??
const NUM_COLOURS = 8;
const CODE_LENGTH = 5;

type ColourPickerProp = {
  currentGuess: number[];
  setCurrentGuess: Dispatch<SetStateAction<number[]>>;
  makeGuess: () => void;
};

export default function ColourPicker({
  currentGuess,
  setCurrentGuess,
  makeGuess,
}: ColourPickerProp) {
  const theme = useMantineTheme();
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const workingGuess = Array.from(currentGuess);
    workingGuess[parseInt(destination.droppableId)] = source.index;
    setCurrentGuess(workingGuess);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Group position="center">
        {currentGuess.map((peg: number, index: number) => (
          <Droppable droppableId={index.toString()}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Peg key={uuidv4()} peg={peg} size={30} />
              </div>
            )}
          </Droppable>
        ))}
        <Button
          size="sm"
          compact
          variant={theme.colorScheme === "dark" ? "outline" : "filled"}
          radius="xl"
          color="cyan"
          onClick={() => makeGuess()}
        >
          Guess
        </Button>
      </Group>
      <Space h="md" />
      <ColourPalette />
    </DragDropContext>
  );
}

function ColourPalette() {
  var colours: number[] = [];
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    boxShadow: isDragging ? "0px 6px 10px 3px rgba(0,0,0,0.15)" : "",
  });

  for (var i = 0; i < NUM_COLOURS; i++) {
    colours.push(i);
  }
  return (
    <Droppable droppableId="tray" isDropDisabled={true}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Group position="center">
            {colours.map((peg: number, index: number) => {
              return (
                <Draggable
                  key={peg.toString()}
                  draggableId={peg.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Peg
                        key={uuidv4()}
                        peg={peg}
                        size={25}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
          </Group>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              height: "10px",
              background: "tomato",
              width: "10px",
            }}
          />
        </div>
      )}
    </Droppable>
  );
}
