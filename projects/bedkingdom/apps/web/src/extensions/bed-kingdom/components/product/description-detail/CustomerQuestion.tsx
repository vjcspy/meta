import { withBedkingdomCustomerQuestion } from '@extensions/bed-kingdom/hoc/product/withBedkingdomCustomerQuestion';
import { withOnlyCurrentProductState } from '@extensions/bed-kingdom/hoc/product/withOnlyCurrentProductState';
import { combineHOC } from '@web/ui-extension';
import React, { useCallback, useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { useForm } from 'react-hook-form';

const CustomerQuestion = combineHOC(
  withOnlyCurrentProductState,
  withBedkingdomCustomerQuestion
)(
  React.memo((props) => {
    const [showQuestion, setShowQuestion] = useState(false);
    const [showFormQuestion, setShowFormQuestion] = useState(false);
    const [isCheckedNotification, setIsCheckedNotification] = useState(false);
    const {
      handleSubmit,
      register,
      unregister,
      setValue,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      if (isCheckedNotification) {
        register('email', { required: true });
      } else {
        unregister('email');
      }
    }, [isCheckedNotification]);

    const handleSubmitQuestion = useCallback((data: any) => {
      const input = {
        email: data?.email || '',
        name: data?.nameUser,
        notification: isCheckedNotification,
        product_ids: props?.productId,
        title: data?.question,
        category_ids: '',
      };
      if (props.actions?.addQuestionForProduct) {
        props.actions?.addQuestionForProduct(input);
        setShowFormQuestion(false);
      }
    }, []);

    return (
      <div className="b-product-info b-info-customer-question cursor-pointer">
        <div
          className="b-info-label flex items-center justify-between"
          onClick={() => {
            setShowQuestion(!showQuestion);
          }}
        >
          Customer Question
          {props.dataProductQuestions?.total &&
            `(${props.dataProductQuestions?.total})`}
          {showQuestion ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="16px"
            >
              <rect height="64" width="384" x="64" y="224" />
            </svg>
          ) : (
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16px"
              height="16px"
            >
              <path
                fillRule="evenodd"
                d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
              />
            </svg>
          )}
        </div>
        {showQuestion && (
          <>
            {props.dataProductQuestions?.questions &&
            props.dataProductQuestions?.questions?.length > 0 ? (
              <div className="b-info-content active">
                {props.dataProductQuestions?.questions.map((item: any) => (
                  <Collapsible
                    trigger={item?.title || ''}
                    triggerStyle={null}
                    key={JSON.stringify(item?.question_id)}
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.answer || '',
                      }}
                    />
                    <div className="am-links">
                      <a
                        href={item?.question_link || ''}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read More
                      </a>
                    </div>
                  </Collapsible>
                ))}
              </div>
            ) : (
              <div className="b-info-content active">
                <h2 className="button-info  mb-3">
                  <strong>No Questions</strong>
                </h2>
              </div>
            )}
          </>
        )}
        {showQuestion && (
          <>
            <div className={`b-info-content ${showQuestion && 'active'}`}>
              <div className="ask-question-form widget">
                <h2 className="button-info  mb-3">
                  <strong>Did you find what you were looking for?</strong>
                </h2>
                <button
                  type="button"
                  title="Ask a Question"
                  className="btn-default action border-0 px-3"
                  onClick={() => {
                    setShowFormQuestion(!showFormQuestion);
                  }}
                >
                  {showFormQuestion ? 'Hide form' : 'Ask a Question'}
                </button>
                <div className={`fieldset ${showFormQuestion && 'active'}`}>
                  <form onSubmit={handleSubmit(handleSubmitQuestion)}>
                    <div className="field required">
                      <label className="label" htmlFor="amfaq-title">
                        Your question:
                      </label>
                      <div className="control">
                        <textarea
                          title="Question"
                          className="required-entry input-text"
                          // cols="5"
                          // rows="3"
                          placeholder="Type your question here..."
                          // type="text"
                          {...register('question', {
                            required: true,
                          })}
                        />
                        {errors.question && (
                          <span className="mt-2 text-red-700">
                            This is a required field.
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="amfaq-name">
                        Your name:
                      </label>
                      <div className="control">
                        <input
                          // name="nameUser"
                          id="nameUser"
                          {...register('nameUser')}
                          className="input-text"
                          title="Name"
                          type="text"
                        />
                      </div>
                    </div>

                    <div
                      className={`field email-field required ${
                        !isCheckedNotification && 'd-none'
                      }`}
                    >
                      <label className="label required" htmlFor="amfaq-email">
                        Your e-mail:
                      </label>
                      <div className="control">
                        <input
                          name="email"
                          id="email"
                          className="required validate-email"
                          title="Email"
                          type="email"
                          onChange={(e) => {
                            setValue('email', e.target.value);
                          }}
                        />
                        {errors.email && (
                          <span className="mt-2 text-red-700">
                            This is a required field.
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="field my-2">
                      <label
                        className="label pl-0"
                        htmlFor="amfaq-notification"
                      >
                        <input
                          type="checkbox"
                          name="notification"
                          id="notification"
                          title="Notification"
                          checked={isCheckedNotification}
                          onChange={() => {
                            setIsCheckedNotification(!isCheckedNotification);
                          }}
                        />
                        <span className="d-inline-block pl-2">
                          Get notification on email when the answer is ready
                        </span>
                      </label>
                    </div>
                    <>
                      <button
                        type="submit"
                        className="btn-default submit border-none px-3"
                      >
                        Send the Question
                      </button>
                    </>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  })
);

export default CustomerQuestion;
