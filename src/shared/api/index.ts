import axios from 'axios';
import { removeAuthData, navigateHome } from '../utils';
const { REACT_APP_API_ENDPOINT } = process.env;

export enum EmailStatus {
  Pending = "Pending",
  Review = "Review",
  PositiveReplay = "Positive replay",
  NeutralReplay = "Neutral replay",
  NotALead = "Not a lead",
}

export interface Email {
  emailId: string;
  body: string;
  date: string;
  emailLead: string;
  resolvedBy: string;
  lockedBy: string;
  status: EmailStatus;
  subject: string;
}

/**
 * generaic methods
 */
export const normalizeEmailFromApi = (email: any): Email => {
  return {
    emailId: email.email_id,
    body: email.body,
    date: email.date,
    emailLead: email.email_lead,
    resolvedBy: email.resolved_by,
        lockedBy: email.locked_by,
    status: email.status,
    subject: email.subject,
  }
}

/**
  * axios instance for ajax requests
*/ 
const request = axios.create({
  baseURL: REACT_APP_API_ENDPOINT,
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error === '401') {
      alert('Not Authorised, Please login');
      // Reset localStorage
      removeAuthData();
      // Navigate User to home page. 
      navigateHome();
      // handle error: inform user, go to login, etc
    } else {
        return Promise.reject(error);
    }
  }
);

export default request;