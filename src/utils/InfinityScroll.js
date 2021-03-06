import React, { useEffect, useCallback } from "react";
import _ from "lodash";
export default function InfinityScroll(props) {
  const { callNext, isNext, loading } = props;

  const handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 200) {
      if (loading) return;
        callNext();
    }
  }, 300);

  const callbackScroll = useCallback(handleScroll, [handleScroll]);

  useEffect (() => {
    if (loading) return;

    if(isNext) {
      window.addEventListener("scroll", callbackScroll);
    } else {
      window.removeEventListener("scroll", callbackScroll);
    }

    return () => window.removeEventListener("scroll", callbackScroll);
  }, [callbackScroll, isNext, loading]);
  return (
    <>
    {props.children}
    </>
  )
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  isNext: false,
  loading: false,
};
