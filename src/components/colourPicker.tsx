import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Peg from "./Peg";
import { Button, Group, Space } from "@mantine/core";

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
        <Button onClick={() => makeGuess()}>Confirm</Button>
      </Group>
      <Space h="md" />
      <ColourPalette />
    </DragDropContext>
  );
}

function ColourPalette() {
  var colours: number[] = [];
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    ...draggableStyle,
  });

  for (var i = 0; i < NUM_COLOURS; i++) {
    colours.push(i);
  }
  return (
    <Droppable droppableId="tray">
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
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Peg key={uuidv4()} peg={peg} size={25} />
                    </div>
                  )}
                </Draggable>
              );
            })}
          </Group>
        </div>
      )}
    </Droppable>
  );
}
