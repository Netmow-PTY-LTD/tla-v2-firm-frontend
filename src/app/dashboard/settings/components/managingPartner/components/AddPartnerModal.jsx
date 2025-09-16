'use client';

import React, { useState } from 'react';
import TextInput from '@/components/form/TextInput';
import FormWrapper from '@/components/form/FromWrapper';
import { showErrorToast, showSuccessToast } from '@/components/common/toasts';
import { z } from 'zod';
import { Modal } from '@/components/common/components/Modal';
// import { useCreatePartnerMutation } from '@/redux/features/partner/partnerApi'; // example

// Zod Schema
const partnerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  position: z.string().min(1, { message: 'Position is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  barAssociation: z.string().min(1, { message: 'Bar Association is required' }),
  licenseNo: z.string().min(1, { message: 'License No is required' }),
});

const AddPartnerModal = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const onCancel = () => setOpen(!open);

  // const [createPartner] = useCreatePartnerMutation();

  const handleSubmit = async (values) => {
    console.log('values ==>',values)
    try {
      // Send request to backend
      // const res = await createPartner(values).unwrap();
      const res = { success: true, message: 'Partner created successfully' }; // mock

      if (res?.success === true) {
        showSuccessToast(res?.message || 'Partner created successfully');
        // refetch();
        onCancel();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || 'An error occurred';
      showErrorToast(errorMessage);
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Modal
        buttonName="+ Add Partner"
        description="Add a new partner to your firm"
        title="Add Partner"
        onOpenChange={setOpen}
        open={open}
      >
        <FormWrapper onSubmit={handleSubmit} schema={partnerSchema}>
          <div className="space-y-5">
            <TextInput label="Name" name="name" placeholder="Enter name" />
            <TextInput label="Position" name="position" placeholder="Enter position" />
            <TextInput label="Email" name="email" placeholder="Enter email" />
            <TextInput label="Phone" name="phone" placeholder="Enter phone number" />
            {/* <TextInput
              label="Bar Association"
              name="barAssociation"
              placeholder="Enter bar association"
            />
            <TextInput
              label="License Number"
              name="licenseNo"
              placeholder="Enter license number"
            /> */}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={onCancel}
              type="button"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#12C7C4] text-white px-4 py-2 text-sm rounded-md hover:bg-[#10b0ae]"
            >
              Save
            </button>
          </div>
        </FormWrapper>
      </Modal>
    </div>
  );
};

export default AddPartnerModal;
