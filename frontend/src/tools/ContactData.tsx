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

export interface RecaptchaData extends Record<string, string | null> {
    'g-recaptcha-response': string | null;
}

export default ContactData;
