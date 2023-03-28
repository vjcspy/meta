import { useCategoryListLazyQuery } from '@vjcspy/apollo';
import { useEffect, useState } from 'react';

export const useCategoryList = (props: { categoryId: any }) => {
  const [categoryList, setCategoryList] = useState<any>();
  const [categoryListQuery, categoryListRes] = useCategoryListLazyQuery({
    variables: {
      id: props.categoryId,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!!props.categoryId) {
      categoryListQuery({
        variables: {
          id: props.categoryId,
        },
      });
    }
  }, [props.categoryId]);

  useEffect(() => {
    const { error, data } = categoryListRes;
    if (error) {
      console.error(
        'could not get data useCategoryListQuery',
        props.categoryId
      );
    }

    if (data) {
      if (data.category) {
        setCategoryList(data.category);
      }
    }
  }, [categoryListRes]);

  return {
    state: {
      categoryList,
    },
  };
};
