import NativeRouterModule, {PathInfo} from '@/specs/NativeRouterModule.ts';
import NativeAppModule from '@/specs/NativeAppModule.ts';

export const openNativeSettings = () => {
  NativeAppModule.userInfo();

  let info: PathInfo = {
    path: 'setting',
    user: {name: 'cc', email: 'cc@gmail.com'},
  };

  console.log(`info=${JSON.stringify(info)}`);

  let promise = NativeRouterModule.hasPage(info);
  promise
    .then(result => {
      console.log('NativeRouterModule: ret=', result);
      if (result.exists) {
        NativeRouterModule.goPage('setting');
      }
    })
    .catch(error => {
      console.error(error);
    });
};
