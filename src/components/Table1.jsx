import React, { useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useReactToPrint } from "react-to-print";

const Table1 = ({ heading, selectedItems, setSelectedItems, handleShift }) => {
  const componentToPrintRef = useRef();
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedItems(items);
  };
  const handleExport = useReactToPrint({
    content: () => componentToPrintRef.current,
  });
  return (
    <div className="table_box">
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
              <th scope="col" className="table_heading">
                {h}
              </th>
            ))}
            <th className="table_heading">&nbsp;</th>
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
                      key={`${ob[heading[0]] + index}`}
                      draggableId={`${ob[heading[0]] + index}`}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {heading.map((h) => {
                            return (
                              <td align="center" className="table_data">
                                {ob[h]}
                              </td>
                            );
                          })}
                          <td
                            style={{
                              cursor: "pointer",
                            }}
                            className="table_data"
                            align="center"
                            onClick={() => handleShift(0, index)}
                          >
                            🔻
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
      {selectedItems.length > 0 ? (
        <button className="export_button" onClick={handleExport}>
          Print PDF
        </button>
      ) : null}
      {/* NOTE: Hidden component to print */}
      <section
        style={{
          height: "0px",
          width: "0px",
          overflow: "hidden",
        }}
      >
        <table className="table" ref={componentToPrintRef}>
          <thead>
            <tr>
              <th
                align="left"
                style={{
                  width: "30px",
                }}
              >
                SL No.
              </th>
              {heading.map((h, index) => (
                <th
                  scope="col"
                  align={index === 0 ? "left" : "center"}
                  className="table_heading"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((ob, index) => {
              return (
                <tr>
                  <td
                    style={{
                      padding: "10px 10px 10px 5px",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    {index + 1}
                  </td>
                  {heading.map((h, index) => {
                    return (
                      <td
                        align={index === 0 ? "left" : "center"}
                        className="table_data"
                      >
                        {ob[h]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Table1;
