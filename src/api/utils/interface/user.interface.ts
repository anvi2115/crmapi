interface userInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  creation_date?:Date;
  update_date?:Date
}

export default userInterface;
