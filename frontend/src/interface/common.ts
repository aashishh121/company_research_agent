export interface CompanyInfo {
  company_name: string;
  founding_year: number;
  founder_names: any[];
  product_description: string;
  funding_summary: string;
}

export interface CompanyData {
  info: CompanyInfo;
}
