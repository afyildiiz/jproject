export function getAppId() {
    return localStorage.getItem('AppId');
  }
  
  export function getBaseLocation() {
    let paths: string[] = window.location.pathname.split('/')//Apps
    let basePath: string = 'Apps' + '/' + window.location.pathname.split('/')[2]// Default: my-account
    return '/' + basePath + '/';
  }
  