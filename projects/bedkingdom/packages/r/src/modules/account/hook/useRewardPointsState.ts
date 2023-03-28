import { selectRewardPoints } from '@modules/account/store/account.selector';
import { useSelector } from '@main/packages-web-redux';

export const useRewardPoints = () => {
  const reward_points = useSelector(selectRewardPoints);

  return {
    state: {
      reward_points,
    },
  };
};
