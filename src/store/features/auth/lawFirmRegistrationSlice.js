import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  formData: {
    // Step 1
    name: '',
    country: '',
    city: '',
    AreaZipcode: '',
    phone: '',
    email: '',
    website: '',
    registrationNumber: '',
    yearOfEstablishment: '',
    // Step 2

    // Add more fields for future steps
  },
  totalSteps: 3, // set total steps here
};

const lawFirmRegistrationSlice = createSlice({
  name: 'lawFirmRegistration',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      // Merge step data into formData
      state.formData = { ...state.formData, ...action.payload };
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
    resetRegistration: () => initialState, // reset all
  },
});

export const { setFormData, setCurrentStep, nextStep, previousStep, resetRegistration } =
  lawFirmRegistrationSlice.actions;

export default lawFirmRegistrationSlice.reducer;
