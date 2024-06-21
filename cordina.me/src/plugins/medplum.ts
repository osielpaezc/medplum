import { MedplumClient } from '@medplum/core';


interface MedplumClientConfig {
  baseUrl?: string;
  clientId?: string;
  googleClientId?: string;
  recaptchaSiteKey?: string;
  registerEnabled?: boolean | string;
}


const envSettings : MedplumClientConfig = {
  baseUrl: import.meta.env?.MEDPLUM_BASE_URL,
  clientId: import.meta.env?.MEDPLUM_CLIENT_ID,
  googleClientId: import.meta.env?.GOOGLE_CLIENT_ID,
  recaptchaSiteKey: import.meta.env?.RECAPTCHA_SITE_KEY,
  registerEnabled: import.meta.env?.MEDPLUM_REGISTER_ENABLED,
}


export default {
  install: (app: any, options: MedplumClientConfig = envSettings) => {

    const client = new MedplumClient({
        baseUrl: options.baseUrl,
        clientId: options.clientId,
        cacheTime: 60000,
        autoBatchTime: 100,
        onUnauthenticated: () => {
          console.log('unauthenticated')
          if (window.location.pathname !== '/signin' && window.location.pathname !== '/oauth') {
            window.location.href = '/signin?next=' + encodeURIComponent(window.location.pathname + window.location.search);
          }
        },
      });

    

    console.log(client)
    // // inject a globally available $translate() method
    // app.config.globalProperties.$translate = (key: string) => {
    //   // retrieve a nested property in `options`
    //   // using `key` as the path
    //   return key.split('.').reduce((o: any, i: string) => {
    //     if (o) return o[i];
    //   }, options);
    // };
    // app.provide('medplum', options)
  },
};
