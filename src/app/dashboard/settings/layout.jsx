import React from 'react';


import SettingsTabs from './components/Settings/SettingTab';
import { BadgeCheck, Building2 } from 'lucide-react';

const SettingsLayout = ({ children }) => {

  return (
    <div className=" border rounded-xl">
   
      <div className="p-4 bg-white w-full">{children}</div>
    </div>
  );
};

export default SettingsLayout;
