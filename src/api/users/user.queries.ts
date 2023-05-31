export const GetUser =
  "SELECT first_name,last_name, email,id,phone, address1, address2, address3, city, state, country, postcode FROM user WHERE email=? AND password=PASSWORD(?)";
  export const SelectUserForEmail =
  "SELECT first_name, email,id FROM user WHERE email=?";

  export const ForgotPassword =
  "SELECT  email,password FROM user WHERE email=?";
export const InsertUser =
  "INSERT INTO user(first_name, last_name, email, password, phone, address1, address2, address3, city, state, country, postcode, creation_date, update_date)  VALUES(?,?,?,PASSWORD(?),?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";

export const UpdatePasswordForEmail ="UPDATE user SET password=PASSWORD(?),update_date=CURRENT_TIMESTAMP WHERE email=?"