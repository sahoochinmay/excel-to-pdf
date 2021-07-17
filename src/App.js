import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "./App.css";
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";

const App = () => {
  const [heading, setHeading] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(items);
  useEffect(() => {
    if (items.length !== 0) {
      setHeading(Object.keys(items[0]));
    }
  }, [items]);
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };
  const handleShift = (table, index) => {
    if (table) {
      let data = items[index];
      if (data) {
        items.splice(index, 1);
        setSelectedItems([...selectedItems, data]);
      }
    } else {
      let data = selectedItems[index];
      if (data) {
        selectedItems.splice(index, 1);
        setItems([...items, data]);
      }
    }
  };
  return (
    <div>
      {items.length === 0 && selectedItems.length === 0 ? (
        <div className="input_container">
          <h1>Please Upload only .xlsx file</h1>
          <div className="input_box" >
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log(file);
                readExcel(file);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="table_container">
          <Table1
            heading={heading}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            handleShift={handleShift}
          />
          <br />
          <br />
          <br />
          <Table2 heading={heading} items={items} handleShift={handleShift} />
        </div>
      )}
    </div>
  );
};

export default App;
