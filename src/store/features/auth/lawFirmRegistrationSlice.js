// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentStep: 1,
//   formData: {
//     // Step 1
//     name: '',
//     country: '',
//     city: '',
//     AreaZipcode: '',
//     phone: '',
//     email: '',
//     website: '',
//     registrationNumber: '',
//     yearOfEstablishment: '',
//     // Step 2
//     licenseType: '',
//     licenseNumber: '',
//     issuedBy: '',
//     validUntil: '',
//     // Add more fields for future steps
//   },
//   totalSteps: 2, // set total steps here
// };

// const lawFirmRegistrationSlice = createSlice({
//   name: 'lawFirmRegistration',
//   initialState,
//   reducers: {
//     setFormData: (state, action) => {
//       // Merge step data into formData
//       state.formData = { ...state.formData, ...action.payload };
//     },
//     setCurrentStep: (state, action) => {
//       state.currentStep = action.payload;
//     },
//     nextStep: (state) => {
//       if (state.currentStep < state.totalSteps) {
//         state.currentStep += 1;
//       }
//     },
//     previousStep: (state) => {
//       if (state.currentStep > 1) {
//         state.currentStep -= 1;
//       }
//     },
//     resetRegistration: () => initialState, // reset all
//   },
// });

// export const { setFormData, setCurrentStep, nextStep, previousStep, resetRegistration } =
//   lawFirmRegistrationSlice.actions;

// export default lawFirmRegistrationSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  formData: {
    // Root level
    email: '',
    password: '',
    firmName: '',
    registrationNumber: '',
    yearEstablished: '',
    // Contact Info
    contactInfo: {
      officeAddress: '',
      country: '',
      city: '',
      phone: '',
      email: '',
      officialWebsite: '',
    },
    // License Details
    licenseDetails: {
      licenseType: '',
      licenseNumber: '',
      issuedBy: '',
      validUntil: '',
    },
  },
  totalSteps: 2, // Step 1 = General info, Step 2 = License info
};

const lawFirmRegistrationSlice = createSlice({
  name: 'lawFirmRegistration',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      // Merge deeply instead of overwriting entire formData
      state.formData = {
        ...state.formData,
        ...action.payload,
        contactInfo: {
          ...state.formData.contactInfo,
          ...action.payload.contactInfo,
        },
        licenseDetails: {
          ...state.formData.licenseDetails,
          ...action.payload.licenseDetails,
        },
      };
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
