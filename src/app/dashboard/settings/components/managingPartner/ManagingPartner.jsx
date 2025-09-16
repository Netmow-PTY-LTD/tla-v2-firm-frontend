'use client';


// import {
//   useAuthUserInfoQuery,
//   useUpdateUserDataMutation,
// } from '@/store/features/auth/authApiService';
import { useState } from 'react';

import { Loader } from 'lucide-react';
import AddPartnerModal from './components/AddPartnerModal';
// import EditParterModal from './components/EditParterModal';
// import PartnerList from './components/PartnerList';

export default function ManagingPartner() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  // const {
  //   data: userInfo,
  //   isLoading,
  //   isError,
  //   error,
  //   refetch,
  // } = useAuthUserInfoQuery(undefined, {
  //   refetchOnMountOrArgChange: true, // keep data fresh
  // });


  // if (isLoading)
  //   return (
  //     <div>
  //       <span className="flex items-center justify-center gap-2">
  //         <Loader className="w-4 h-4 animate-spin" />
  //         loading...
  //       </span>
  //     </div>
  //   );

  const handleEditClick = (service) => {
    setSelectedPartner(service);
    setIsEditModalOpen(true);
  };

  // const profile = userInfo?.data?.profile;
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
      {/* <PartnerList
        profile={profile}
        handleEditClick={handleEditClick}
        refetch={refetch}
      />
      <EditParterModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        selectedPartner={selectedPartner}
        updateUserData={updateUserData}
        refetch={refetch}
      /> */}
    </div>
  );
}
