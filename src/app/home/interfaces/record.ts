export interface Record {
  date: string;
  name: string;
  lastname: string;
  services: {
    hair: boolean;
    beard: boolean;
    skim: boolean;
    manicure: boolean;
    pedicure: boolean;
  };
}
