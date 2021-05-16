import { times } from 'lodash';

export default (start, end) => {
  if (start > end) throw Error('invalid arg format');

  return times(end - start + 1).map((_, index) => `${start + index}`);
};
