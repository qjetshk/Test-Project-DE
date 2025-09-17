/**
 *
 */
export const fetchReq = (status: boolean): Promise<TFetchReqResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status) {
        resolve({ message: "Your application has been sent successfully.", status: true }); 
      }
      resolve({ message: "There was an error sending", status: false });
    }, 500);
  });
};

type TFetchReqResponse = {
  message: string;
  status: boolean;
};
