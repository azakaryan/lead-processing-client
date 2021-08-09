import request, { EmailStatus } from "./index";
import { Email, normalizeEmailFromApi } from "./index";
import { getAuthData } from '../utils';

const handleError = (error: any) => {
  // TODO. Implement better Error handling.
  console.error(error);
  alert('Something went wrong, see more details in console.');
}

export const getEmails = async (): Promise<Email[]> => {
  const jwtData = getAuthData();
  if (!jwtData) throw new Error('401');
  
  try {
    const { data } = await request.get("admin/emails",
      { 
        headers: {
          Authorization: `${getAuthData()?.jwtData.idToken}`
        },
      },
    );

    return data.body.Items.map((email: any) => normalizeEmailFromApi(email));
  } catch({ response: error }) {
    handleError(error);
    throw new Error(error);
  }
}

export const updateEmailStatus = async (emailId: string, status: EmailStatus): Promise<string> => {
  const jwtData = getAuthData();
  if (!jwtData) throw new Error('401');
  
  try {
    await request.patch(`admin/emails/${emailId}`,
      { status },
      { 
        headers: {
          Authorization: `${getAuthData()?.jwtData.idToken}`
        },
      },
    );

    return "Email Successfully updated";
  } catch({ response: error }) {
    handleError(error);
    throw new Error(error);
  }
}

export const uploadEmails = async (): Promise<string> => {
  const jwtData = getAuthData();
  if (!jwtData) throw new Error('401');
  
  try {
    await request.post(`admin/emails`, {},
      { 
        headers: {
          Authorization: `${getAuthData()?.jwtData.idToken}`
        },
      },
    );

    return "Emails successfully imported!.";
  } catch({ response: error }) {
    handleError(error);
    throw new Error(error);
  }
}