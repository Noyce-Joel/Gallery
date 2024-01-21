import React, { useState, ChangeEvent } from 'react'

export default function ColumnsButton() {
    const [columns, setColumns] = useState(5);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setColumns(Number(event.target.value));
    };

    return (
        <>
            <div>Columns</div>
            <select value={columns} onChange={handleChange}>
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
        </>
    )
}
    
