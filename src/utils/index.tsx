import { consentEnglistText, consentFranceText } from "../constants";

const checkStatusConsent = (language: string, string: string) => {
  const lowerString = string.toLowerCase();
  if (
    (lowerString === "yes" && language === "en-GB") ||
    (lowerString === "oui" && language === "fr-FR")
  )
    return true;
  return false;
};

const getValueTextTranslate = (language: string) => {
  if (language === "en-GB") return consentEnglistText;
  return consentFranceText;
};

export { checkStatusConsent, getValueTextTranslate };
