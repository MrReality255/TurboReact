export const ViewUtils = {
  wrapper: function (
    content: React.ReactNode,
    wrapperFct?: (x: React.ReactNode) => React.ReactNode,
    cond?: boolean,
  ) {
    return wrapperFct && (cond === undefined || cond)
      ? wrapperFct(content)
      : content;
  },
};
