import { withBedKingdomGetConfigData } from '@extensions/bed-kingdom/hoc/common/withBedKingdomGetConfigData';
import { useExtAdditionConfig } from '@modules/ui/hook/config/useExtAdditionConfig';
import COMMON from '@values/extendable/COMMON';
import { withCmsPageByIdentifier } from '@vjcspy/r/build/modules/content/hoc/withCmsPageByIdentifier';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';

const CmsContent = combineHOC(
  withCmsPageByIdentifier,
  withBedKingdomGetConfigData
)((props) => {
  const [formIds, setFormIds] = useState<any>([]);
  const [contentHtml, setContentHtml] = useState<any>('');
  const identifier = useExtAdditionConfig('identifier', props);
  const { asPath } = useRouter();
  useEffect(() => {
    if (typeof props?.actions?.getCmsPageData === 'function' && identifier) {
      props?.actions?.getCmsPageData(identifier);
    }
  }, [identifier]);

  useEffect(() => {
    if (
      props?.state?.data?.cmsPage?.content &&
      props?.state?.data?.cmsPage?.content.includes('amasty_custom_form_id=')
    ) {
      const regex = /{{amasty_custom_form_id="(.*?)"}}/gm;

      let match: any;
      while ((match = regex.exec(props?.state?.data?.cmsPage?.content))) {
        if (Array.isArray(match) && match.length > 1) {
          setFormIds([...formIds, match[1]]);
          setContentHtml(
            props?.state?.data?.cmsPage?.content.replace(
              `{{amasty_custom_form_id="` + match[1] + `"}}`,
              `<div id="data-form-` + match[1] + `"></div>`
            )
          );
        }
      }
    } else {
      setContentHtml(props?.state?.data?.cmsPage?.content);
    }
  }, [props?.state?.data?.cmsPage?.content]);

  useEffect(() => {
    setTimeout(() => {
      if (formIds.length > 0) {
        formIds.forEach((item: any) => {
          const nodeFrom = document.getElementById(`div-form-${item}`);
          const nodeTo = document.getElementById(`data-form-${item}`);

          if (nodeFrom && nodeTo) {
            const nodeClone = nodeFrom.firstChild;
            if (nodeClone) {
              nodeTo.appendChild(nodeClone);
            }
          }
        });
      }
    }, 1500);
  }, [formIds]);

  return (
    <>
      <Head>
        <meta
          name="title"
          content={
            props?.state?.data?.cmsPage?.meta_title
              ? props?.state?.data?.cmsPage?.meta_title
              : props?.state?.storeConfigData?.default_title ?? ''
          }
        />
        <meta
          name="keywords"
          content={
            props?.state?.data?.cmsPage?.meta_keywords
              ? props?.state?.data?.cmsPage?.meta_keywords
              : props?.state?.storeConfigData?.default_keywords ?? ''
          }
          key="keywords"
        />
        <meta
          name="description"
          content={
            props?.state?.data?.cmsPage?.meta_description
              ? props?.state?.data?.cmsPage?.meta_description
              : props?.state?.storeConfigData?.default_description ?? ''
          }
          key="description"
        />
        <meta charSet="utf-8" key="charSet" />
        <title>{props?.state?.data?.cmsPage?.title ?? ''}</title>
      </Head>
      <NextDefaultSeo
        title={
          props?.state?.data?.cmsPage?.title ??
          props?.state?.storeConfigData?.default_title ??
          ''
        }
        titleTemplate={
          props?.state?.data?.cmsPage?.title ??
          props?.state?.storeConfigData?.default_title ??
          ''
        }
        canonical={COMMON.r('BASE_URL') + asPath.replace('/', '') ?? ''}
        openGraph={{
          title:
            props?.state?.data?.cmsPage?.title ??
            props?.state?.storeConfigData?.default_title ??
            '',
          description:
            props?.state?.data?.cmsPage?.content ??
            props?.state?.storeConfigData?.default_description ??
            '',
          type: 'product',
          locale: 'en_GB',
          site_name:
            props?.state?.data?.cmsPage?.title ??
            props?.state?.storeConfigData?.default_title ??
            '',
          url: COMMON.r('BASE_URL') + asPath.replace('/', '') ?? '',
        }}
      />
      <section className="b-breadcrumbs mt-3 mb-5">
        <div className="container mx-auto px-4">
          <ul className="b-breadcrumbs-items text-12px uppercase">
            <li
              className="b-breadcrumbs-item home inline-block"
              onClick={() => RouterSingleton.push('/')}
            >
              <span>Home </span>
            </li>
            {props?.state?.data?.cmsPage?.title && (
              <li className="b-breadcrumbs-item cms_page inline-block text-color-666">
                <strong>{props?.state?.data?.cmsPage?.title}</strong>
              </li>
            )}
          </ul>
        </div>
      </section>
      <section className="b-cms-contact container-1200 container mx-auto px-4">
        <h1 className="b-page-title mb-8 mt-3 text-2xl md:text-3xl">
          <span>{props?.state?.data?.cmsPage?.title}</span>
        </h1>
        <div className="mb-5 grid grid-cols-1 md:grid-cols-1 md:gap-10">
          <div
            className="b-page-content"
            dangerouslySetInnerHTML={{
              __html: contentHtml || '',
            }}
          />
          {formIds.length > 0 &&
            formIds.map((item: any) => (
              <div
                id={`div-form-${item}`}
                key={item}
                style={{ display: 'none' }}
              >
                <UiExtension uiId="CUSTOM_FORM" formId={item} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
});

export default CmsContent;
