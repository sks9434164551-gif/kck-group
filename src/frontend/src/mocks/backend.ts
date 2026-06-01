import type { backendInterface, _ImmutableObjectStorageCreateCertificateResult, _ImmutableObjectStorageRefillResult, HomeContent, AboutContent, ContactInfo, User } from "../backend";
import { ExternalBlob, UserRole } from "../backend";

export const mockBackend: backendInterface = {
  addCompany: async (input) => ({
    id: BigInt(1),
    yearsActive: input.yearsActive,
    employees: input.employees,
    websiteUrl: input.websiteUrl,
    name: input.name,
    createdAt: BigInt(Date.now()),
    description: input.description,
    isActive: input.isActive,
    countries: input.countries,
    logoUrl: input.logoUrl,
    industry: input.industry,
  }),

  assignCallerUserRole: async () => undefined,

  deleteCompany: async () => true,

  getAnalytics: async () => ({
    totalEmployees: BigInt(5000),
    maxYearsActive: BigInt(30),
    companyCount: BigInt(12),
    totalCountries: BigInt(25),
  }),

  getCallerUserRole: async () => UserRole.guest,

  getCompanies: async () => [
    {
      id: BigInt(1),
      yearsActive: BigInt(15),
      employees: BigInt(500),
      websiteUrl: "https://kck-tech.com",
      name: "KCK Technology Solutions",
      createdAt: BigInt(Date.now()),
      description: "Leading provider of enterprise software solutions and digital transformation services.",
      isActive: true,
      countries: BigInt(8),
      logoUrl: ExternalBlob.fromURL("https://placehold.co/80x80/0B2EA8/FFFFFF?text=KT"),
      industry: "Technology",
    },
    {
      id: BigInt(2),
      yearsActive: BigInt(20),
      employees: BigInt(800),
      websiteUrl: "https://kck-finance.com",
      name: "KCK Financial Services",
      createdAt: BigInt(Date.now()),
      description: "Comprehensive financial services including investment banking and wealth management.",
      isActive: true,
      countries: BigInt(12),
      logoUrl: ExternalBlob.fromURL("https://placehold.co/80x80/1E40AF/FFFFFF?text=KF"),
      industry: "Finance",
    },
    {
      id: BigInt(3),
      yearsActive: BigInt(10),
      employees: BigInt(300),
      websiteUrl: "https://kck-realty.com",
      name: "KCK Real Estate",
      createdAt: BigInt(Date.now()),
      description: "Premium real estate development and property management across major cities.",
      isActive: true,
      countries: BigInt(5),
      logoUrl: ExternalBlob.fromURL("https://placehold.co/80x80/F59E0B/FFFFFF?text=KR"),
      industry: "Real Estate",
    },
    {
      id: BigInt(4),
      yearsActive: BigInt(12),
      employees: BigInt(400),
      websiteUrl: "https://kck-energy.com",
      name: "KCK Energy Group",
      createdAt: BigInt(Date.now()),
      description: "Sustainable energy solutions and renewable power infrastructure development.",
      isActive: true,
      countries: BigInt(7),
      logoUrl: ExternalBlob.fromURL("https://placehold.co/80x80/0B2EA8/FFFFFF?text=KE"),
      industry: "Energy",
    },
  ],

  getContactSubmissions: async () => [
    {
      id: BigInt(1),
      name: "John Smith",
      submittedAt: BigInt(Date.now()),
      email: "john.smith@example.com",
      message: "Interested in partnership opportunities with KCK Group.",
      phone: "+1-555-0100",
    },
  ],

  getHomeContent: async (): Promise<HomeContent> => ({
    heroTitle: "KCK Group",
    heroSubtitle: "A diversified conglomerate driving innovation, creating opportunities, and building lasting value across multiple sectors.",
    heroBadge: "EMPOWERING GROWTH ACROSS INDUSTRIES",
    button1Label: "Explore Our Companies",
    button2Label: "About KCK",
    stat1Label: "Group Companies",
    stat1Value: "12+",
    stat2Label: "Employees",
    stat2Value: "5,000+",
    stat3Label: "Countries",
    stat3Value: "25+",
    stat4Label: "Years of Excellence",
    stat4Value: "30+",
  }),

  updateHomeContent: async () => true,

  getAboutContent: async (): Promise<AboutContent> => ({
    missionText: "To drive sustainable growth and innovation across industries, creating value for stakeholders worldwide.",
    visionText: "To be a globally recognized conglomerate known for excellence, integrity, and transformative impact.",
    values: [
      { title: "Innovation", description: "Embracing new ideas and technologies to drive progress.", icon: "lightbulb", imageUrl: "" },
      { title: "Integrity", description: "Upholding the highest standards of honesty and ethics.", icon: "shield", imageUrl: "" },
      { title: "Excellence", description: "Delivering superior quality in everything we do.", icon: "star", imageUrl: "" },
      { title: "Diversity", description: "Celebrating diverse perspectives and inclusive growth.", icon: "people", imageUrl: "" },
      { title: "Sustainability", description: "Building a better future for generations to come.", icon: "leaf", imageUrl: "" },
      { title: "Leadership", description: "Inspiring and empowering leaders at every level.", icon: "trophy", imageUrl: "" },
    ],
    timeline: [
      { year: "1994", title: "Founded", description: "KCK Group was established with a vision to build a diversified conglomerate.", imageUrl: "" },
      { year: "2002", title: "Expansion", description: "Expanded operations into new industries and regional markets.", imageUrl: "" },
      { year: "2010", title: "Global Reach", description: "Achieved presence in over 25 countries worldwide.", imageUrl: "" },
      { year: "2018", title: "Digital Transformation", description: "Embraced digital innovation across all group companies.", imageUrl: "" },
      { year: "2024", title: "Future Forward", description: "Driving next-generation growth through technology and sustainability.", imageUrl: "" },
    ],
  }),

  updateAboutContent: async () => true,

  getContactInfo: async (): Promise<ContactInfo> => ({
    address: "Business Bay, Dubai, UAE",
    phone: "+971 4 123 4567",
    email: "info@kckgroup.com",
    mapUrl: "https://maps.google.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    facebookUrl: "https://facebook.com",
  }),

  updateContactInfo: async () => true,

  getAdminProfile: async () => null,

  upsertAdminProfile: async () => true,

  isCallerAdmin: async () => false,

  submitContact: async (name, email, phone, message) => ({
    id: BigInt(1),
    name,
    submittedAt: BigInt(Date.now()),
    email,
    message,
    phone,
  }),

  updateCompany: async () => true,

  registerUser: async (): Promise<User> => ({
    principalId: "mock-principal",
    registeredAt: BigInt(Date.now()),
    displayName: "",
  }),

  getUser: async (): Promise<User | null> => null,

  getAllUsers: async (): Promise<Array<User>> => [],

  updateUserDisplayName: async (displayName: string): Promise<User> => ({
    principalId: "mock-principal",
    registeredAt: BigInt(Date.now()),
    displayName,
  }),

  _immutableObjectStorageBlobsAreLive: async (_hashes) => [],

  _immutableObjectStorageBlobsToDelete: async () => [],

  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => undefined,

  _immutableObjectStorageCreateCertificate: async (_blobHash): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({
    method: "",
    blob_hash: "",
  }),

  _immutableObjectStorageRefillCashier: async (_refillInformation): Promise<_ImmutableObjectStorageRefillResult> => ({}),

  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,

  _initializeAccessControl: async () => undefined,
};
