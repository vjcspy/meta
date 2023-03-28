import { useExtAdditionConfig } from '@modules/ui/hook/config/useExtAdditionConfig';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const Returns = combineHOC()((props) => {
  const formId = useExtAdditionConfig('form_id', props);

  return (
    <section className="b-cms-contact container-1200 container mx-auto mb-5 px-4">
      <h1 className="b-page-title mb-8 mt-3 text-2xl md:text-3xl">
        <span>Returns</span>
      </h1>
      <div className="mb-5 grid grid-cols-1 md:grid-cols-2 md:gap-10">
        <div className="b-page-content">
          <strong className="mb-3 block text-16px">Returns Form</strong>
          <p className="mt-1 mb-3 block">
            We are confident that you will be delighted with your purchases from
            Bedkingdom.co.uk. However, we accept there may be occasions where
            you would wish to return a product to ensure we can deal with your
            return as quickly as possible please fill out the optional form
            below this does not restrict your statutory right to cancel as a
            consumer
          </p>
          <UiExtension uiId="CUSTOM_FORM" formId={formId} />
        </div>
        <div className="b-page-address">
          <p className="mb-2 block text-16px">
            <strong>Returns Procedure</strong>
          </p>
          <p>
            We aim to offer a quick and hassle free returns service. We are
            confident you will be happy with your Bedkingdom purchases, but if
            you do change your mind and wish to return a purchased item(s) then
            the following procedure will apply:
          </p>
          <div className="mb-2 mt-4 block">
            <p>
              1. Complete the Optional returns form above or any other durable
              medium
            </p>
            <p>
              2. You will then receive a confirmation reponse within 48 working
              hours
            </p>
            <p>
              3. Provided the return is approved, you will receive an email
              outlining charges and the amount to be refunded
            </p>
            <p>
              4. If collection is required, we will call or email you to arrange
              a convenient collection date
            </p>
            <p>
              5. Once the item(s) are back in our possession, they will be
              inspected
            </p>
            <p>
              6. Provided the inspection is successful, a refund will be issued
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              in accordance with our T&C's
            </p>
            <p>
              7. You may be required to provide card or bank details for us to
              recredit the refund
            </p>
            <p>
              8. Your refund will take between 3 - 10 working days to process,
              subject to your card type
            </p>
          </div>
          <div className="mt-3">
            Please ensure that you have read our returns policy before
            submitting the completed form. If you require any help or have any
            questions regarding this procedure, please do not hesitate to email
            us direct at Support@bedkingdom.co.uk
          </div>
          <p className="mb-2 mt-4 block text-16px">
            <strong>Return Charges</strong>
          </p>
          <strong>Collection Fees:</strong>
          <p>
            If you require us to collect your item, then a collection surcharge
            will also be applied to the refund. The cost of this depends on the
            item(s) to be returned and also the location that they are being
            collected from.
          </p>
          <br />
          <p>
            If you have any questions regarding our return charges, please email
            our Returns Team. Alternatively, please do not hesitate to call us
            direct and a member of our customer service team will be more than
            happy to help.
          </p>
          <br />
          <p className="mb-2 block text-16px">
            <strong>Items Faulty Within Warranty Period</strong>
          </p>
          <p>
            Most of our products come with a standard 12 month manufacturers
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            warranty, each with their own T&C's included. If any item(s) that
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            you have purchased develop a fault, and it's more than 28 working
            days since you received them, then provided your item(s) are within
            their warranty period, you will be entitled to a warranty repair.
          </p>
          <p>
            In certain cases, manufacturers will need to provide a specialist
            on-site inspection of the damaged item(s) in order to ascertain the
            fault. Failure to accept the inspection will result in the return
            being refused.
          </p>
          <p className="mb-2 block text-16px">
            <strong>Tracking Your Return</strong>
          </p>
          <p>
            If you need to track your return request, please email our returns
            team quoting your full name, contact details and order number.
            Alternatively, please call us and a member of staff will happily
            check the progress of your return request. Please note that whilst
            every effort is made to process the request as quickly as possible,
            it can take up to 48 working hours
          </p>
          <p className="mb-2 block text-16px">
            <strong>Tracking Your Return</strong>
          </p>
          <p>
            Goods must be returned in an as new condition if items have been
            assembled or modified in any way we will be unable to accept the
            return. If an item is made to order or a product that has been used
            or opened such as a{' '}
            <a
              className="mst_seo_autolink autolink"
              href="https://www.bedkingdom.co.uk/mattresses.html"
              title="mattress"
              target="_self"
            >
              mattress
            </a>{' '}
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            or pillow this can't be returned for health and hygiene reasons. If
            when goods are inspected we find any of the above has been breached
            we will return the item to you at your expense and no refund will be
            given. If the item is returned to us in accordance with our terms
            and conditions a refund will be provided minus the charges listed
            above.
          </p>
        </div>
      </div>
    </section>
  );
});

export default Returns;
