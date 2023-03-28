import { withSubscriberNewsletterActions } from '@modules/account/hoc/withSubscriberNewsletterActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const SubscriberContent: React.FC = combineHOC(withSubscriberNewsletterActions)(
  React.memo((props) => {
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const onSubmit = useCallback((data: any) => {
      if (typeof props.actions?.subscribeEmailToNewsletter === 'function') {
        props.actions.subscribeEmailToNewsletter(data.requiredEmail);
      }
    }, []);

    return (
      <>
        <section className="b-section__newleter">
          <div className="container mx-auto md:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 row-roleBestReview">
              <div className="b-bestReviews">
                <div className="b-bestReviews_wrap md:flex">
                  <div className="b-bestReviews__intro">
                    <h3 className="b-bestReviews__introTitle">
                      Trust the best of the best
                    </h3>
                    <p className="b-bestReviews__introDesc">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Bedkingdom.co.uk Is the UK's Leading online retailer of
                      Bedroom Furniture products. Our personal service and
                      expert advice ensures our customers needs are satisfied
                      from the order through to delivery.
                    </p>
                  </div>
                  <div className="b-bestReviews__image">
                    <UiExtension uiId="BEDKINGDOM_TRUST_PILOT_START_AND_REVIEW" />
                  </div>
                </div>
              </div>
              <div className="b-subscribe">
                <h2 className="b-subscribe__title">
                  Subscribe for early access to our discounts and best offers
                </h2>
                <p className="b-subscribe__subtitle">
                  Sign up and receive 10% off full priced items*
                </p>
                <form
                  className="b-form-input flex flex-wrap"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="b-input">
                    <label htmlFor="inputEmail" className="mb-10" />
                    <div className="p-inputForm">
                      <input
                        {...register('requiredEmail', {
                          required: true,
                          pattern: new RegExp(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
                          ),
                        })}
                        placeholder="Enter your mail..."
                        name="requiredEmail"
                        maxLength={50}
                      />
                      {/* errors will return when field validation fails  */}
                      {errors.requiredEmail && (
                        <span className="mt-2 text-red-700">
                          Please enter the correct email
                        </span>
                      )}
                      {props.states?.statusSubscriber &&
                        !errors.requiredEmail && (
                          <span className="mt-2 text-green-700">
                            {props.states?.statusSubscriber}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="b-actions">
                    <button
                      type="submit"
                      className={clsx(
                        'b-blockBtn--action p__btn-loading p-btn p-btn__blue w-100 d-block text-white d-flex align-items-center justify-content-center font-weight-bold position-relative border-none',
                        props?.states?.statusButton &&
                          'btn-loader btn-loader-active'
                      )}
                      onClick={() =>
                        props.actions.setStatusSubscriber &&
                        props.actions.setStatusSubscriber(false)
                      }
                    >
                      <span
                        className={clsx(
                          props?.states?.statusButton && 'loader'
                        )}
                      />
                      Subscribe
                    </button>
                  </div>
                </form>
                <p className="b-subscribe__label">
                  We promise, no spam, Our best offers only.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  })
);

export default SubscriberContent;
