/**
 * French translations. Mirrors every key in en.ts — `TranslationSchema` turns a
 * missing or misspelled key into a compile error rather than a runtime blank.
 */
import type {TranslationSchema} from './en';

const fr: TranslationSchema = {
  common: {
    appName: 'AwesomeProject',
    continue: 'Continuer',
    next: 'Suivant',
    back: 'Retour',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    done: 'Terminé',
    submit: 'Envoyer',
    skip: 'Passer',
    edit: 'Modifier',
    delete: 'Supprimer',
    add: 'Ajouter',
    retry: 'Réessayer',
    close: 'Fermer',
    ok: 'OK',
    yes: 'Oui',
    no: 'Non',
    search: 'Rechercher',
    loading: 'Chargement…',
    optional: 'Facultatif',
    required: 'Requis',
    name: 'Nom',
    email: 'E-mail',
    phone: 'Téléphone',
    today: "Aujourd'hui",
    tomorrow: 'Demain',
    somethingWrong: "Une erreur s'est produite. Veuillez réessayer.",
    select: 'Sélectionner',
    selectDate: 'Choisir une date',
    update: 'Mettre à jour',
    uploadImage: 'Téléverser une image',
    uploadFormatsHint: 'Formats JPG, PNG, PDF, ZIP',
    online: 'En ligne',
    offline: 'Hors ligne',
  },

  validation: {
    emailRequired: "L'e-mail est requis.",
    emailInvalid: 'Saisissez une adresse e-mail valide.',
    passwordRequired: 'Le mot de passe est requis.',
    passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères.',
    nameTooShort: 'Saisissez au moins 2 caractères.',
    phoneInvalid: 'Saisissez un numéro de téléphone valide.',
    aboutTooLong: 'Limitez ce texte à 280 caractères.',
  },

  language: {
    onboardingTitle: 'Choisissez votre langue',
    onboardingSubtitle:
      'Sélectionnez votre langue préférée pour continuer. Vous pourrez la changer à tout moment dans les réglages.',
    settingsTitle: 'Langue',
    settingsSubtitle: "Choisissez la langue utilisée dans l'application.",
    selectLabel: 'Langue',
    changedTo: 'Langue changée en {{language}}',
    continueIn: 'Continuer en {{language}}',
  },

  auth: {
    loginTitle: 'Content de vous revoir',
    loginSubtitle: 'Connectez-vous pour reprendre où vous en étiez.',
    signUpTitle: 'Créer votre compte',
    phoneNumber: 'Numéro de téléphone',
    enterPhone: 'Saisissez votre numéro de téléphone',
    emailAddress: 'Adresse e-mail',
    enterEmail: 'Saisissez votre e-mail',
    fullName: 'Nom complet',
    enterFullName: 'Saisissez votre nom complet',
    password: 'Mot de passe',
    enterPassword: 'Saisissez votre mot de passe',
    login: 'Se connecter',
    signUp: "S'inscrire",
    logout: 'Se déconnecter',
    noAccount: "Vous n'avez pas de compte ?",
    haveAccount: 'Vous avez déjà un compte ?',
    agreeTerms:
      'En continuant, vous acceptez nos conditions générales et notre politique de confidentialité.',
  },

  tabs: {
    home: 'Accueil',
    profile: 'Profil',
  },

  home: {
    greeting: 'Bonjour, {{name}}',
    title: 'Accueil',
    startTitle: 'Premiers pas',
    startBody:
      "Modifiez src/screen/root/home pour créer votre premier écran. Définissez l'URL de votre API dans .env, puis redémarrez Metro avec --reset-cache.",
  },

  profile: {
    title: 'Profil',
    editProfile: 'Modifier le profil',
    appearance: 'Apparence',
    appearanceHint: 'Suivez votre appareil ou choisissez un thème.',
    theme_light: 'Clair',
    theme_dark: 'Sombre',
    theme_system: 'Système',
    language: 'Langue',
    logOut: 'Se déconnecter',
    logOutConfirm: 'Voulez-vous vraiment vous déconnecter ?',
  },

  gallery: {
    title: 'Galerie de composants',
    subtitle: 'Tous les composants de ce starter, rendus en direct.',
    open: 'Ouvrir la galerie',
    buttons: 'Boutons',
    inputs: 'Champs',
    badges: 'Badges et puces',
    controls: 'Contrôles',
    feedback: 'Retours',
    emptyTitle: 'Rien pour le moment',
    emptyBody: "Voici le composant EmptyState avec une action associée.",
  },

  imagePicker: {
    title: 'Ajouter une photo',
    takePhoto: 'Prendre une photo',
    chooseFromGallery: 'Choisir dans la galerie',
    removePhoto: 'Supprimer la photo',
    updatePhoto: 'Modifier la photo',
    subtitle: 'Choisissez comment définir votre photo',
    cropTitle: 'Recadrer la photo',
    openCamera: 'Ouvrir la caméra',
    openCameraCaption: 'Prendre une nouvelle photo',
    galleryCaption: 'Choisir dans votre bibliothèque',
    permissionDenied: "Permission refusée. Activez l'accès dans les réglages.",
  },
};

export default fr;
