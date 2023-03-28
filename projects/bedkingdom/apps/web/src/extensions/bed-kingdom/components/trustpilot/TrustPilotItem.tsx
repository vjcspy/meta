import { UiExtension } from '@web/ui-extension';
import moment from 'moment/moment';
import React from 'react';

const TrustPilot: React.FC<{ reviewItem: any }> = React.memo((props) => {
  return (
    <div className="productList__stars">
      <div className="tp-widget-stars">
        <UiExtension
          uiId="BEDKINGDOM_TRUST_PILOT_START_SINGLE"
          star={Math.round(props.reviewItem?.stars) || 0}
        />
        <div className="tp-widget-readmore" id="numberOfReviews">
          {moment(props.reviewItem?.created_at).fromNow()}
        </div>
        <span className="tp-widget-readmore-arrow" id="readMoreArrow" />
      </div>
      <div className="tp-widget-stars title">
        <span>{props.reviewItem?.title}</span>
      </div>
      <div className="tp-widget-stars commnet">
        <span>
          {props.reviewItem?.content.length > 85
            ? `${props.reviewItem?.content.substring(0, 85)}...`
            : props.reviewItem?.content}
        </span>
      </div>
      <div className="tp-widget-stars author">
        <span>{props.reviewItem?.consumer_display_name}</span>
      </div>
    </div>
  );
});

export default TrustPilot;
