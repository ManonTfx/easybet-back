import { getUserId } from 'src/utils/auth/authUtils';
import { IContext } from './context.interface';

async function appContext(context: IContext) {
  let userId;
  try {
    userId = await getUserId(context.req);
  } catch (error) {
    // fail silently, as error handling will be done in other guards
    userId = '';
  }
  return {
    ...context,
    userId,
  };
}

export { appContext as default };
