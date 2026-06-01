import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserTypes "../types/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Text, UserTypes.User>,
) {
  public shared ({ caller }) func registerUser() : async UserTypes.User {
    let principalId = caller.toText();
    switch (users.get(principalId)) {
      case (?existing) existing;
      case null {
        let newUser : UserTypes.User = {
          principalId;
          registeredAt = Time.now();
          displayName = "";
        };
        users.add(principalId, newUser);
        newUser;
      };
    };
  };

  public query ({ caller }) func getUser() : async ?UserTypes.User {
    let principalId = caller.toText();
    users.get(principalId);
  };

  public query ({ caller }) func getAllUsers() : async [UserTypes.User] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all users");
    };
    let result = List.empty<UserTypes.User>();
    for ((_, user) in users.entries()) {
      result.add(user);
    };
    result.toArray();
  };

  public shared ({ caller }) func updateUserDisplayName(displayName : Text) : async UserTypes.User {
    let principalId = caller.toText();
    switch (users.get(principalId)) {
      case null Runtime.trap("User not registered");
      case (?existing) {
        let updated : UserTypes.User = { existing with displayName };
        users.add(principalId, updated);
        updated;
      };
    };
  };
};
