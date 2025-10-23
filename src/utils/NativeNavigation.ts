import NativeRouterModule from '@/specs/NativeRouterModule.ts';
import NativeAppModule from '@/specs/NativeAppModule.ts';

export const openNativeSettings = () => {
  NativeAppModule.userInfo();


  let info = {
    path: 'setting',
    user: {name: 'cc', email: 'cc@gmail.com'},
    extra: 'abc',
  };

  let promise = NativeRouterModule.hasPage(info);
  promise
    .then(result => {
      console.log('NativeRouterModule', result);
      if (result.exists) {
        NativeRouterModule.goPage('setting');
      }
    })
    .catch(error => {
      console.error(error);
    });
};
