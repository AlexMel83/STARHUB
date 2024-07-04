module.exports = class UserDto {
  id;
  email;
  name;
  surname;
  phone;
  role;
  isactivated;
  social_login;
  facebook_id;
  google_id;
  picture;
  created_at;
  udated_at;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.name = model.name;
    this.surname = model.surname;
    this.phone = model.phone;
    this.role = model.role;
    this.isactivated = model.isactivated;
    this.social_login = model.social_login;
    this.facebook_id = model.facebook_id;
    this.google_id = model.google_id;
    this.picture = model.picture;
    this.created_at = model.created_at;
    this.udated_at = model.updated_at;
  }
};
