import React, { useState } from 'react';
import Calendar from 'react-calendar';

function ManagerCal() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

const Manager = () => {
    return (
        <div>
            <h1>Manager</h1>
            <div>{ManagerCal()}</div>
            
        </div>
    );
}

export default Manager;