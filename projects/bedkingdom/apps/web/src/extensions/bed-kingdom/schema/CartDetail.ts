export default `
    id
    total_quantity
    items {
        id
        uid
        date_picker
        delivery_warning
        prices {
            row_total_including_tax{
                currency
                value
            }
            price {
                value
                currency
            }
        }
        product {
            id
            __typename
            name
            sku
            url_key
            stock_status
            small_image {
                url
                label
            }
            image{
                url
            }
            bed_data{
               bed_category_product_image {
                  url
                  url_mobile
                  label
              }
            }
            price {
                regularPrice {
                    amount {
                        value
                        currency
                    }
                }
            }
            price_range {
                maximum_price {
                    regular_price {
                        currency
                        value
                    }
                    discount {
                        amount_off
                        percent_off
                    }
                    final_price {
                        currency
                        value
                    }
                    fixed_product_taxes {
                        amount {
                            currency
                            value
                        }
                        label
                    }
                }
            }
        }
        quantity
        ... on ConfigurableCartItem {
          configurable_options {
            configurable_product_option_uid
            option_label
            configurable_product_option_value_uid
            value_label
          }
        }
        ... on SimpleCartItem {
          customizable_options {
            label
            customizable_option_uid
            is_required
            sort_order
            type
            values {
              customizable_option_value_uid
              label
              price {
                type
                units
                value
              }
              value
            }
          }
        }
    }
    prices {
        grand_total {
            value
            currency
        }
        discounts{
            amount{
                currency
                value
            }
            label
        }
        subtotal_including_tax{
            currency
            value
        }
        applied_taxes {
               amount {
                 currency
                  value
               }
               label
          }
    }
    applied_coupons {
        code
    }
    selected_payment_method {
        code
        title
    }
    available_payment_methods{
        code
        title
    }
     applied_am_gift_cards{
                code
                expiration_date
                current_balance{
                    value
                    currency
                }
                applied_balance{
                    value
                    currency
                }
           }
    shipping_addresses {
        available_shipping_methods{
            amount{
                currency
                value
            }
            available
            carrier_code
            carrier_title
            method_code
            method_title
            price_incl_tax{
                currency
                value
            }
        }
        city
        street
        country {
            code
            label
        }
        selected_shipping_method {
            method_title
            method_code
            carrier_code
            carrier_title
            amount {
                currency
                value
            }
        }
        company
        customer_notes
        firstname
        lastname
        telephone
    }
`;
