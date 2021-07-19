import React , {useRef} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
// import {
//   Grid,
//   GridColumn as Column,
//   GridToolbar,
// } from "@progress/kendo-react-grid";
// import {} from '@progress/kendo-react-grid'

const Table1 = ({ heading, selectedItems, setSelectedItems, handleShift }) => {
  const pdfExportComponent = useRef()
  let gridPDFExport;
  const exportPDF = () => {
    if (gridPDFExport) {
      gridPDFExport.save();
    }
  };
  // const grid = (
  //   <Grid
  //     data={selectedItems}
  //     // style={{
  //     //   height: "445px",
  //     // }}
  //   >
  //     {/* <GridToolbar>
  //       <button
  //         title="Export PDF"
  //         className="k-button k-primary"
  //         onClick={exportPDF}
  //       >
  //         Export PDF
  //       </button>
  //     </GridToolbar> */}
  //     {
  //       heading.map((h,idx) =>{
  //         return <Column field={h} title={h} width="100px" />
  //       })
  //     }
  //   </Grid>
  // );
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedItems(items);
  };
  const  handleExportWithComponent  = (event) => {
    pdfExportComponent.current.save();
    // savePDF(contentArea.current, { paperSize:  "A4" });
}
  return (
    <div className="table_box" >
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Table - I
      </h2>
      <PDFExport  ref={pdfExportComponent} paperSize="A4" margin="1cm"  >
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
      </PDFExport>
      {
          selectedItems.length > 0 ?
          <button className="export_button" onClick={handleExportWithComponent} >Export To PDF</button> : null
      }
    </div>
  );
};

export default Table1;
