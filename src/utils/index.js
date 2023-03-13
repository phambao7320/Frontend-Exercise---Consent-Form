const checkStatus = (language, string) => {
  console.log("DEBUG", language, string);
  console.log(typeof language, typeof string.toLowerCase());
  if (
    (string.toLowerCase() === "yes" && language === "en-GB") ||
    (string.toLowerCase() === "oui" && language === "fr-FR")
  ) {
    return true;
  } else {
    return false;
  }
};

export { checkStatus };
