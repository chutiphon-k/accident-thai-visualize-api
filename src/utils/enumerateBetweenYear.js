import { times } from 'lodash';

export default (starYear, endYear) => {
  if (starYear > endYear) throw Error('invalid arg format');

  return times(+endYear - starYear + 1).map((_, index) => `${+starYear + index}`);
};
