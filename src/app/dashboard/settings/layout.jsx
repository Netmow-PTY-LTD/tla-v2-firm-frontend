import React from 'react';


import SettingsTabs from './components/Settings/SettingTab';
import { BadgeCheck, Building2 } from 'lucide-react';

const SettingsLayout = ({ children }) => {
// const tabs = [
//   {
//     label: "Firm",
//     href: "/dashboard/settings/firm",
//     icon: <Building2 className="w-4 h-4" />, 
//   },
//   {
//     label: "Licenses",
//     href: "/dashboard/settings/licenses",
//     icon: <BadgeCheck className="w-4 h-4" />, 
//   },
// ];

  return (
    <div className=" border rounded-xl">
      {/* <SettingsTabs tabs={tabs} /> */}
      <div className="p-4 bg-white w-full">{children}</div>
    </div>
  );
};

export default SettingsLayout;
