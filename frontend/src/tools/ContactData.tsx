interface ContactData extends RecaptchaData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const initialContactData: ContactData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    'g-recaptcha-response': '',
}

export interface RecaptchaData {
    'g-recaptcha-response': string | null;
}

export default ContactData;
