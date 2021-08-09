export const ADMIN_URI = '/admin/emails';
export const USER_URI = '/user/email';


export const navigateHome = () => {
    // Redirect to Home page.
    window.location.replace('/'); 
}

export const navigateLogout = (uri: string) => {
    // Redirect to Cognito .
    window.location.replace(uri); 
}