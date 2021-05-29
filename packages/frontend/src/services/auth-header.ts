export default function authHeader() {
    const sessionToken = JSON.parse(localStorage.getItem('sessionToken'));
  
    if (sessionToken) {
      return { Authorization: 'Bearer ' + sessionToken };
    } else {
      return {};
    }
  }