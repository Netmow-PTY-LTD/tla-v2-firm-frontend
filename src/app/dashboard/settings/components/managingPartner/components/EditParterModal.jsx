'use client';

import React from 'react';
import TextInput from '@/components/form/TextInput';
import FormWrapper from '@/components/form/FromWrapper';
import { showErrorToast, showSuccessToast } from '@/components/common/toasts';
import { z } from 'zod';
import { Modal } from '@/components/common/components/Modal';


// Zod schema for partner validation
const partnerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  position: z.string().min(1, { message: 'Position is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  barAssociation: z.string().min(1, { message: 'Bar Association is required' }),
  licenseNo: z.string().min(1, { message: 'License No is required' }),
});

const EditPartnerModal = ({
  refetch,
  selectedPartner,
  open,
  onClose,
}) => {
  const onCancel = () => onClose();
  

  const defaultValues = {
    name: selectedPartner?.name ?? '',
    position: selectedPartner?.position ?? '',
    email: selectedPartner?.email ?? '',
    phone: selectedPartner?.phone ?? '',
    barAssociation: selectedPartner?.barAssociation ?? '',
    licenseNo: selectedPartner?.licenseNo ?? '',
  };

  const handleSubmit = async (values) => {
    const payload = {
      _id: selectedPartner?._id,
      ...values,
    };


    try {
      // Example API call
      // const res = await updatePartnerData(payload).unwrap();
      const res = { success: true, message: 'Partner updated successfully' }; // mock

      if (res?.success) {
        showSuccessToast(res.message || 'Partner updated successfully');
        // refetch?.();
        onClose();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || 'An error occurred';
      showErrorToast(errorMessage);
      console.error('Error updating partner:', error);
    }
  };

  return (
    <Modal
      description="Update partner information"
      title="Edit Partner"
      onOpenChange={onClose}
      open={open}
    >
      <FormWrapper
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        schema={partnerSchema}
      >
        <div className="space-y-5">
          <TextInput label="Name" name="name" placeholder="Enter name" />
          <TextInput label="Position" name="position" placeholder="Enter position" />
          <TextInput label="Email" name="email" placeholder="Enter email" />
          <TextInput label="Phone" name="phone" placeholder="Enter phone number" />
          <TextInput
            label="Bar Association"
            name="barAssociation"
            placeholder="Enter bar association"
          />
          <TextInput
            label="License Number"
            name="licenseNo"
            placeholder="Enter license number"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#12C7C4] text-white px-4 py-2 text-sm rounded-md hover:bg-[#10b0ae]"
          >
            Update
          </button>
        </div>
      </FormWrapper>
    </Modal>
  );
};

export default EditPartnerModal;
