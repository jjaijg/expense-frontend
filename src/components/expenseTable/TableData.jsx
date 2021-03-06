import React from 'react';

const TableData = ({ header, dataSource }) => {
  return (
    <tbody>
      {dataSource.length ? (
        dataSource.map((transaction, ind) => {
          return (
            <tr key={ind}>
              {header.map((col) => {
                if (col.render) {
                  return (
                    <td key={col.field}>{col.render(transaction, ind)}</td>
                  );
                }
                return <td key={col.field}>{transaction[col.field]}</td>;
              })}
            </tr>
          );
        })
      ) : (
        <tr>
          <td>
            <h3>No Transactions done yet!!!</h3>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableData;
