import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  totalSteps: 3,
  formData: {
    // Step 1: User-specific data
    userData: {
      email: '',
      password: '',
      phone: '',
      name: '',
    },
    // Step 2: Law firm-specific data
    firmData: {
      firmName: '',
      registrationNumber: '',
      yearEstablished: '',
      contactInfo: {
        zipCode: '',
        country: '',
        city: '',
        phone: '',
        email: '',
        officialWebsite: '',
      },
    },
    // Step 3: License-specific data
    licenseData: {
      certificationId: '',
      licenseNumber: '',
      issuedBy: '',
      validUntil: '',
      type: '',
    },
  },
};

const lawFirmRegistrationSlice = createSlice({
  name: 'lawFirmRegistration',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { userData, firmData, licenseData } = action.payload;

      if (userData) {
        state.formData.userData = {
          ...state.formData.userData,
          ...userData,
        };
      }

      if (firmData) {
        state.formData.firmData = {
          ...state.formData.firmData,
          ...firmData,
          contactInfo: {
            ...state.formData.firmData.contactInfo,
            ...firmData.contactInfo,
          },
        };
      }

      if (licenseData) {
        state.formData.licenseData = {
          ...state.formData.licenseData,
          ...licenseData,
        };
      }
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    resetRegistration: () => initialState,
  },
});

export const {
  setFormData,
  setCurrentStep,
  nextStep,
  previousStep,
  resetRegistration,
} = lawFirmRegistrationSlice.actions;

export default lawFirmRegistrationSlice.reducer;
