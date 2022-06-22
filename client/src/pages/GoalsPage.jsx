import React, { useState } from 'react';
import AllGoalsListByTerm from '../components/AllGoalsListByTerm';
import { Tab, Tabs } from 'react-bootstrap';
import AllGoalsListByCreation from '../components/AllGoalsListByCreation';

export default function GoalsPage() {
  const [key, setKey] = useState('Самые новые');

  return (
    <div className="container">
      <h1>Цели</h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
        className="col-md-8 mb-3"
      >
        <Tab eventKey="Самые новые" title="Самые новые">
          <AllGoalsListByCreation />
        </Tab>
        <Tab eventKey="Скоро истекут" title="Скоро истекут">
          <AllGoalsListByTerm />
        </Tab>
      </Tabs>
    </div>
  );
}
