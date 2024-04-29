export function isNumeric(str:string):boolean {    
    if (typeof str != "string") return false // we only process strings!  
    const temp = parseInt(str)
    return !isNaN(temp) && 
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }