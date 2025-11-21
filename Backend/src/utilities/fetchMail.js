// const fetch=require('node-fetch');
const fetchMail=async ({accessToken, query=""})=>{

    console.log("fetching the mails");

        const res = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}`,
        {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` }
        }
    );

    const data=await res.json();
    console.log("fetched emails are ->",data);
    return data || [];
}
module.exports=fetchMail;