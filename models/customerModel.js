const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  lastname: String,
  ready_for_sync: String,
  is_active: String,
  id: String,
  email: String,
  created_by: String,
  bu_id: String,
  cellphone: String,
  name: String,
  ext: String,
  updated_at: String, 
  additional_name: String,
  landline: String,
  display_name: String,
  root_parent_id: String, 
  updated_user_id: String,
  parent_id: String,
  deleted_at: String, 
  created_at: String, 
  is_deleted: String, 
  customer_identifier: String,
  created_user_id: String, 
  company_id: String,
  updated_by: String,
  is_prospect: String, 
  firstname: String,
  object_id: String, 
  skip_level: String, 
  customer_unique_id: String
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
