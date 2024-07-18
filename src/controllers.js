const axios = require('axios');
require('dotenv').config();
let DataverseaccessToken = '';
let SharePointaccessToken = null;
let tokenExpirationTime = 0; // Initialize token expiration time
let SPtokenExpirationTime = 0; // Initialize token expiration time


/*----------------------------------------------GET Dataverse Access token Code Starts Here-------------------------------------------------------*/
const getDataverseAccessToken = async () => {
  // Check if the current access token is still valid
  if (DataverseaccessToken && Date.now() < tokenExpirationTime) {
    return DataverseaccessToken; // Return the existing token if it's still valid
  }
  try {
    // Retrieve environment variables from process.env
    const clientId = process.env.clientId;
    const clientSecret = process.env.client_secret;
    const tenantId = process.env.tenantId;
    const resource = process.env.scope;

    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    // Send POST request to token endpoint to obtain access token
    const response = await axios.post(
      tokenEndpoint,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: resource,
      })
    );
    // Store the access token and its expiration time
    DataverseaccessToken = response.data.access_token;
    tokenExpirationTime = Date.now() + response.data.expires_in * 1000; // Convert seconds to milliseconds

    // Return the access token
    return DataverseaccessToken;
  } catch (error) {
    console.error('Error fetching access token:', error.response?.status, error.response?.data);
    throw new Error('Error fetching access token');
  }
};
/*----------------------------------------------GET Dataverse Access token Code Ends Here-------------------------------------------------------*/


/*-------------------------------------Get Fund Request Data from the Dataverse Code Starts-------------------------------------------------------*/
const getFundingRequests = async (req, res) => {
  try {
    const { name } = req.params;

    const accessToken = await getDataverseAccessToken(); // Always ensure you have a valid token

    const apiUrl = `${process.env.DataverseURL}/dyn_fundingrequests(${name})`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    const fundprogramId = response.data._dyn_fundingprogramid_value;
    const contactId = response.data._dyn_contactid_value;

    const programResponse = await axios.get(`${process.env.DataverseURL}/dyn_fundingprograms(${fundprogramId})`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const programCode = programResponse.data.dyn_programcode;

    const contactResponse = await axios.get(`${process.env.DataverseURL}/contacts(${contactId})`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const fullName = contactResponse.data.fullname;

    // Construct the response object including fullname and programcode
    const responseData = {
      ...response.data,
      Applicantfullname: fullName,
      Fundingprogramcode: programCode,
    };

    // Send the response including fullname and programcode
    res.json(responseData);

  } catch (error) {
    console.error('Error fetching funding requests:', error.response?.status, error.response?.data);
    res.status(500).json({ error: 'Internal server error' });
  }
};
/*----------------------------------------Get Fund Request Data from the Dataverse Code Ends-----------------------------------------------------*/



module.exports = {
  getDataverseAccessToken,
  getFundingRequests
};
