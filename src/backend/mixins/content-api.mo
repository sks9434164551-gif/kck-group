import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ContentTypes "../types/content";

mixin (
  accessControlState : AccessControl.AccessControlState,
  homeContent : { var value : ?ContentTypes.HomeContent },
  aboutContent : { var value : ?ContentTypes.AboutContent },
  contactInfo : { var value : ?ContentTypes.ContactInfo },
  adminProfile : { var value : ?ContentTypes.AdminProfile },
) {
  let defaultHomeContent : ContentTypes.HomeContent = {
    heroTitle = "KCK Group";
    heroSubtitle = "A diversified conglomerate driving innovation, creating opportunities, and building lasting value across multiple sectors.";
    heroBadge = "EMPOWERING GROWTH ACROSS INDUSTRIES";
    button1Label = "Explore Our Companies";
    button2Label = "About KCK";
    stat1Label = "Group Companies";
    stat1Value = "12+";
    stat2Label = "Employees";
    stat2Value = "5,000+";
    stat3Label = "Countries";
    stat3Value = "25+";
    stat4Label = "Years of Excellence";
    stat4Value = "30+";
  };

  func getDefaultAboutContent() : ContentTypes.AboutContent = {
    missionText = "To drive sustainable growth and innovation across industries, creating value for stakeholders worldwide.";
    visionText = "To be a globally recognized conglomerate known for excellence, integrity, and transformative impact.";
    values = [
      { title = "Innovation"; description = "Embracing new ideas and technologies to drive progress."; icon = "lightbulb"; imageUrl = "" },
      { title = "Integrity"; description = "Upholding the highest standards of honesty and ethics."; icon = "shield"; imageUrl = "" },
      { title = "Excellence"; description = "Delivering superior quality in everything we do."; icon = "star"; imageUrl = "" },
      { title = "Diversity"; description = "Celebrating diverse perspectives and inclusive growth."; icon = "people"; imageUrl = "" },
      { title = "Sustainability"; description = "Building a better future for generations to come."; icon = "leaf"; imageUrl = "" },
      { title = "Leadership"; description = "Inspiring and empowering leaders at every level."; icon = "trophy"; imageUrl = "" },
    ];
    timeline = [
      { year = "1994"; title = "Founded"; description = "KCK Group was established with a vision to build a diversified conglomerate."; imageUrl = "" },
      { year = "2002"; title = "Expansion"; description = "Expanded operations into new industries and regional markets."; imageUrl = "" },
      { year = "2010"; title = "Global Reach"; description = "Achieved presence in over 25 countries worldwide."; imageUrl = "" },
      { year = "2018"; title = "Digital Transformation"; description = "Embraced digital innovation across all group companies."; imageUrl = "" },
      { year = "2024"; title = "Future Forward"; description = "Driving next-generation growth through technology and sustainability."; imageUrl = "" },
    ];
  };

  let defaultContactInfo : ContentTypes.ContactInfo = {
    address = "Business Bay, Dubai, UAE";
    phone = "+971 4 123 4567";
    email = "info@kckgroup.com";
    mapUrl = "https://maps.google.com";
    linkedinUrl = "https://linkedin.com";
    twitterUrl = "https://twitter.com";
    facebookUrl = "https://facebook.com";
  };

  public query func getHomeContent() : async ContentTypes.HomeContent {
    switch (homeContent.value) {
      case (?v) v;
      case null defaultHomeContent;
    };
  };

  public shared ({ caller }) func updateHomeContent(input : ContentTypes.HomeContent) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update home content");
    };
    homeContent.value := ?input;
    true;
  };

  public query func getAboutContent() : async ContentTypes.AboutContent {
    switch (aboutContent.value) {
      case (?v) v;
      case null getDefaultAboutContent();
    };
  };

  public shared ({ caller }) func updateAboutContent(input : ContentTypes.AboutContent) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update about content");
    };
    aboutContent.value := ?input;
    true;
  };

  public query func getContactInfo() : async ContentTypes.ContactInfo {
    switch (contactInfo.value) {
      case (?v) v;
      case null defaultContactInfo;
    };
  };

  public shared ({ caller }) func updateContactInfo(input : ContentTypes.ContactInfo) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update contact info");
    };
    contactInfo.value := ?input;
    true;
  };

  public query func getAdminProfile() : async ?ContentTypes.AdminProfile {
    adminProfile.value;
  };

  public shared ({ caller }) func upsertAdminProfile(input : ContentTypes.AdminProfile) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update admin profile");
    };
    adminProfile.value := ?input;
    true;
  };
};
