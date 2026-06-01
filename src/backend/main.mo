import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import CommonTypes "types/common";
import CompanyTypes "types/company";
import ContactTypes "types/contact";
import CompanyMixin "mixins/company-api";
import ContactMixin "mixins/contact-api";
import ContentTypes "types/content";
import ContentMixin "mixins/content-api";
import Map "mo:core/Map";
import UserTypes "types/user";
import UserMixin "mixins/user-api";



actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // Shared counter state
  let counterState = { var nextCompanyId : CommonTypes.CompanyId = 1; var nextContactId : CommonTypes.ContactId = 1 };

  // Company storage
  let companies = List.empty<CompanyTypes.Company>();

  // Contact storage
  let contacts = List.empty<ContactTypes.ContactSubmission>();

  // Company API
  include CompanyMixin(accessControlState, companies, counterState);

  // Contact API
  include ContactMixin(accessControlState, contacts, counterState);

  // Content stable state (null = use defaults defined in ContentMixin)
  let homeContent = { var value : ?ContentTypes.HomeContent = null };
  let aboutContent = { var value : ?ContentTypes.AboutContent = null };
  let contactInfo = { var value : ?ContentTypes.ContactInfo = null };
  let adminProfile = { var value : ?ContentTypes.AdminProfile = null };

  // Content API
  include ContentMixin(accessControlState, homeContent, aboutContent, contactInfo, adminProfile);

  // User storage
  let users = Map.empty<Text, UserTypes.User>();

  // User API
  include UserMixin(accessControlState, users);
};
