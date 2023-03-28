import { Registry } from 'chitility';

export default function () {
  return Registry.getInstance().registry('MGT_CE') === true
    ? `
    id
    email
    firstname
    lastname
    gender
    is_subscribed
    date_of_birth
    default_billing
    default_shipping
    group_id
    allow_remote_shopping_assistance
    addresses{
        id
        firstname
        middlename
        lastname
        street
        city
        postcode
        telephone
        country_code
        region {
          region
          region_code
        }
        default_billing
        default_shipping
        fax
    }
`
    : `
    id
    email
    firstname
    lastname
    gender
    avatar
    is_subscribed
    date_of_birth
    default_billing
    default_shipping
    group_id
    retail_telephone
    addresses{
        id
        firstname
        middlename
        lastname
        street
        city
        postcode
        telephone
        country_code
        iz_address_province
        iz_address_district
        iz_address_ward
    }
    vouchers{
        items{
            code
            comment
            pick_by
            source_id
            pick_date
            used
            name
            description
            from_date
            to_date
            simple_action
            simple_action_label
            discount_amount
        }
    }
    reward_points{
        balance{
            money{
                currency
                value
            }
            points
        }
        suggest_use
        exchange_history{
                balance{
                  money{
                    currency
                    value
                  }
                  points
                }
                change_reason
                date
                points_change
                comment
              }
        exchange_vouchers{
          exchange_id
          image
          name
          point
          rule_id
          rule{
            schedule{
              description
              start_time
              end_time
              row_id
              simple_action
              discount_amount
              name
            }
        }
      }
    }
    follow_brands{
      brand_id
      name
      logo
    }
    sizesV2{
      items{
        active
        name
        sex
        height
        weight
        form
        waist
        answer_id
        size
        brand_size{
          brand_id
          size
        }
      }
    }
     system_generate 
`;
}
