import List "mo:core/List";
import Types "../types/common";
import ContactTypes "../types/contact";
import Time "mo:core/Time";

module {
  public func submitContact(
    contacts : List.List<ContactTypes.ContactSubmission>,
    state : { var nextContactId : Types.ContactId },
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : ContactTypes.ContactSubmission {
    let id = state.nextContactId;
    state.nextContactId += 1;
    let submission : ContactTypes.ContactSubmission = {
      id;
      name;
      email;
      phone;
      message;
      submittedAt = Time.now();
    };
    contacts.add(submission);
    submission;
  };

  public func getAllContacts(contacts : List.List<ContactTypes.ContactSubmission>) : [ContactTypes.ContactSubmission] {
    contacts.toArray();
  };
};
