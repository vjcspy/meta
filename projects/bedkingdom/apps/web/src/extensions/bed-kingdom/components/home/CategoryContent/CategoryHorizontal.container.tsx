import { useExtAdditionConfig } from '@modules/ui/hook/config/useExtAdditionConfig';
import { UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const CategoryHorizontalContainer = React.memo((props) => {
  const categoryIds = useExtAdditionConfig('category_ids', props);

  const arrCategoryIds = useMemo(
    () =>
      typeof categoryIds === 'string' ? categoryIds.split(',') : undefined,
    [categoryIds]
  );

  return (
    <>
      {Array.isArray(arrCategoryIds) && (
        <UiExtension
          uiId="BEDKINGDOM_HOME_CATEGORY_HORIZONTAL"
          arrCategoryIds={arrCategoryIds}
        />
      )}
    </>
  );
});

CategoryHorizontalContainer.displayName = 'CategoryHorizontalContainer';
export default CategoryHorizontalContainer;
