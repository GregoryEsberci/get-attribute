import createGetAttributeNative, { canUseNative } from './native';
import createGetAttributeAlternative from './alternative';

export default canUseNative ? createGetAttributeNative() : createGetAttributeAlternative();
