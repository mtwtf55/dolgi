import { useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { SwipePage } from './swipe-pages.components';
import { EMPTY_SWIPE_HANDOFF } from './swipe-pages.constants';
import type { SwipeHandoff, SwipePagesProps } from './swipe-pages.types';
import { getTabIndex } from './swipe-pages.utils';

export const SwipePages = ({ children }: SwipePagesProps) => {
  const { pathname } = useLocation();
  const [handoff, setHandoff] = useState<SwipeHandoff>(EMPTY_SWIPE_HANDOFF);
  const tabIndex = getTabIndex(pathname);

  if (tabIndex === -1) return <div className="flex-1">{children}</div>;

  return (
    <SwipePage
      key={pathname}
      tabIndex={tabIndex}
      handoff={handoff}
      onHandoffChange={setHandoff}
    >
      {children}
    </SwipePage>
  );
};
