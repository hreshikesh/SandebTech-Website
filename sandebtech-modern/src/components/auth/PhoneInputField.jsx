import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import "./PhoneInputField.css";

function PhoneInputField({
  value,
  onChange,
}) {
  return (
    <PhoneInput
      defaultCountry="in"
      value={value}
      onChange={(phone) => onChange(phone)}
      forceDialCode
      hideDropdown={false}
      inputClassName="custom-phone-input"
      countrySelectorStyleProps={{
        buttonClassName: "country-btn",
        dropdownClassName: "country-dropdown",
      }}
    />
  );
}

export default PhoneInputField;