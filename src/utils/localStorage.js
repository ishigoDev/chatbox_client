export const saveStorage = (key,value) =>{
    try{
        localStorage.setItem(key,value);
    }catch(err){
        return err;
    }
}