import { DataValueExtension } from 'chitility/dist/lib/extension/data-value-extension';

export default DataValueExtension.resolve('CART_DETAIL_SCHEMA', {
  query: `
    id
    total_quantity
    items {
        id
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
            name
            sku
            url_key
            small_image {
                url
                label
            }
            price {
                regularPrice {
                    amount {
                        value
                        currency
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
        gift_options{
            gift_wrapping_for_items{
                currency
                value
            }
            gift_wrapping_for_order{
                currency
                value
            }
            printed_card{
                currency
                value
            }
        }
        subtotal_including_tax{
            currency
            value
        }
        rwp_earn_est{
            money{
                currency
                value
            }
            points
        }
    }
    applied_coupons {
        code
    }
    applied_reward_points{
        money{
            currency
            value
        }
        points
    }
    selected_payment_method {
        code
        title
    }
    available_payment_methods{
        code
        title
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
        customer_address_id
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
        iz_address_district
        iz_address_province
        iz_address_ward
    }
`,
});
