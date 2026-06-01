import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AboutContent {
    missionText: string;
    values: Array<ValueItem>;
    visionText: string;
    timeline: Array<TimelineItem>;
}
export type Timestamp = bigint;
export interface HomeContent {
    stat4Value: string;
    button1Label: string;
    stat1Label: string;
    stat2Value: string;
    stat4Label: string;
    heroBadge: string;
    heroSubtitle: string;
    button2Label: string;
    stat2Label: string;
    stat3Value: string;
    heroTitle: string;
    stat1Value: string;
    stat3Label: string;
}
export interface ContactSubmission {
    id: ContactId;
    name: string;
    submittedAt: Timestamp;
    email: string;
    message: string;
    phone: string;
}
export interface User {
    displayName: string;
    registeredAt: bigint;
    principalId: string;
}
export interface Company {
    id: CompanyId;
    yearsActive: bigint;
    employees: bigint;
    websiteUrl: string;
    name: string;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    countries: bigint;
    logoUrl: ExternalBlob;
    industry: string;
}
export type CompanyId = bigint;
export interface TimelineItem {
    title: string;
    year: string;
    description: string;
    imageUrl: string;
}
export interface AdminProfile {
    bio: string;
    name: string;
    joinedAt: bigint;
    role: string;
    photoUrl: string;
    principalId: string;
}
export interface Analytics {
    totalEmployees: bigint;
    maxYearsActive: bigint;
    companyCount: bigint;
    totalCountries: bigint;
}
export interface ValueItem {
    title: string;
    icon: string;
    description: string;
    imageUrl: string;
}
export interface CompanyInput {
    yearsActive: bigint;
    employees: bigint;
    websiteUrl: string;
    name: string;
    description: string;
    isActive: boolean;
    countries: bigint;
    logoUrl: ExternalBlob;
    industry: string;
}
export type ContactId = bigint;
export interface ContactInfo {
    twitterUrl: string;
    email: string;
    address: string;
    mapUrl: string;
    phone: string;
    facebookUrl: string;
    linkedinUrl: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCompany(input: CompanyInput): Promise<Company>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCompany(id: CompanyId): Promise<boolean>;
    getAboutContent(): Promise<AboutContent>;
    getAdminProfile(): Promise<AdminProfile | null>;
    getAllUsers(): Promise<Array<User>>;
    getAnalytics(): Promise<Analytics>;
    getCallerUserRole(): Promise<UserRole>;
    getCompanies(): Promise<Array<Company>>;
    getContactInfo(): Promise<ContactInfo>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getHomeContent(): Promise<HomeContent>;
    getUser(): Promise<User | null>;
    isCallerAdmin(): Promise<boolean>;
    registerUser(): Promise<User>;
    submitContact(name: string, email: string, phone: string, message: string): Promise<ContactSubmission>;
    updateAboutContent(input: AboutContent): Promise<boolean>;
    updateCompany(id: CompanyId, input: CompanyInput): Promise<boolean>;
    updateContactInfo(input: ContactInfo): Promise<boolean>;
    updateHomeContent(input: HomeContent): Promise<boolean>;
    updateUserDisplayName(displayName: string): Promise<User>;
    upsertAdminProfile(input: AdminProfile): Promise<boolean>;
}
