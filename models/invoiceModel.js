const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    id: String,
    min_service_charge: String,
    class_id: String,
    due_date: String, // Convert date to string
    balance: String,
    payment_status_id: String,
    additional_discount: String,
    tsf: String,
    total_before_tax: String,
    invoice_date: String, // Convert date to string
    billing_address_id: String,
    line_item_total: String,
    combined_feature_flag: String,
    is_surcharge_taxable: String, // Convert boolean to string
    credit: String,
    invoice_lock_date: String, // Convert date to string
    ready_for_sync: String, // Convert boolean to string
    is_active: String, // Convert boolean to string
    billing_status_id: String,
    is_discount_taxable: String, // Convert boolean to string
    created_by: String,
    bu_id: String,
    is_amount_additional_fee: String, // Convert boolean to string
    invoice_total: String,
    is_amount_additional_discount: String, // Convert boolean to string
    additional_fee: String,
    items_total_discount: String,
    updated_at: String, // Convert date to string
    total_surcharge: String,
    pdf_label: String,
    discount_tier: String,
    signature: String,
    invoice_number: String,
    total_discount: String,
    customer_id: String,
    updated_user_id: String,
    service_address_id: String,
    additional_fee_amount: String,
    estimated_hours: String,
    created_at: String, // Convert date to string
    is_deleted: String, // Convert boolean to string
    payment_collected_amount: String,
    additional_fee_tier: String,
    invoice_creation_device: String,
    tax: String,
    created_user_id: String,
    company_id: String,
    additional_discount_amount: String,
    updated_by: String,
    object_id: String,
    total_tax: String
 });

const Invoice = mongoose.model("invoice", invoiceSchema);  
module.exports = Invoice;
