import request from "./index";
import { Email, EmailStatus, normalizeEmailFromApi } from "./index";
import { getAuthData } from '../utils';

const handleError = (error: any) => {
  // TODO. Implement better Error handling.
  console.error(error);
  alert('Something went wrong, see more details in console.');
}

export const requestEmailForProcessing = async (): Promise<Email> => {
  const jwtData = getAuthData();
  if (!jwtData) throw new Error('401');
  
  try {
    const { data } = await request.post(`email-processings`, {},
      { 
        headers: {
          Authorization: `${getAuthData()?.jwtData.idToken}`
        },
      },
    );

    return normalizeEmailFromApi(data.email);
  } catch({ response: error }) {
    handleError(error);
    throw new Error(error);
  }
}

export const processEmail = async (emailId: string, status: EmailStatus): Promise<string> => {
  const jwtData = getAuthData();
  if (!jwtData) throw new Error('401');
  
  try {
    await request.patch(`email-processings/${emailId}`,
      { status },
      { 
        headers: {
          Authorization: `${getAuthData()?.jwtData.idToken}`
        },
      },
    );
    
    return "Email successfully processed!.";
  } catch({ response: error }) {
    handleError(error);
    throw new Error(error);
  }
}