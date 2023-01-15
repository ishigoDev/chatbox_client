export const saveStorage = (key,value) =>{
    try{
        localStorage.setItem(key,value);
    }catch(err){
        return err;
    }
}
export const getToken = ()=>{
    if(localStorage.getItem('token') !== null) {
        return localStorage['token'];
     }
     return false ;         
}