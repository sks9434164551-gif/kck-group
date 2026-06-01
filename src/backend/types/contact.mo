import Types "common";

module {
  public type ContactSubmission = {
    id : Types.ContactId;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    submittedAt : Types.Timestamp;
  };
};
