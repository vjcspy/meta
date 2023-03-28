import { bootBedKingdom } from '@extensions/bed-kingdom/bootstrap';
import { fetchGraphql } from '@modules/core/util/fetchGraphql';
import { bootUiModule } from '@modules/ui/boot';
import { UiExtension } from '@web/ui-extension';
import type { GetStaticProps, NextPage } from 'next';
import React from 'react';

bootUiModule();
bootBedKingdom();

const HomeSeo: NextPage = (props: any) => {
  return (
    <>
      <section className="b-heading__shipping">
        <span className="b-heading__text">
          Welcome to BedKingdom. Get free shipping on all orders with code
          FREESHIP. See terms
        </span>
      </section>
      <header>
        {/*HEADER*/}
        <div className="b-header-center py-4">
          <UiExtension uiId="ONLY_DESKTOP">
            <div className="container mx-auto md:px-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="b-block-left flex items-center justify-between">
                  <div className="b-header-logo mr-11">
                    <img
                      src="https://www.bedkingdom.co.uk/media/logo/stores/2/logo.png"
                      alt=""
                      width="193"
                      height="75"
                    />
                  </div>
                  <div className="b-search relative w-3/4">
                    <div
                      className="form-search active relative w-full"
                      id="search_mini_form"
                    >
                      <div className="field search">
                        <input
                          id="search"
                          type="text"
                          placeholder="Search here..."
                          autoComplete="off"
                          className="input-text"
                        />
                        <button
                          type="button"
                          title="Search"
                          className="action-search"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="b-block-right flex items-center justify-end">
                  <div className="b-help-wrap hidden items-center lg:flex">
                    <div className="need_help_icon mr-2">
                      <svg
                        width={30}
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 422.139 422.139"
                        xmlSpace="preserve"
                      >
                        <g>
                          <g>
                            <path d="M363.631,174.498h-1.045v-25.6C362.586,66.664,295.923,0,213.688,0S64.79,66.664,64.79,148.898v25.6h-6.269 c-22.988,0-40.751,20.375-40.751,43.886v65.306c-0.579,22.787,17.425,41.729,40.212,42.308c0.18,0.005,0.359,0.008,0.539,0.01 h38.661c5.476-0.257,9.707-4.906,9.449-10.382c-0.009-0.197-0.024-0.394-0.045-0.59v-128c0-6.269-3.657-12.539-9.404-12.539 H85.688v-25.6c0-70.692,57.308-128,128-128s128,57.308,128,128v25.6h-11.494c-5.747,0-9.404,6.269-9.404,12.539v128 c-0.583,5.451,3.363,10.343,8.814,10.926c0.196,0.021,0.393,0.036,0.59,0.045h12.016l-1.045,1.567 c-15.677,20.835-40.277,33.038-66.351,32.914c-5.708-27.989-33.026-46.052-61.015-40.343 c-23.935,4.881-41.192,25.843-41.385,50.27c0.286,28.65,23.594,51.724,52.245,51.722c14.183-0.23,27.702-6.05,37.616-16.196 c6.689-6.85,11.072-15.617,12.539-25.078c32.652,0.124,63.445-15.176,83.069-41.273l9.927-14.629 c22.465-1.567,36.571-15.673,36.571-36.049v-65.306C404.382,201.143,387.664,174.498,363.631,174.498z M85.688,305.11H58.521 c-11.25-0.274-20.148-9.615-19.874-20.865c0.005-0.185,0.012-0.37,0.021-0.556v-65.306c0-12.016,8.359-22.988,19.853-22.988 h27.167V305.11z M247.125,391.314c-5.79,6.278-13.925,9.873-22.465,9.927c-16.998-0.27-30.792-13.834-31.347-30.825 c-0.007-17.024,13.788-30.83,30.812-30.837c17.024-0.007,30.83,13.788,30.837,30.812c0,0.008,0,0.017,0,0.025 C255.397,378.173,252.553,385.756,247.125,391.314z M383.484,288.914c0,14.106-13.584,16.196-19.853,16.196h-21.943V195.396 h21.943c11.494,0,19.853,16.196,19.853,28.212V288.914z" />
                          </g>
                        </g>
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                      </svg>
                    </div>
                    <div className="need_help_info text-sm">
                      <p>Need Help? Call us</p>
                      <strong className="text-base">
                        <a href="tel:0-192-495-0108">01924 950108</a>
                      </strong>
                    </div>
                  </div>
                  <div className="b-myAccount ml-8 flex items-center">
                    <span className="b-myAccount-icon mr-2">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="#000000"
                          d="M9.5 11c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zM9.5 1c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5z"
                        />
                        <path
                          fill="#000000"
                          d="M17.5 20h-16c-0.827 0-1.5-0.673-1.5-1.5 0-0.068 0.014-1.685 1.225-3.3 0.705-0.94 1.67-1.687 2.869-2.219 1.464-0.651 3.283-0.981 5.406-0.981s3.942 0.33 5.406 0.981c1.199 0.533 2.164 1.279 2.869 2.219 1.211 1.615 1.225 3.232 1.225 3.3 0 0.827-0.673 1.5-1.5 1.5zM9.5 13c-3.487 0-6.060 0.953-7.441 2.756-1.035 1.351-1.058 2.732-1.059 2.746 0 0.274 0.224 0.498 0.5 0.498h16c0.276 0 0.5-0.224 0.5-0.5-0-0.012-0.023-1.393-1.059-2.744-1.382-1.803-3.955-2.756-7.441-2.756z"
                        />
                      </svg>
                    </span>
                    <div>
                      <ul className="b-myAccount__links flex cursor-pointer text-sm">
                        <li>
                          <div>Login</div>
                        </li>
                        <li>
                          <div>/Register</div>
                        </li>
                      </ul>
                      <div className="b-myAccount__label">
                        <span title="account" className="active">
                          <strong>
                            My Account <i className="fa fa-angle-down" />
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="b-miniCart relative">
                    <div className="b-miniCart-wrapper ml-8 flex items-center">
                      <div className="b-miniCart__icon mr-2">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width={32}
                          height={32}
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#000000"
                            d="M8 20c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2zM8 17c-0.551 0-1 0.449-1 1s0.449 1 1 1 1-0.449 1-1-0.449-1-1-1z"
                          />
                          <path
                            fill="#000000"
                            d="M15 20c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2zM15 17c-0.551 0-1 0.449-1 1s0.449 1 1 1 1-0.449 1-1-0.449-1-1-1z"
                          />
                          <path
                            fill="#000000"
                            d="M17.539 4.467c-0.251-0.297-0.63-0.467-1.039-0.467h-12.243l-0.099-0.596c-0.131-0.787-0.859-1.404-1.658-1.404h-1c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h1c0.307 0 0.621 0.266 0.671 0.569l1.671 10.027c0.131 0.787 0.859 1.404 1.658 1.404h10c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-10c-0.307 0-0.621-0.266-0.671-0.569l-0.247-1.48 9.965-0.867c0.775-0.067 1.483-0.721 1.611-1.489l0.671-4.027c0.067-0.404-0.038-0.806-0.289-1.102zM16.842 5.404l-0.671 4.027c-0.053 0.316-0.391 0.629-0.711 0.657l-10.043 0.873-0.994-5.962h12.076c0.117 0 0.215 0.040 0.276 0.113s0.085 0.176 0.066 0.291z"
                          />
                        </svg>
                      </div>
                      <div className="text-base">
                        <div className="b-miniCart__label ">MyBasket</div>
                        <div className="b-miniCart__price font-bold">£0.00</div>
                        <div className="b-miniCart__qty absolute text-xs">
                          0
                        </div>
                      </div>
                      {/*add class is_active show dropdown cart*/}
                      <div className="b-miniCart__dropdown fixed right-0 top-0 z-99 m-0 bg-white">
                        <div className="b-miniCart-content-wrapper">
                          <div className="b-block-title flex items-center justify-between">
                            <strong>
                              <span className="text">
                                Your{' '}
                                <span className="text-main-2362AA">Basket</span>
                              </span>
                            </strong>
                            <div className="miniCart-close cursor-pointer">
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill="#000000"
                                  d="M10.707 10.5l5.646-5.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-5.646 5.646-5.646-5.646c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5.646 5.646-5.646 5.646c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l5.646-5.646 5.646 5.646c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146c0.195-0.195 0.195-0.512 0-0.707l-5.646-5.646z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="b-block-content">
                            <div className="b-miniCart-items-wrapper">
                              <div className="b-miniCart-items">
                                <div className="product-item">
                                  <div className="product-item__inner relative flex">
                                    <a className="product-item__photo" href="#">
                                      <span className="product-item__image">
                                        <img
                                          className="product-image-photo"
                                          src="https://admin.magedemo.co.uk/media/catalog/product/cache/9dc93379ac63fcdae37d5f3cbad858e8/f/l/flair-furnishings-metal-bed-frame-black-1.jpg"
                                          alt="Flair Compton Black Metal Bed Frame"
                                          loading="lazy"
                                        />
                                      </span>
                                    </a>
                                    <div className="product-item__details">
                                      <strong className="product-item-name text-13px text-color-222">
                                        <a href="#">
                                          Flair Compton Black Metal Bed Frame
                                        </a>
                                      </strong>
                                      <div className="product-options text-13px text-color-999">
                                        <span className="product-options__toggle cursor-pointer">
                                          <span>See Details</span>
                                          <span className="product-options__arrow">
                                            <i className="fa fa-angle-down" />
                                          </span>
                                        </span>
                                        {/*click see details remove class hidden ben duoi*/}
                                        <div className="content-options hidden">
                                          <div className="product-options__list">
                                            <div className="label font-bold text-color-222">
                                              Size
                                            </div>
                                            <div className="values">
                                              <span>Single</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="content-options hidden">
                                          <div className="product-options__list">
                                            <div className="label font-bold text-color-222">
                                              Delivery date
                                            </div>
                                            <div className="values">
                                              <span>
                                                Jun 03, 2021 | Thursday
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-item__pricing">
                                        <div className="price-container">
                                          <span className="price-wrapper">
                                            <span className="price-including-tax">
                                              <span className="miniCart-price">
                                                <span className="price text-16px font-bold text-color-2362AA">
                                                  £99.99
                                                </span>
                                              </span>
                                            </span>
                                          </span>
                                          <span className="price-wrapper">
                                            <span className="price-including-tax">
                                              <span className="miniCart-price">
                                                <span className="price-old text-color-999">
                                                  £199.99
                                                </span>
                                              </span>
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="product-item__action absolute">
                                      <a
                                        className="action delete block"
                                        title="Remove item"
                                        href="#"
                                      >
                                        <span>
                                          <svg
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fill="#000000"
                                              d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z"
                                            />
                                            <path
                                              fill="#000000"
                                              d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"
                                            />
                                            <path
                                              fill="#000000"
                                              d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"
                                            />
                                            <path
                                              fill="#000000"
                                              d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"
                                            />
                                          </svg>
                                        </span>
                                      </a>
                                      <a
                                        className="action edit"
                                        href="https://www.bedkingdom.co.uk/checkout/cart/configure/id/729657/product_id/60274/"
                                        title="Edit item"
                                      >
                                        <span>
                                          <svg
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fill="#000000"
                                              d="M19.104 0.896c-0.562-0.562-1.309-0.871-2.104-0.871s-1.542 0.309-2.104 0.871l-12.75 12.75c-0.052 0.052-0.091 0.114-0.116 0.183l-2 5.5c-0.066 0.183-0.021 0.387 0.116 0.524 0.095 0.095 0.223 0.146 0.354 0.146 0.057 0 0.115-0.010 0.171-0.030l5.5-2c0.069-0.025 0.131-0.065 0.183-0.116l12.75-12.75c0.562-0.562 0.871-1.309 0.871-2.104s-0.309-1.542-0.871-2.104zM5.725 17.068l-4.389 1.596 1.596-4.389 11.068-11.068 2.793 2.793-11.068 11.068zM18.396 4.396l-0.896 0.896-2.793-2.793 0.896-0.896c0.373-0.373 0.869-0.578 1.396-0.578s1.023 0.205 1.396 0.578c0.373 0.373 0.578 0.869 0.578 1.396s-0.205 1.023-0.578 1.396z"
                                            />
                                          </svg>
                                        </span>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="product-item__bottom">
                                    <div className="flex items-center justify-between">
                                      <div className="b-product__qty">
                                        <div className="b-qty__group">
                                          <div className="b-buttons__added flex items-center justify-between">
                                            <span className="b-btn minus flex items-center justify-between">
                                              <svg
                                                width="2em"
                                                height="2em"
                                                viewBox="0 0 16 16"
                                                className="bi bi-dash"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                                                />
                                              </svg>
                                            </span>
                                            <span className="b-qty__number text-center text-16px">
                                              7
                                            </span>
                                            <span className="b-btn plus flex items-center justify-between">
                                              <svg
                                                width="2em"
                                                height="2em"
                                                viewBox="0 0 16 16"
                                                className="bi bi-plus"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                                                />
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="product-item__sum">
                                        <span className="text-blue text-16px font-bold text-color-2362AA">
                                          £1,166.62
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="b-miniCart-items__bottom absolute bottom-0 w-full bg-white pt-3">
                              <div className="product-item__subtotal">
                                <div className="flex items-center justify-between">
                                  <span className="label text-18px font-bold mdm:text-16px">
                                    <span>Basket Subtotal</span>
                                  </span>
                                  <div className="total-amount text-20px mdm:text-18px">
                                    <span className="price-wrapper">
                                      <span className="price font-bold text-main-2361aa">
                                        £1,399.93
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="product-item__checkout grid grid-cols-2 gap-3">
                                <a
                                  className="action viewCart flex h-44 items-center justify-center rounded-100px bg-main-2361aa text-16px font-bold text-white mdm:text-14px"
                                  href="#"
                                >
                                  <span>View Basket</span>
                                  <span className="qty absolute flex items-center justify-center rounded-100 text-13px">
                                    7
                                  </span>
                                </a>
                                <a
                                  className="action checkout flex h-44 items-center justify-center rounded-100px text-16px font-bold text-white mdm:text-14px"
                                  href="#"
                                >
                                  <span>Checkout</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*add class is_active khi show downdown cart*/}
                      <div className="b-mob-screen invisible fixed top-0 left-0 -z-1 h-100% w-100% bg-black bg-opacity-40 opacity-0 transition duration-500 ease-in-out">
                        &nbsp;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UiExtension>

          <UiExtension uiId="ONLY_MOBILE">
            <div className="container mx-auto">
              <div className="header-mb grid grid-cols-3 items-center gap-3">
                <div className="block-left">
                  <div className="block-left__wrap flex items-center">
                    <div className="b-menu_btn mr-1">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="#000000"
                          d="M17.5 6h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
                        />
                        <path
                          fill="#000000"
                          d="M17.5 11h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
                        />
                        <path
                          fill="#000000"
                          d="M17.5 16h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
                        />
                      </svg>
                    </div>
                    <div className="b-search__btn pl-3">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="#000000"
                          d="M18.869 19.162l-5.943-6.484c1.339-1.401 2.075-3.233 2.075-5.178 0-2.003-0.78-3.887-2.197-5.303s-3.3-2.197-5.303-2.197-3.887 0.78-5.303 2.197-2.197 3.3-2.197 5.303 0.78 3.887 2.197 5.303 3.3 2.197 5.303 2.197c1.726 0 3.362-0.579 4.688-1.645l5.943 6.483c0.099 0.108 0.233 0.162 0.369 0.162 0.121 0 0.242-0.043 0.338-0.131 0.204-0.187 0.217-0.503 0.031-0.706zM1 7.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5-6.5-2.916-6.5-6.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="b-search">
                    <div className="form miniSearch">
                      <div className="field search">
                        <input
                          id="search"
                          type="text"
                          placeholder="Search here..."
                          autoComplete="off"
                          className="input-text"
                        />
                        <button
                          type="button"
                          title="Search"
                          className="action-search"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z" />
                          </svg>
                        </button>
                      </div>
                      <span className="search-cancel">Cancel</span>
                    </div>
                    <div className="b-searchautocomplete__wrapper false">
                      <ul className="b-searchautocomplete__suggestText">
                        <li className="is_active">
                          <div>Ottoman</div>
                        </li>
                        <li className="is_active">
                          <div>bunk beds</div>
                        </li>
                        <li className="is_active">
                          <div>high sleeper</div>
                        </li>
                        <li className="is_active">
                          <div>Ottoman bed</div>
                        </li>
                        <li className="is_active">
                          <div>Mid sleeper</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="block-logo">
                  <div className="b-logo m-auto">
                    <a href="/">
                      <img
                        loading="lazy"
                        src="data:image/png;base64,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"
                        alt="Bedkingdom"
                        width="125px"
                        height="45px"
                      />
                    </a>
                  </div>
                </div>
                <div className="block-right">
                  <div className="block-right__wrap flex items-center justify-end">
                    <div className="b-myAccount__mb mr-3">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="#000000"
                          d="M9.5 11c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zM9.5 1c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5z"
                        />
                        <path
                          fill="#000000"
                          d="M17.5 20h-16c-0.827 0-1.5-0.673-1.5-1.5 0-0.068 0.014-1.685 1.225-3.3 0.705-0.94 1.67-1.687 2.869-2.219 1.464-0.651 3.283-0.981 5.406-0.981s3.942 0.33 5.406 0.981c1.199 0.533 2.164 1.279 2.869 2.219 1.211 1.615 1.225 3.232 1.225 3.3 0 0.827-0.673 1.5-1.5 1.5zM9.5 13c-3.487 0-6.060 0.953-7.441 2.756-1.035 1.351-1.058 2.732-1.059 2.746 0 0.274 0.224 0.498 0.5 0.498h16c0.276 0 0.5-0.224 0.5-0.5-0-0.012-0.023-1.393-1.059-2.744-1.382-1.803-3.955-2.756-7.441-2.756z"
                        />
                      </svg>
                    </div>
                    <div className="b-miniCart mr-2">
                      <div className="b-miniCart-wrapper__mb relative">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#000000"
                            d="M8 20c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2zM8 17c-0.551 0-1 0.449-1 1s0.449 1 1 1 1-0.449 1-1-0.449-1-1-1z"
                          />
                          <path
                            fill="#000000"
                            d="M15 20c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2zM15 17c-0.551 0-1 0.449-1 1s0.449 1 1 1 1-0.449 1-1-0.449-1-1-1z"
                          />
                          <path
                            fill="#000000"
                            d="M17.539 4.467c-0.251-0.297-0.63-0.467-1.039-0.467h-12.243l-0.099-0.596c-0.131-0.787-0.859-1.404-1.658-1.404h-1c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h1c0.307 0 0.621 0.266 0.671 0.569l1.671 10.027c0.131 0.787 0.859 1.404 1.658 1.404h10c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-10c-0.307 0-0.621-0.266-0.671-0.569l-0.247-1.48 9.965-0.867c0.775-0.067 1.483-0.721 1.611-1.489l0.671-4.027c0.067-0.404-0.038-0.806-0.289-1.102zM16.842 5.404l-0.671 4.027c-0.053 0.316-0.391 0.629-0.711 0.657l-10.043 0.873-0.994-5.962h12.076c0.117 0 0.215 0.040 0.276 0.113s0.085 0.176 0.066 0.291z"
                          />
                        </svg>
                        <div className="b-miniCart__qty">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UiExtension>
        </div>

        {/*MEGA MENU*/}
        <UiExtension uiId="ONLY_DESKTOP">
          <div className="b-header-bottom">
            <div className="b-horizontal-menu">
              <ul className="b-main-nav">
                {props?.state?.megamenu?.map((item: any) => {
                  return (
                    <UiExtension
                      key={item!.id}
                      uiId="MEGA_MENU_ITEM"
                      item={item}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </UiExtension>
      </header>
      <main>
        <UiExtension
          uiId="BEDKINGDOM_HOME_BANNER_PLACEHOLDER"
          src={props?.state?.bannerUrl}
          mbSrc={props?.state?.bannerMbUrl}
        />
        <UiExtension uiId="KINGDOMBED_SERVICES" />
        <UiExtension uiId="BEDKINGDOM_HOME_CATEGORY_HORIZONTAL_PLACEHOLDER" />
      </main>
    </>
  );
};

function fetchMegaMenu() {
  const query = `query getBedKingdomMegaMenuSSR($menuId: Int!){
    getMenuItems(menuId: $menuId){
         id
    item_id
    name
    path
    url_key
    url_path
    show_name
    classes
    child_col
    sub_width
    align
    icon_position
    icon_classes
    is_group
    status
    disable_bellow
    show_icon
    icon
    show_header
    header_html
    show_left_sidebar
    left_sidebar_width
    menu_id
    left_sidebar_html
    show_content
    content_width
    content_type
    link_type
    link
    category
    target
    content_html
    show_right_sidebar
    right_sidebar_width
    right_sidebar_html
    show_footer
    footer_html
    color
    hover_color
    bg_color
    bg_hover_color
    inline_css
    tab_position
    before_html
    after_html
    caret
    hover_caret
    sub_height
    hover_icon
    dropdown_bgcolor
    dropdown_bgimage
    dropdown_bgimagerepeat
    dropdown_bgpositionx
    dropdown_bgpositiony
    dropdown_inlinecss
    parentcat
    animation_in
    animation_time
    child_col_type
    submenu_sorttype
    isgroup_level
    htmlId
    }
}
`;

  return fetchGraphql(query, { menuId: 1 }, 'getBedKingdomMegaMenuSSR');
}

function fetBanner() {
  const query = `query getBedKingdomHomeBanner($sliderId: Int!){
    getBannerHomepage(sliderId: $sliderId){
        slider_id
        slider_config{
            title
            show_title
            status
            dots
            thumbs
            center
            items
        }
        banner_config{
            id
            title
            status
            url
            wrap_link
            banner_type
            image{
                img
                height
                width
            }
            mobile_image{
                img
                height
                width
            }
            thumb_image{
                img
                height
                width
            }
        }
        breakpoint_config{
            breakpoint_1
            breakpoint_2
            breakpoint_3
            breakpoint_4
        }
        media_url
    }
}
`;

  return fetchGraphql(query, { sliderId: 1 }, 'getBedKingdomHomeBanner');
}

export const getStaticProps: GetStaticProps = async (context) => {
  const state: any = {};
  try {
    const megamenuRes = await fetchMegaMenu();
    const bannerRes = await fetBanner();
    state['megamenu'] = megamenuRes?.data?.getMenuItems;
    const bannerPcConfig =
      bannerRes?.data?.getBannerHomepage?.banner_config?.find(
        (cfg: any) => cfg?.image?.img && cfg?.status === '1'
      );
    const bannerMobileConfig =
      bannerRes?.data?.getBannerHomepage?.banner_config?.find(
        (cfg: any) => cfg?.mobile_image?.img && cfg?.status === '1'
      );

    state['bannerPcUrl'] = bannerPcConfig.image.img;
    state['bannerMbUrl'] =
      bannerRes?.data?.getBannerHomepage?.media_url +
      bannerMobileConfig.mobile_image.img;
  } catch (e) {
    console.error(e);
  }
  return { props: { state } };
};

export default HomeSeo;
