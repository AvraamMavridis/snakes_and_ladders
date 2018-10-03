export const sleep = async function(time){
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
};