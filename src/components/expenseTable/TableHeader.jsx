import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableHeader = ({ header, onSorting }) => {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const onSortingChange = (field) => {
    const order =
      field === sortField && sortOrder === ''
        ? 'asc'
        : sortOrder === 'asc'
        ? 'desc'
        : '';
    /*
    empty -asc
    asc - desc
    desc- empy
    */
    setSortField(field);
    setSortOrder(order);
    onSorting(field, order);
  };

  const getArrows = (order) => {
    let icons = [];
    if (order === 'asc') {
      icons.push('arrow-down');
    } else if (order === 'desc') {
      icons.push('arrow-up');
    } else {
      icons.push('arrow-up', 'arrow-down');
    }
    const ArrowComponent = (
      <>
        {icons.map((icon, ind) => (
          <FontAwesomeIcon
            key={`${icon}-${ind}-table-header`}
            icon={icon}
            size='xs'
          />
        ))}
      </>
    );
    return ArrowComponent;
  };

  return (
    <thead>
      <tr>
        {header.map(({ field, name, sortable }, ind) => {
          return (
            <th
              key={`${field}-header`}
              onClick={() => {
                return sortable ? onSortingChange(field) : null;
              }}
            >
              <Row>
                <Col>{name}</Col>
                <Col className='text-right'>
                  {sortable && getArrows(sortOrder)}
                </Col>
              </Row>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {};

export default TableHeader;
