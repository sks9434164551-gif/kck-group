import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/common";
import CompanyTypes "../types/company";
import CompanyLib "../lib/company";

mixin (
  accessControlState : AccessControl.AccessControlState,
  companies : List.List<CompanyTypes.Company>,
  state : { var nextCompanyId : Types.CompanyId },
) {
  public query func getCompanies() : async [CompanyTypes.Company] {
    CompanyLib.getActiveCompanies(companies);
  };

  public query func getAnalytics() : async CompanyTypes.Analytics {
    CompanyLib.computeAnalytics(companies);
  };

  public shared ({ caller }) func addCompany(input : CompanyTypes.CompanyInput) : async CompanyTypes.Company {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add companies");
    };
    CompanyLib.addCompany(companies, state, input);
  };

  public shared ({ caller }) func updateCompany(id : Types.CompanyId, input : CompanyTypes.CompanyInput) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update companies");
    };
    CompanyLib.updateCompany(companies, id, input);
  };

  public shared ({ caller }) func deleteCompany(id : Types.CompanyId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete companies");
    };
    CompanyLib.deleteCompany(companies, id);
  };
};
