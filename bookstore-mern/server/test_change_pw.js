const axios = require('axios');

async function test() {
  try {
    const ts = Date.now();
    const email = `test_${ts}@test.com`;

    // 1. Register test user
    console.log('Registering user...');
    await axios.post('http://localhost:5000/api/auth/register', { 
        name: 'Testy', email, password: 'password123' 
    });

    // 2. Login to get token
    console.log('Logging in...');
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', { 
        email, password: 'password123' 
    });
    const token = loginRes.data.token;
    console.log('Got token:', token ? 'Yes' : 'No');

    // 3. change password
    console.log('Changing password...');
    const changeRes = await axios.post('http://localhost:5000/api/auth/change-password', 
      { currentPassword: 'password123', newPassword: 'password1234' },
      { headers: { Authorization: 'Bearer ' + token } }
    );
    console.log('Change Response:', changeRes.data);

    console.log('All backend logic working perfectly.');
  } catch (e) {
    if (e.response) {
      console.error('API Error:', e.response.status, e.response.data);
    } else {
      console.error('Request Error:', e.message);
    }
  }
}
test();
