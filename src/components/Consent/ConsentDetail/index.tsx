import { ICON_CHECK_NO, ICON_CHECK_YES } from "../../../assets";
import AudioSpeech from "../../Audio";
import { PropItemConsent } from "../../../types";

const ItemConsent = (item: PropItemConsent) => {
  const { nameUser, languageSelect, statusConsent, audioURL } = item;
  return (
    <div className="flex justify-between items-center p-4 rounded-lg">
      <div>
        <h4>{nameUser}</h4>
        <p>{languageSelect}</p>
      </div>
      <div className="flex justify-center items-center gap-7">
        {statusConsent ? <ICON_CHECK_YES /> : <ICON_CHECK_NO />}
        <AudioSpeech urlBlob={audioURL} />
      </div>
    </div>
  );
};

export default ItemConsent;
