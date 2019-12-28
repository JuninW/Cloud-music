import { http } from '../http'; 

function userInfo(params){
  http('/user/subcount', 'get', params)  
}

export default{
  userInfo
}