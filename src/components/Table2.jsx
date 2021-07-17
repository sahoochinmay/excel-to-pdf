import React from "react";

const Table2 = ({ heading, items, handleShift }) => {
  return (
    <div className="table_box">
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Table - II
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
        <tbody>
          {items.map((d, idx) => (
            <tr key={idx}>
              {heading.map((h) => {
                return <td align="center" className="table_data">{d[h]}</td>;
              })}
              <td
                style={{
                  cursor: "pointer",
                }}
                align="center"
                className="table_data"
                onClick={() => handleShift(1, idx)}
              >
                🔼
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
