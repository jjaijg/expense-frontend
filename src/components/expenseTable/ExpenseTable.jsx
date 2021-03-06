import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import TableData from './TableData';
import TableHeader from './TableHeader';
import { getTxns, deleteTxn } from '../../state/action/transactionActions';
import TableAction from './TableAction';
import Loader from '../loader';

const ExpenseTable = (props) => {
  const dispatch = useDispatch();
  const { transactions, transactionLoading } = useSelector(
    (state) => state.transaction
  );
  const {
    user: { token },
  } = useSelector((state) => state.user);

  // eslint-disable-next-line
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const header = [
    { name: '#', field: 'id', sortable: false, render: (rec, ind) => ind + 1 },
    { name: 'Type', field: 'type', sortable: false },
    { name: 'Category', field: 'name', sortable: true },
    { name: 'Amount', field: 'amount', sortable: true },
    { name: 'Date', field: 'tdate', sortable: false },
    { name: 'Purpose', field: 'description', sortable: true },
    { name: 'Action', field: 'action' },
  ];

  useEffect(() => {
    dispatch(getTxns(token));
    // eslint-disable-next-line
  }, [token]);

  const deleteExpense = (id) => {
    dispatch(deleteTxn(token, id));
  };

  const tableHeader = header.map((col, ind) => {
    if (col.field !== 'action') return col;
    return {
      ...col,
      render: (rec, ind) => {
        return (
          <TableAction
            row={rec}
            id={rec.id}
            rowInd={ind}
            onDelete={deleteExpense}
          />
        );
      },
    };
  });

  return (
    <>
      <Loader isLoading={transactionLoading} />

      <Table striped bordered hover responsive>
        <TableHeader
          header={tableHeader}
          onSorting={(field, order) => {
            setSorting({ field, order });
          }}
        />
        <TableData dataSource={transactions} header={tableHeader} />
      </Table>
    </>
  );
};

export default ExpenseTable;
