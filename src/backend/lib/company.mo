import List "mo:core/List";
import Time "mo:core/Time";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/common";
import CompanyTypes "../types/company";

module {
  public func getActiveCompanies(companies : List.List<CompanyTypes.Company>) : [CompanyTypes.Company] {
    companies.filter(func(c) { c.isActive }).toArray();
  };

  public func getCompanyById(companies : List.List<CompanyTypes.Company>, id : Types.CompanyId) : ?CompanyTypes.Company {
    companies.find(func(c) { c.id == id });
  };

  public func addCompany(
    companies : List.List<CompanyTypes.Company>,
    state : { var nextCompanyId : Types.CompanyId },
    input : CompanyTypes.CompanyInput,
  ) : CompanyTypes.Company {
    let id = state.nextCompanyId;
    state.nextCompanyId += 1;
    let company : CompanyTypes.Company = {
      id;
      name = input.name;
      industry = input.industry;
      description = input.description;
      logoUrl = input.logoUrl;
      websiteUrl = input.websiteUrl;
      isActive = input.isActive;
      employees = input.employees;
      countries = input.countries;
      yearsActive = input.yearsActive;
      createdAt = Time.now();
    };
    companies.add(company);
    company;
  };

  public func updateCompany(
    companies : List.List<CompanyTypes.Company>,
    id : Types.CompanyId,
    input : CompanyTypes.CompanyInput,
  ) : Bool {
    var found = false;
    companies.mapInPlace(
      func(c) {
        if (c.id == id) {
          found := true;
          { c with
            name = input.name;
            industry = input.industry;
            description = input.description;
            logoUrl = input.logoUrl;
            websiteUrl = input.websiteUrl;
            isActive = input.isActive;
            employees = input.employees;
            countries = input.countries;
            yearsActive = input.yearsActive;
          };
        } else { c };
      }
    );
    found;
  };

  public func deleteCompany(
    companies : List.List<CompanyTypes.Company>,
    id : Types.CompanyId,
  ) : Bool {
    let sizeBefore = companies.size();
    companies.retain(func(c) { c.id != id });
    companies.size() < sizeBefore;
  };

  public func computeAnalytics(companies : List.List<CompanyTypes.Company>) : CompanyTypes.Analytics {
    var totalEmployees = 0;
    var totalCountries = 0;
    var maxYearsActive = 0;
    var companyCount = 0;
    for (c in companies.values()) {
      if (c.isActive) {
        companyCount += 1;
        totalEmployees += c.employees;
        totalCountries += c.countries;
        if (c.yearsActive > maxYearsActive) {
          maxYearsActive := c.yearsActive;
        };
      };
    };
    { companyCount; totalEmployees; totalCountries; maxYearsActive };
  };

  public func makeSampleCompanies(state : { var nextCompanyId : Types.CompanyId }) : [CompanyTypes.Company] {
    let now = Time.now();
    let emptyBlob : Storage.ExternalBlob = "" : Blob;
    let samples : [CompanyTypes.CompanyInput] = [
      {
        name = "KCK Energy Solutions";
        industry = "Energy & Utilities";
        description = "Leading provider of renewable energy solutions and sustainable power infrastructure across Asia and the Middle East.";
        logoUrl = emptyBlob;
        websiteUrl = "https://energy.kckgroup.com";
        isActive = true;
        employees = 1200;
        countries = 8;
        yearsActive = 25;
      },
      {
        name = "KCK Infrastructure";
        industry = "Construction & Infrastructure";
        description = "Premier construction and infrastructure development company specializing in large-scale commercial and residential projects.";
        logoUrl = emptyBlob;
        websiteUrl = "https://infra.kckgroup.com";
        isActive = true;
        employees = 2000;
        countries = 6;
        yearsActive = 30;
      },
      {
        name = "KCK Technologies";
        industry = "Information Technology";
        description = "Innovative technology company delivering cutting-edge software solutions, digital transformation, and IT consulting services.";
        logoUrl = emptyBlob;
        websiteUrl = "https://tech.kckgroup.com";
        isActive = true;
        employees = 800;
        countries = 12;
        yearsActive = 15;
      },
      {
        name = "KCK Financial Services";
        industry = "Banking & Finance";
        description = "Trusted financial services provider offering investment banking, asset management, and corporate finance solutions.";
        logoUrl = emptyBlob;
        websiteUrl = "https://finance.kckgroup.com";
        isActive = true;
        employees = 600;
        countries = 10;
        yearsActive = 20;
      },
      {
        name = "KCK Real Estate";
        industry = "Real Estate & Property";
        description = "Premier real estate development and management company with a diverse portfolio of commercial, residential, and hospitality properties.";
        logoUrl = emptyBlob;
        websiteUrl = "https://realestate.kckgroup.com";
        isActive = true;
        employees = 400;
        countries = 5;
        yearsActive = 18;
      },
    ];
    let result = List.empty<CompanyTypes.Company>();
    for (input in samples.values()) {
      let id = state.nextCompanyId;
      state.nextCompanyId += 1;
      result.add({
        id;
        name = input.name;
        industry = input.industry;
        description = input.description;
        logoUrl = input.logoUrl;
        websiteUrl = input.websiteUrl;
        isActive = input.isActive;
        employees = input.employees;
        countries = input.countries;
        yearsActive = input.yearsActive;
        createdAt = now;
      });
    };
    result.toArray();
  };
};
