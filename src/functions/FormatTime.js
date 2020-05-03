exports.gettime_to_format = (time) =>{
    let d = new Date(time);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day =  d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
  
    if (day < 10){
        day = '0'+ day;
    }
    if (month < 10){
        month = '0' + month;
    }
    if (hour < 10){
        hour = '0' + hour;
    }
    if (min < 10){
       min = '0' + min; 
    }
    if (sec < 10){
        sec = '0' + sec;
    }
    return year+'-'+month+'-'+day;
  };