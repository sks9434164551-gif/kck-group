module {
  public type ValueItem = { title : Text; description : Text; icon : Text; imageUrl : Text };
  public type TimelineItem = { year : Text; title : Text; description : Text; imageUrl : Text };

  public type HomeContent = {
    heroTitle : Text;
    heroSubtitle : Text;
    heroBadge : Text;
    button1Label : Text;
    button2Label : Text;
    stat1Label : Text;
    stat1Value : Text;
    stat2Label : Text;
    stat2Value : Text;
    stat3Label : Text;
    stat3Value : Text;
    stat4Label : Text;
    stat4Value : Text;
  };

  public type AboutContent = {
    missionText : Text;
    visionText : Text;
    values : [ValueItem];
    timeline : [TimelineItem];
  };

  public type ContactInfo = {
    address : Text;
    phone : Text;
    email : Text;
    mapUrl : Text;
    linkedinUrl : Text;
    twitterUrl : Text;
    facebookUrl : Text;
  };

  public type AdminProfile = {
    principalId : Text;
    name : Text;
    bio : Text;
    photoUrl : Text;
    role : Text;
    joinedAt : Int;
  };
};
