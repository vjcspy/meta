import { withBedKingdomContactActions } from '@extensions/bed-kingdom/hoc/common/withBedKingdomContactActions';
import { combineHOC } from '@web/ui-extension';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const Contact = combineHOC(withBedKingdomContactActions)((props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback((data: any) => {
    const objectData: any = {};
    objectData['form_key'] = 'mJok9O3vqqDZeMXd';
    objectData['name'] = data?.name;
    objectData['email'] = data?.email;
    objectData['telephone'] = data?.telephone;
    objectData['comment'] = data?.comment;
    objectData['hideit'] = '';
    if (
      typeof props.actions?.contactSubmit === 'function' &&
      JSON.stringify(objectData)
    ) {
      props.actions.contactSubmit(JSON.stringify(objectData));
    }
  }, []);
  return (
    <section className="b-cms-contact container-1200 container mx-auto px-4">
      <h1 className="b-page-title mb-8 mt-3 text-2xl md:text-3xl">
        <span>Contact Us</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="b-page-content">
            <p className="mb-4">
              Jot us a note and we’ll get back to you as quickly as possible.
            </p>
            <div className="form-input required mb-3">
              <label className="label mb-2 block font-bold" htmlFor="Name">
                <span>Name</span>
              </label>
              <div className="control">
                <input
                  type="text"
                  title="Name"
                  className="input-text h-40px w-full "
                  {...register('name', {
                    required: true,
                  })}
                />
              </div>
              {errors.name && (
                <span className="mt-2 text-red-700">
                  This is a required field.
                </span>
              )}
            </div>
            <div className="form-input required mb-3">
              <label className="label mb-2 block font-bold" htmlFor="Name">
                <span>Email</span>
              </label>
              <div className="control">
                <input
                  type="text"
                  {...register('email', {
                    required: true,
                    pattern: new RegExp(
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
                    ),
                  })}
                  className="input-text h-40px w-full "
                />
              </div>
              {errors.name && (
                <span className="mt-2 text-red-700">
                  Please enter the correct email.
                </span>
              )}
            </div>
            <div className="form-input mb-3">
              <label
                className="label mb-2 block font-bold"
                htmlFor="Phone Number"
              >
                <span>Phone Number</span>
              </label>
              <div className="control">
                <input type="number" className="input-text h-40px w-full " />
              </div>
            </div>
            <div className="form-input required mb-3">
              <label
                className="label mb-2 block font-bold"
                htmlFor="What’s on your mind?"
              >
                <span>What’s on your mind?</span>
              </label>
              <div className="control">
                <textarea
                  {...register('comment', {
                    required: true,
                  })}
                  title="What’s on your mind?"
                  className="input-text min-h-92 w-full"
                  cols={5}
                  rows={3}
                  maxLength={200}
                />
              </div>
              {errors.comment && (
                <span className="mt-2 text-red-700">
                  This is a required field.
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-default px-5 text-sm"
              disabled={props?.state?.statusButton}
            >
              Submit
            </button>
          </div>
        </form>
        <div className="b-page-address">
          <div className="shop-address mb-5">
            <h2 className="mb-4 block text-2xl font-bold">Customer Service:</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <dl className="left">
                <dt>
                  <strong className="mb-2 block">Telephone:</strong>
                </dt>
                <dd>01924950108</dd>
                <dt className="mt-2 block">
                  <strong className="mb-2 block">Email Address:</strong>
                </dt>
                <dd>
                  <a href="mailto:support@bedkingdom.co.uk">
                    support@bedkingdom.co.uk
                  </a>
                </dd>
              </dl>
              <dl className="right">
                <dt>
                  <strong className="mb-2 block">Response Time:</strong>
                </dt>
                <dd>Within 1 Working Day</dd>
              </dl>
            </div>
          </div>
          <div className="shop-address">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <strong className="mb-2 block">
                  Returns and Postal Address:
                </strong>
                <p>
                  Please send all customer returns to the following address. If
                  you would like further information, please refer to our{' '}
                  <a
                    title="Terms of Sale"
                    href="https://admin.magedemo.co.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    terms of sale
                  </a>
                  .
                </p>
              </div>
              <div>
                <strong className="mb-2 block">Address:</strong>
                Bedkingdom
                <br />
                Old Delivery Office
                <br /> Oldfield Lane <br /> Heckmondwike
                <br /> West Yorkshire
                <br /> WF16 0JD
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 mb-8 grid grid-cols-1 border-t border-color-ccc pt-14 md:grid-cols-2 md:gap-10">
        <div>
          <div className="shop-address mb-4">
            <h2 className="mb-2 block text-2xl font-bold">
              Returns and Postal Address:
            </h2>
            <p>
              Please send all customer returns to the following address. If you
              would like further information, please refer to our
              <a
                title="Terms of Sale"
                href="https://admin.magedemo.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms of sale.
              </a>
            </p>
            <div>
              <strong>Address:</strong>
            </div>
            Bedkingdom
            <br />
            Old Delivery Office
            <br /> Oldfield Lane <br /> Heckmondwike
            <br /> West Yorkshire
            <br /> WF16 0JD
          </div>
          <div className="shop-address">
            <div className="shop-details">
              <h2 className="mb-2 block text-2xl font-bold">Our Showroom:</h2>
              <div>
                <strong>Address:</strong>
                <div>
                  Bedkingdom
                  <br />
                  Old Delivery Office
                  <br /> Oldfield Lane <br /> Heckmondwike
                  <br /> West Yorkshire
                  <br /> WF16 0JD
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <iframe
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2361.6535559545227!2d-1.6735645000000041!3d53.706618800000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bdfebac07df8f%3A0x97b47a89553be96d!2sHeckmondwike+Delivery+Office%2C+Oldfield+Ln%2C+Heckmondwike%2C+West+Yorkshire+WF16+0AA!5e0!3m2!1sen!2suk!4v1407864943273"
            width="700"
            height="250"
            frameBorder="0"
          />
        </div>
      </div>
    </section>
  );
});

export default Contact;
