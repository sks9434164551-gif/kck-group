import Storage "mo:caffeineai-object-storage/Storage";
import Types "common";

module {
  public type Company = {
    id : Types.CompanyId;
    name : Text;
    industry : Text;
    description : Text;
    logoUrl : Storage.ExternalBlob;
    websiteUrl : Text;
    isActive : Bool;
    employees : Nat;
    countries : Nat;
    yearsActive : Nat;
    createdAt : Types.Timestamp;
  };

  public type CompanyInput = {
    name : Text;
    industry : Text;
    description : Text;
    logoUrl : Storage.ExternalBlob;
    websiteUrl : Text;
    isActive : Bool;
    employees : Nat;
    countries : Nat;
    yearsActive : Nat;
  };

  public type Analytics = {
    companyCount : Nat;
    totalEmployees : Nat;
    totalCountries : Nat;
    maxYearsActive : Nat;
  };
};
