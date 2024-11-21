import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId:'com.JC2day.godis',
  appName: 'God Calling',
  webDir: 'www',
  plugins:{
    SplashScreen:{
      launchShowDuration:3000,
    },
    PushNotifications:{
      presentationOptions:['badge','alert','sound']
    },
    DatePickerPlugin: {
      "mode": "date",
      "locale": "pt_BR",
      "current": "13/07/2019",
      "format": "dd/MM/yyyy",
      "android": {
        "theme": "MyCustomeTheme"
      },
      "ios": {
        "style": "wheels"
      }
    }
  }  
};

export default config;
