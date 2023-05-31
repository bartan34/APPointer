export interface Record {
  date: string;
  name: string;
  lastname: string;
  services: {
    hair: boolean;
    beard: boolean;
    skin: boolean;
    manicure: boolean;
    pedicure: boolean;
  };
}

export const services = {
  manicure: 'Manikür',
  hair: 'Saç Kesimi',
  beard: 'Sakal Kesimi',
  skin: 'Cilt Bakımı',
  pedicure: 'Pedikür',
};
