import axios from 'axios';


export const getUserActivities = async (name) => {
  const res = await axios.post('/api/user/activity', {
    data: {
      userName: name
    }
  });
  
  return res.data.data;
}