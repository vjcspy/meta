import { combineHOC, useExtensionForHook } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';

const DefaultRoot = combineHOC()(
  React.memo((props) => {
    const [stickey, setSticky] = useState(false);
    const Header = useExtensionForHook('header', props);
    const Main = useExtensionForHook('main', props);
    const Footer = useExtensionForHook('footer', props);
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [showCookie, setShowCookie] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 400) {
          setShowTopBtn(true);
        } else {
          setShowTopBtn(false);
        }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const goToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    useEffect(() => {
      const onScroll = (e: any) => {
        if (e.target.documentElement.scrollTop > 70) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      };
      window.addEventListener('scroll', onScroll);

      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
      const scriptLayer = document.createElement('script');
      scriptLayer.type = 'text/javascript';
      scriptLayer.id = 'gorgias-chat-widget-install';
      scriptLayer.innerHTML =
        '!function(_){_.GORGIAS_CHAT_APP_ID="3159",_.GORGIAS_CHAT_BASE_URL="us-east1-898b.production.gorgias.chat",_.GORGIAS_API_BASE_URL="config.gorgias.chat";var e=new XMLHttpRequest;e.open("GET","https://config.gorgias.chat/applications/3159",!0),e.onload=function(t){if(4===e.readyState)if(200===e.status){var n=JSON.parse(e.responseText);if(!n.application||!n.bundleVersion)throw new Error("Missing fields in the response body - https://config.gorgias.chat/applications/3159");if(_.GORGIAS_CHAT_APP=n.application,_.GORGIAS_CHAT_BUNDLE_VERSION=n.bundleVersion,n&&n.texts&&(_.GORGIAS_CHAT_TEXTS=n.texts),n&&n.sspTexts&&(_.GORGIAS_CHAT_SELF_SERVICE_PORTAL_TEXTS=n.sspTexts),!document.getElementById("gorgias-chat-container")){var o=document.createElement("div");o.id="gorgias-chat-container",document.body.appendChild(o);var r=document.createElement("script");r.setAttribute("defer",!0),r.src="https://storage.googleapis.com/gorgias-chat-production-client-builds/{bundleVersion}/static/js/main.js".replace("{bundleVersion}",n.bundleVersion),document.body.appendChild(r)}}else console.error("Failed request GET - https://config.gorgias.chat/applications/3159")},e.onerror=function(_){console.error(_)},e.send()}(window||{});';

      document.head.appendChild(scriptLayer);

      const flagCookie = window.localStorage.getItem('COOKIE_CONSTANT_KEY');

      if (!flagCookie) {
        setShowCookie(true);
      }

      return () => {
        document.head.removeChild(scriptLayer);
      };
    }, []);

    const setShowModelCookie = useCallback(() => {
      setShowCookie(false);
      window.localStorage.setItem('COOKIE_CONSTANT_KEY', 'true');
    }, []);

    return (
      <>
        <header className={clsx(stickey && 'stickyHead')}>{Header}</header>
        <main>{Main}</main>
        <footer>{Footer}</footer>
        {showCookie && (
          <div id="cookieAlert" className="cookieAlert">
            <div className="message">
              <span className="cookie-title">Cookie Policy</span>{' '}
              <p>
                We use cookies to give you the best experience with us. You are
                free to manage your cookies via your browser settings at any
                time. Please continue browsing if you are happy with our cookie
                policy.
              </p>
              <button
                className="button accept"
                id="accept-cookie"
                onClick={() => setShowModelCookie()}
              >
                Accept
              </button>
              <button
                className="button decline"
                id="decline-cookie"
                onClick={() => setShowModelCookie()}
              >
                Decline
              </button>
            </div>
          </div>
        )}

        <div className="b-backToTop">
          {showTopBtn && (
            <div className="icon-position icon-style" onClick={goToTop}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 1000 1000"
                enableBackground="new 0 0 1000 1000"
                xmlSpace="preserve"
              >
                <metadata></metadata>
                <g>
                  <path d="M545.6,233l425.5,439.8c25.2,26,25.2,68.2,0,94.3c-25.2,26-66,26-91.2,0L500,374.3L120.1,767c-25.2,26-66,26-91.2,0c-25.2-26-25.2-68.2,0-94.3L454.4,233C479.6,207,520.4,207,545.6,233z" />
                </g>
              </svg>
            </div>
          )}
        </div>
      </>
    );
  })
);

DefaultRoot.displayName = 'DEFAULT_ROOT';

export default DefaultRoot;
