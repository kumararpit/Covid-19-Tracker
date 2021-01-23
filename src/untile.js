export const sortData=(data)=>{
     const sorteddata=[...data];
     sorteddata.sort((a,b)=>{
         if(a.cases>b.cases){
             return -1;
         }
         else{
             return +1;
         }
     })
     return sorteddata;
}