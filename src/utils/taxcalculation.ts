  const KMCHARGE=0.2
  
  export const findCar:(tollsArray:Record<string,any>[],numberPlate:string)=> Record<string, number|string|boolean>|undefined = function (tollsArray,numberPlate){
    let result= tollsArray.find(toll => toll.numberPlate === numberPlate);
    return result;

    
  }
  const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  export const calculateCharges= (calculateData:{ exitInterchangeDistance:number,entryInterchangeDistance:any,exitDate:string}) => {
    const distanceCharges = (KMCHARGE * (calculateData.exitInterchangeDistance - calculateData.entryInterchangeDistance))
       console.log(distanceCharges)
       console.log(new Date(calculateData.exitDate).getDay(),"Day")
      const currentDay = WEEKDAYS[new Date(calculateData.exitDate).getDay()];
      console.log(currentDay,"currentDay")
      if (["Saturday", "Sunday"].includes(currentDay)) {
         return 1.5 * distanceCharges
      }
      return distanceCharges 
    
}