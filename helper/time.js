function current(){
    var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1; 
   var yyyy = today.getFullYear();
   var hh = today.getHours();
   var mi = today.getMinutes();
   var ss = today.getSeconds();
   if(dd<10) { dd='0'+dd  } 
   if(mm<10) { mm='0'+mm  } 
   today = yyyy+'-'+mm+'-'+dd+' '+hh+':'+mi+':'+ss;
   return today;
}

exports.current = current;

function epoch(){
    return (new Date).getTime();
  }
  
  exports.epoch = epoch;