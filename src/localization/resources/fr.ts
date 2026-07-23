/**
 * French translations. Mirrors every key in en.ts — keep the two files in sync.
 */
import type { TranslationSchema } from "./en";

const fr: TranslationSchema = {
  common: {
    appName: "AwesomeProject",
    continue: "Continuer",
    next: "Suivant",
    back: "Retour",
    cancel: "Annuler",
    confirm: "Confirmer",
    save: "Enregistrer",
    done: "Terminé",
    submit: "Envoyer",
    skip: "Passer",
    edit: "Modifier",
    delete: "Supprimer",
    add: "Ajouter",
    retry: "Réessayer",
    close: "Fermer",
    ok: "OK",
    yes: "Oui",
    no: "Non",
    search: "Rechercher",
    loading: "Chargement…",
    optional: "Facultatif",
    required: "Obligatoire",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    today: "Aujourd'hui",
    tomorrow: "Demain",
    somethingWrong: "Une erreur est survenue. Veuillez réessayer.",
    select: "Sélectionner",
    selectDate: "Sélectionner une date",
    update: "Mettre à jour",
    uploadImage: "Importer une image",
    uploadFormatsHint: "Formats pris en charge : Jpg, Png, Pdf, Zip",
  },

  language: {
    onboardingTitle: "Choisissez votre langue",
    onboardingSubtitle: "Sélectionnez votre langue préférée pour continuer. Vous pourrez la changer à tout moment dans les Paramètres.",
    settingsTitle: "Langue",
    settingsSubtitle: "Choisissez la langue utilisée dans l'application.",
    selectLabel: "Langue",
    changedTo: "Langue changée en {{language}}",
    continueIn: "Continuer en {{language}}",
  },

  auth: {
    loginTitle: "Bon retour",
    loginSubtitle: "Ravi de vous revoir !",
    signUpTitle: "Créez votre compte",
    phoneNumber: "Numéro de téléphone",
    enterPhone: "Saisissez votre numéro de téléphone",
    emailAddress: "Adresse e-mail",
    enterEmail: "Saisissez votre e-mail",
    fullName: "Nom complet",
    enterFullName: "Saisissez votre nom complet",
    password: "Mot de passe",
    enterPassword: "Saisissez votre mot de passe",
    login: "Se connecter",
    signUp: "S'inscrire",
    logout: "Se déconnecter",
    noAccount: "Vous n'avez pas de compte ?",
    haveAccount: "Vous avez déjà un compte ?",
    agreeTerms: "En continuant, vous acceptez nos Conditions générales et notre Politique de confidentialité.",
  },

  tabs: {
    home: "Accueil",
    profile: "Profil",
  },

  home: {
    greeting: "Salut, {{name}}",
    title: "Accueil",
  },

  profile: {
    title: "Profil",
    editProfile: "Modifier le profil",
    language: "Langue",
    logOut: "Se déconnecter",
    logOutConfirm: "Voulez-vous vraiment vous déconnecter ?",
  },

  imagePicker: {
    title: "Ajouter une photo",
    takePhoto: "Prendre une photo",
    chooseFromGallery: "Choisir dans la galerie",
    removePhoto: "Supprimer la photo",
    updatePhoto: "Mettre à jour la photo",
    subtitle: "Choisissez comment définir votre photo",
    cropTitle: "Recadrer la photo",
    openCamera: "Ouvrir l'appareil photo",
    openCameraCaption: "Prendre une nouvelle photo",
    galleryCaption: "Choisir dans votre bibliothèque",
    permissionDenied: "Autorisation refusée. Activez l'accès dans les Réglages.",
  },
};

export default fr;
