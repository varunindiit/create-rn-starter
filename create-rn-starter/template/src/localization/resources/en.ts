/**
 * English translations — the source of truth for all UI copy.
 * Keys are grouped by feature; reuse `common.*` wherever possible.
 * Keep keys stable, only add, and mirror every key in fr.ts.
 */
const en = {
  common: {
    appName: 'AwesomeProject',
    continue: 'Continue',
    next: 'Next',
    back: 'Back',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    done: 'Done',
    submit: 'Submit',
    skip: 'Skip',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    retry: 'Retry',
    close: 'Close',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    search: 'Search',
    loading: 'Loading…',
    optional: 'Optional',
    required: 'Required',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    today: 'Today',
    tomorrow: 'Tomorrow',
    somethingWrong: 'Something went wrong. Please try again.',
    select: 'Select',
    selectDate: 'Select Date',
    update: 'Update',
    uploadImage: 'Upload image',
    uploadFormatsHint: 'Supports JPG, PNG, PDF, ZIP',
    online: 'Online',
    offline: 'Offline',
  },

  validation: {
    emailRequired: 'Email is required.',
    emailInvalid: 'Enter a valid email address.',
    passwordRequired: 'Password is required.',
    passwordTooShort: 'Password must be at least 8 characters.',
    nameTooShort: 'Enter at least 2 characters.',
    phoneInvalid: 'Enter a valid phone number.',
    aboutTooLong: 'Keep this under 280 characters.',
  },

  language: {
    onboardingTitle: 'Choose your language',
    onboardingSubtitle:
      'Select your preferred language to continue. You can change it anytime in Settings.',
    settingsTitle: 'Language',
    settingsSubtitle: 'Choose the language used across the app.',
    selectLabel: 'Language',
    changedTo: 'Language changed to {{language}}',
    continueIn: 'Continue in {{language}}',
  },

  auth: {
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in to pick up where you left off.',
    signUpTitle: 'Create your account',
    phoneNumber: 'Phone Number',
    enterPhone: 'Enter your phone number',
    emailAddress: 'Email Address',
    enterEmail: 'Enter your email',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    password: 'Password',
    enterPassword: 'Enter your password',
    login: 'Log In',
    signUp: 'Sign Up',
    logout: 'Log Out',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    agreeTerms:
      'By continuing, you agree to our Terms & Conditions and Privacy Policy.',
  },

  tabs: {
    home: 'Home',
    profile: 'Profile',
  },

  home: {
    greeting: 'Hi, {{name}}',
    title: 'Home',
    startTitle: 'Getting started',
    startBody:
      'Edit src/screen/root/home to build your first screen. Set your API base URL in .env, then restart Metro with --reset-cache.',
  },

  profile: {
    title: 'Profile',
    editProfile: 'Edit Profile',
    appearance: 'Appearance',
    appearanceHint: 'Follow your device, or pick a theme.',
    theme_light: 'Light',
    theme_dark: 'Dark',
    theme_system: 'System',
    language: 'Language',
    logOut: 'Log Out',
    logOutConfirm: 'Are you sure you want to log out?',
  },

  gallery: {
    title: 'Component gallery',
    subtitle: 'Every component in this starter, rendered live.',
    open: 'Open gallery',
    buttons: 'Buttons',
    inputs: 'Inputs',
    badges: 'Badges & chips',
    controls: 'Controls',
    feedback: 'Feedback',
    emptyTitle: 'Nothing here yet',
    emptyBody: 'This is the EmptyState component with an action attached.',
  },

  imagePicker: {
    title: 'Add Photo',
    takePhoto: 'Take Photo',
    chooseFromGallery: 'Choose from Gallery',
    removePhoto: 'Remove Photo',
    updatePhoto: 'Update Photo',
    subtitle: "Choose how you'd like to set your picture",
    cropTitle: 'Crop Photo',
    openCamera: 'Open Camera',
    openCameraCaption: 'Take a new photo',
    galleryCaption: 'Pick from your library',
    permissionDenied: 'Permission denied. Enable access in Settings.',
  },
};

export type TranslationSchema = typeof en;
export default en;
