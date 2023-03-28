import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const Services: React.FC = combineHOC()(() => {
  return (
    <>
      <section className="b-section_service py-4 mdm:py-3">
        <div className="container mx-auto md:px-4">
          <div className="service_wrap grid grid-cols-4 gap-2 md:gap-3 lg:gap-4">
            <a
              href="https://www.bedkingdom.co.uk/free_delivery"
              className="services-item md:flex md:items-center"
            >
              <div className="services-item__img">
                <UiExtension
                  uiId="IMAGE"
                  width="35"
                  height="24"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAkCAMAAADxcOlCAAAAOVBMVEVHcEwjYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqoAoe8hAAAAEnRSTlMA9bCiMJjFQguEdmgmjlUa6ddrKhasAAABkUlEQVQ4y72USZLEIAwECxA7Blz/f+wcbNrtrdszh8kboUgQSAgAYPgBi2smGn+DZryV0k0E8TY0cbqTLGMY/EJ60dMfJNI8lqaRXSJd2yJmv8de2pLyit2/VqLLh4cAxHvvfUObyboGgohslZGTVJcbqQpojpscGqIepUT23hWZgTieo7p39qlaRmQ6AMGSEcgkvrFIGgAQSQ88ltyycKwoJAAfBymlVJ9Jff8M8uykyVprrTXGGGNiuJL0Ufp+p8S+7Nh/IeUteY9CBeh34qUUclrJWKT9M4QraUehAnLOufqac845ezyTAKBNpxO+S+Z2Tn2QplekHX7GNqiKXxq5bdIUAoCmSc4VAMYft4wBgDiSzgOQLT0qFdE6OXeyQrpaIalUDSRnki0ojuLmZfxqdgEsCdkXIhm6hqDpGjkaESIiCGu3zqwo8kYpVAEAFCXIfpyMrjKnSezZMbY7EEh/HSpkAxDU8eMAMOweTa+5vOM4C4rjfC5kmEnF9bwdrS+Rq/EYbF+rcbK0IrXgv/kBIuYhelfP83oAAAAASUVORK5CYII="
                />
              </div>
              <div className="services-item__info ">
                <div className="services-item__name text-center md:ml-2 md:text-left  lg:ml-4 lg:uppercase">
                  Free Delivery
                  <span className="hidden font-normal capitalize md:block">
                    Most Of UK
                  </span>
                </div>
              </div>
            </a>
            <a
              href="https://uk.trustpilot.com/review/www.bedkingdom.co.uk"
              className="services-item md:flex md:items-center"
            >
              <div className="services-item__img">
                <UiExtension
                  uiId="IMAGE"
                  width="35"
                  height="29"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAtCAMAAAA9SAOJAAAAOVBMVEVHcEwjYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqoAoe8hAAAAEnRSTlMAhagUVJnfzh4+dQot+Ldixe2i1DqPAAACD0lEQVRIx52VSYLjIBAEE8SmhS3+/9g5IGy33WPLnScECgpqQ7XFJ7X7zMtaLElDne9kTi5g3A9V2M6hpfxcc43txk3LUzBH2233Kf/ArT+XFm47GfwTZ1+5Lf2JK/T0B67BCX7FNbKLA/yCWxp51RLox1echVy1duhfcS52vCo5GmmB/Ra/T/cz2MNQTr+4Y8hf4ADiyd1lP3Cu55z7mCs9T/X6KX77vu/zWvtd+sRd1F85/x2Xqm8hRLsV6nXuKA8e9pc5A0RT19WZAtjlErc3sLdfkoG+XuD2CG6YHTmQIhyfuUY/JI30mwfoyyeujs0leQg3l5TBHf5VZpekPOO1A9NCgnXW36ucpHqzYfEbbZ8f5eSaeVKgSgo47dXYFiAJeix+S0qgwCrPc96r4KQDdrlhvsxiw0pxctsz13BSJUpLA5sOSUrJQFgl/96eGXVbCKdTl0hYJG2c9/PrkyL13pfa6coV4j7Co8Cq8ps/Hzi1MSijk9w49/o+tpKkbXQqKXLIVR0zLAaFmRC/6KBrnC9oA6tyht6igEtp+UUppSOPTQ2xQSa0s8F1lN8/y/70C31NBUZProTfc+xBSUqAXyRtmTONNim9UyFKKYeZ0SU7yZB3vdcCXnroo4vkZiW+U+X5jXid+R8YHyo7+WuY5ICyjpMeBl5r4D9KFsjR2taBclzEJK0mjKAEP6l/WD0zQG5fg3QAAAAASUVORK5CYII="
                />
              </div>
              <div className="services-item__info">
                <div className="services-item__name text-center md:ml-2 md:text-left  lg:ml-4 lg:uppercase">
                  Excellent Service
                  <span className="hidden font-normal capitalize md:block">
                    Highly rated on Trustpilot{' '}
                  </span>
                </div>
              </div>
            </a>
            <a
              href="https://www.bedkingdom.co.uk/price_match"
              className="services-item md:flex md:items-center"
            >
              <div className="services-item__img">
                <UiExtension
                  uiId="IMAGE"
                  width="35"
                  height="36"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAuCAMAAABkkgs4AAAAM1BMVEVHcEwjYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqqSpnmGAAAAEHRSTlMAl6byDILrzlge4blCNWyMmUxxLQAAAX1JREFUSMftlUlu3DAURB/nmar7n9YLiu2WHMRygGyC1EaFrwdxKPETgKxJElBksSqAGkEdUKRrstW7URhJufcgO6xC71NtGB29Z9UxZXv3AKXqkeIAkppJasYYY0xTWsaqbuN2AZCDrLxmNHScc1Pbpq5n0loAQ+4oAEUyBQAnO07I9gvMlNarrHOQHhUAKEn2ClPGOerL+OFPt8wb/L3+BC6PlAQ4PZQDnNIjOfeXF/hj2Hvv/ZnCr/0nnKMkOQswnSS5AHAsPy+wUUwprUGsakp1/XV1eXuBzxNUAYwG+AUneRgyNziD33CHsuEC/Qs8Xms1+8BuotzgQzaEY33ZyoZgNmxCsLc5zxV/AjiWtwBt+eO6zznnnHMB8G++LO//gbhdrXXHHWuNe+tirfFL3Pkad/kubv7HjfQMjqt9hSfsPNuXWnjX9OSJn5dikyKg2G4dsCNRbsVUBUS317wFo0O/1Mqa83zdS7+VXfdY04OmewYG4cEdGw9+qg+7gymKli5TOwAAAABJRU5ErkJggg=="
                />
              </div>
              <div className="services-item__info">
                <div className="services-item__name text-center md:ml-2 md:text-left lg:ml-4 lg:uppercase">
                  Price Match{' '}
                  <span className="hidden font-normal capitalize md:block">
                    Price match guarantee*{' '}
                  </span>
                </div>
              </div>
            </a>
            <a
              href="https://www.bedkingdom.co.uk/finance"
              className="services-item md:flex md:items-center"
            >
              <div className="services-item__img">
                <UiExtension
                  uiId="IMAGE"
                  width="35"
                  height="35"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAAAQlBMVEVHcEwjYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqojYqoZGelnAAAAFXRSTlMA7bjFMEeb3wc991+q0oobJW4TUnxphbkLAAADZ0lEQVRIx5VWR5LtOAyDcpYj7n/VWVBOr/3692jjKlmBBEBQwLextNx2/N8RNUnSTH9cv7q0ArCB3N1CKgcgJveP/Z5kbr6SKgGYA1l9yyRr/GWbIYMiSepVwq0kSRXI9n3bRm6ALfu+nXNu7yVFuMzvIDX6r/92qm+/LDnSj27xpoVg/OJGXpHcvmanAQDJS44ylHcDsvC2aS6GtACSJql0L8650rUiaRyAlWzL/CkOQ5IFgCNZtwv0uFWSdQVcJtmW+zZNsnULAClr+xmKFzqnvZE015kLuVsAsBPwxm8KEgzmhezntKLcPpPxu1zLwfGxZj3wn4L5yl8l0+DjACdmPlNa15eNmnmVmE6NB7rbAmfIVn5uDNQijvUivDxESvJFjZZ0QLrR31hOHFey2rmPLGJZ70UWAHfp1JEzrKrjuiDZdEGj30DNdJgOYJHICniawWW9PvYpZk8N9DHnSANENVY4qgigcQfQhtKvDFdAqJxJAyAxj2AUm3OaXIHthvmAtAiVFlXiW3hQbjNJiUXds5NAuyRvMGTgryWzD8FbAJ35Q3ZF4p5JSNE9KTwZWT71LWBPJLQc0R6SGYoMP6nPEYBnGypAkHCf4KUXyayHcDzV633mycHtPmEnKu4v+blPDs78ihSGUOA/hRzES6feWp8vPM0pQWxswP4R1SIIWEWSOd350wNmz/qQ+ZDwIjmEsrWTx8ACdLlClBnzA5hhspuINYzkxdCHrW9yU5U6kDEJOeiS5Pgcmgxcrsl0x0+fRdWEkn1E4aTF1Jsy23XhdnjWRPp17aeFTeM0DaBQTePCA7Z+9rPlxWxi4C64qCLRq8NjriIvjQwPeW9hONocSGOBqPhmu/OjB81H6wcQO8kEWL5I8mSmzaOo/WVxs2GOwPboNs+hRtkE+zJdyJDe983pw6yPIt0BICnSfzbVqQd30/XHc0FSWytJf5dc8vk0DP9pVCinKThDMtR9Sza5pQbeuoz54Tjz1dbgar69J6hPNtf804UM1b45Ow3i99pUVk33MlqqddsSXp4ia5DT23ViPDmxZrxl5pcWvusWFPkzFFiSKjTd12+qiLO+6um4Lioa+9szcnhBG6TlIFTqU/C/jZnUKfkBpk/JkxZ/GKPBt2K3AceCP42klRqkuaqUcS9r/gN6DjrsJu1skgAAAABJRU5ErkJggg=="
                />
              </div>
              <div className="services-item__info">
                <div className="services-item__name text-center md:ml-2 md:text-left  lg:ml-4 lg:uppercase">
                  0% Finance{' '}
                  <span className="hidden font-normal capitalize md:block">
                    Available
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      {RouterSingleton.pathname !== '/' && <UiExtension uiId="ALERT_SHOW" />}
    </>
  );
});

export default Services;
