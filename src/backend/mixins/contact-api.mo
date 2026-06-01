import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/common";
import ContactTypes "../types/contact";
import ContactLib "../lib/contact";

mixin (
  accessControlState : AccessControl.AccessControlState,
  contacts : List.List<ContactTypes.ContactSubmission>,
  state : { var nextContactId : Types.ContactId },
) {
  public shared func submitContact(
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : async ContactTypes.ContactSubmission {
    ContactLib.submitContact(contacts, state, name, email, phone, message);
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactTypes.ContactSubmission] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    ContactLib.getAllContacts(contacts);
  };
};
