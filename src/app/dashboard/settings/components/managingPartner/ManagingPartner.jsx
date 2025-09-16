'use client';


import { useState } from 'react';

import AddPartnerModal from './components/AddPartnerModal';
import EditParterModal from './components/EditParterModal';
import PartnerList from './components/PartnerList';



const partnerData = [
  {
    _id: "64f9c1a7b3f5c1a2e7d12345",
    firmId: "64f9c1a7b3f5c1a2e7d00001",
    name: "John Doe",
    position: "Senior Partner",
    email: "john.doe@example.com",
    phone: "+8801712345678",
    barAssociation: "Bangladesh Bar Council",
    licenseNo: "LIC123456",
    createdAt: new Date("2025-09-16T06:00:00.000Z"),
    updatedAt: new Date("2025-09-16T06:00:00.000Z")
  },
  {
    _id: "64f9c1a7b3f5c1a2e7d12346",
    firmId: "64f9c1a7b3f5c1a2e7d00001",
    name: "Jane Smith",
    position: "Associate Partner",
    email: "jane.smith@example.com",
    phone: "+8801912345678",
    barAssociation: "Dhaka Bar Association",
    licenseNo: "LIC654321",
    createdAt: new Date("2025-09-16T06:10:00.000Z"),
    updatedAt: new Date("2025-09-16T06:10:00.000Z")
  },
  {
    _id: "64f9c1a7b3f5c1a2e7d12347",
    firmId: "64f9c1a7b3f5c1a2e7d00002",
    name: "Michael Johnson",
    position: "Junior Partner",
    email: "michael.johnson@example.com",
    phone: "+8801812345678",
    barAssociation: "Chittagong Bar Council",
    licenseNo: "LIC789012",
    createdAt: new Date("2025-09-16T06:20:00.000Z"),
    updatedAt: new Date("2025-09-16T06:20:00.000Z")
  }
];









export default function ManagingPartner() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);


  const handleEditClick = (service) => {
    setSelectedPartner(service);
    setIsEditModalOpen(true);
  };


  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex justify-between items-center gap-5">
        <div>
          <h3 className="text-black font-semibold heading-lg">Your Partners</h3>

          <p className="mt-[10px] text-[#6e6e6e]">
            List the legal Partners you offer so we can connect you with the
            most relevant clients seeking your expertise.
          </p>
        </div>
        {/*  Partners modal */}
        <AddPartnerModal
          refetch={false}
        />
      </div>
    <PartnerList
       partners={partnerData}
        handleEditClick={handleEditClick}
        refetch={false}
      />
      <EditParterModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        selectedPartner={selectedPartner}
        refetch={false}
      /> 
    </div>
  );
}
