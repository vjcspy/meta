import { useExtAdditionConfig } from '@modules/ui/hook/config/useExtAdditionConfig';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const ComplaintInformation = combineHOC()((props) => {
  const formId = useExtAdditionConfig('form_id', props);
  return (
    <section className="b-cms-contact container container-1200 mx-auto px-4">
      <h1 className="b-page-title text-2xl md:text-3xl mb-8 mt-3">
        <span>Complaint Information</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mb-5">
        <div className="b-page-content">
          <strong className="text-16px block mb-3">
            Complaints Information
          </strong>
          <p className="block mb-3">
            If you would like to submit a complaint to our customer service
            team, please fill out the form below. Please include as much
            information as possible as this will help us to process your
            complaint quickly. Alternatively, please write to us at the address
            listed below.
          </p>

          <UiExtension uiId="CUSTOM_FORM" formId={formId} />

          {/*<div className="form-input required mb-3">*/}
          {/*  <label className="label font-bold mb-2 block" htmlFor="Name">*/}
          {/*    <span>Type Of Complaint</span>*/}
          {/*  </label>*/}
          {/*  <div className="control">*/}
          {/*    <select className="input-text w-full h-40px ">*/}
          {/*      <option value="option-1">*/}
          {/*        I have had an issue with delivery*/}
          {/*      </option>*/}
          {/*      <option value="option-2">*/}
          {/*        I am unhappy with the service I have received*/}
          {/*      </option>*/}
          {/*      <option value="option-3">*/}
          {/*        A member of staff has been unprofessional*/}
          {/*      </option>*/}
          {/*    </select>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="form-input required mb-3">*/}
          {/*  <label className="label font-bold mb-2 block" htmlFor="Name">*/}
          {/*    <span>Order Number</span>*/}
          {/*  </label>*/}
          {/*  <div className="control">*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      name="Order Number *"*/}
          {/*      className="input-text w-full h-40px "*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="form-input required mb-3">*/}
          {/*  <label*/}
          {/*    className="label font-bold mb-2 block"*/}
          {/*    htmlFor="Phone Number"*/}
          {/*  >*/}
          {/*    <span>Name</span>*/}
          {/*  </label>*/}
          {/*  <div className="control">*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      name="Phone Number"*/}
          {/*      className="input-text w-full h-40px "*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="form-input required mb-3">*/}
          {/*  <label*/}
          {/*    className="label font-bold mb-2 block"*/}
          {/*    htmlFor="Email Address *"*/}
          {/*  >*/}
          {/*    <span>Email Address</span>*/}
          {/*  </label>*/}
          {/*  <div className="control">*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      name="Email Address"*/}
          {/*      className="input-text w-full h-40px "*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="form-input required mb-3">*/}
          {/*  <label*/}
          {/*    className="label font-bold mb-2 block"*/}
          {/*    htmlFor="Telephone Number *"*/}
          {/*  >*/}
          {/*    <span>Telephone Number</span>*/}
          {/*  </label>*/}
          {/*  <div className="control">*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      name="Telephone Number"*/}
          {/*      className="input-text w-full h-40px max-w-125"*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="form-input required mb-5">*/}
          {/*  <label className="label font-bold mb-2 block" htmlFor="Comments *">*/}
          {/*    <span>Comments</span>*/}
          {/*  </label>*/}
          {/*  <div className="control">*/}
          {/*    <textarea*/}
          {/*      name="Comments"*/}
          {/*      className="input-text input-text w-full min-h-92"*/}
          {/*      cols={5}*/}
          {/*      rows={3}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<button type="button" className="btn btn-default pl-5 pr-5 text-sm">*/}
          {/*  Submit*/}
          {/*</button>*/}
        </div>
        <div className="b-page-address">
          <p className="mb-2 block text-16px">
            <strong>Write To Us</strong>
          </p>
          <p>
            If you need to write to us for any reason, please send any
            correspondance to our head office address listed below
          </p>
          <p className="mb-2 mt-4 block">
            <strong className="mb-2 block text-16px">
              Flair Furniture Ltd
              <br />
            </strong>
            Bedkingdom
            <br />
            Old Delivery Office
            <br />
            Oldfield Lane&nbsp;
            <br />
            Heckmondwike
            <br />
            West Yorkshire
            <br />
            WF16 0AA
          </p>
          <p>
            We always recommend that any letters are sent via recorded mail for
            piece of mind. Once received, we aim to respond within 48 working
            hours
          </p>
          <p>
            Thanks
            <br />
            <a
              className="mst_seo_autolink autolink"
              href="https://www.bedkingdom.co.uk/"
              target="_self"
            >
              Bedkingdom.co.uk
            </a>
            <br />
            Complaints Team
          </p>
        </div>
      </div>
    </section>
  );
});

export default ComplaintInformation;
