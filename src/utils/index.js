const checkStatus = (language, string) => {
  console.log("DEBUG", language, string);
  console.log(typeof language, typeof string.toLowerCase());
  if (
    (string.toLowerCase() === "yes" && language === "en-GB") ||
    (string.toLowerCase() === "oui" && language === "fr-FR")
  ) {
    console.log("TRUE");
    return true;
  } else {
    console.log("FALSE");
    return false;
  }
};

export { checkStatus };
