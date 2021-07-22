import React, { useState, useEffect , useRef } from "react";
import * as XLSX from "xlsx";
import "./App.css";
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";

const App = () => {
  const fileUploadRef = useRef(null);
  const [heading, setHeading] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState(null)
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
    <div className="main"  >
      {items.length === 0 && selectedItems.length === 0 ? (
        <div className="input_container">
          <div className="input_box">
              <h2>UPLOAD FILE</h2>
              <h3 className="text-center">
                Upload a .xlsx file that you want to add student from
              </h3>
              <div>
                <input
                  type="file"
                  ref={fileUploadRef}
                  onChange={(e) => {
                    setData(e.target.files[0])
                    readExcel(e.target.files[0])
                  }}
                  accept=".xlsx"
                  style={{
                    visibility:"hidden"
                  }}
                />
                <div className="browse-files">
                  <button
                    className="btn btn-primary"
                    onClick={() => fileUploadRef.current.click()}
                  >
                    Browse Files
                  </button>
                </div>
              </div>
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
