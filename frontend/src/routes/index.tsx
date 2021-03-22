import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

import Cost from '../pages/Statistics/Cost';
import Sales from '../pages/Statistics/Sales';

import User from '../pages/Registers/User';
import Schedule from '../pages/Registers/Schedule';
import UserMedication from '../pages/Registers/UserMedication';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/statistic/cost" exact component={Cost} />
    <Route path="/statistic/sales" exact component={Sales} />
    <Route path="/register/user" exact component={User} />
    <Route path="/register/schedule" exact component={Schedule} />
    <Route path="/register/user-medication" exact component={UserMedication} />
  </Switch>
);

export default Routes;
