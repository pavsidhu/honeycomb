import * as Contacts from "expo-contacts";
import parsePhoneNumber from "libphonenumber-js";
import { supabase } from "../supabase";

/**
 * Fetches all phone numbers from local contacts
 * Make sure to check for permissions with
 * Contacts.requestPermissionsAsync before calling this function
 */
export default async function getLocalPhoneNumbers() {
  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.PhoneNumbers],
  });

  const user = supabase.auth.user();

  if (!user) throw new Error("Expected user to be logged in");
  if (!user.phone) throw new Error("Expected user to have a phone number");

  const parsedUserPhoneNumber = parsePhoneNumber("+" + user.phone);

  if (!parsedUserPhoneNumber) throw new Error("Invalid phone number");

  const { countryCallingCode, country } = parsedUserPhoneNumber;

  const phoneNumbers: string[] = [];

  data.forEach((contact) =>
    contact.phoneNumbers?.forEach((phoneNumber) => {
      if (!phoneNumber.number) return;

      let number = phoneNumber.number;

      // If contact has no country code assume it's the same as the
      // current user's country code
      if (!phoneNumber.countryCode) {
        number = countryCallingCode + phoneNumber.number;
      }

      const parsedNumber = parsePhoneNumber(number, {
        defaultCallingCode: countryCallingCode,
        defaultCountry: country,
      });

      // Invalid phone number
      if (!parsedNumber) return;

      const parsedNumberString = parsedNumber
        .formatInternational()
        .replace(/(\s|\+)/g, "");

      phoneNumbers.push(parsedNumberString);
    })
  );

  return phoneNumbers;
}
