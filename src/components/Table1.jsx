import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Table1 = ({ heading, selectedItems, setSelectedItems, handleShift }) => {
    
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedItems(items);
  };
  return (
    <div className="table_box" >
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Table - I
      </h2>
      <table className="table">
        <thead>
          <tr>
            {heading.map((h) => (
              <th scope="col" className="table_heading" >{h}</th>
            ))}
            <th className="table_heading" >&nbsp;</th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <tbody
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {selectedItems.map((ob, index) => {
                  return (
                    <Draggable
                      key={ob["Name"]}
                      draggableId={ob["Name"]}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {heading.map((h) => {
                            return <td align="center" className="table_data">{ob[h]}</td>;
                          })}
                          <td
                            style={{
                              cursor: "pointer",
                            }}
                            className='table_data'
                            align="center"
                            onClick={() => handleShift(0, index)}
                          >
                            ❎
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      {
          selectedItems.length > 0 ?
          <button className="export_button" >Export To PDF</button> : null
      }
    </div>
  );
};

export default Table1;
