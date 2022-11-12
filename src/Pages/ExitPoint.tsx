import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { TextField, Select } from "formik-mui";
import axios from "axios";
import { getCardMediaUtilityClass, MenuItem ,Typography} from "@mui/material";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { findCar } from "../utils/taxcalculation";
import { calculateCharges } from "../utils/taxcalculation";

type tollInterface = {
  interchange: string;
  date: string;
  numberPlate: string;
};

function ExitPoint() {
    const [charges,setCharges]=useState(0)
    const [baseRate,setBaseRate]=useState(0)
  const INTERCHANGESDISTANCE: Record<string, number> = {
    "Niazi Shaheed Interchange": 0,
    "Mehmood Booti Interchange": 10,
    "Quaid-e-Azam Interchange": 20,
    "Herbanspura Interchange": 25,
    "Ghazi Interchange": 35,
    "Nawaz Shareef Interchange": 49,
    "Kamahan Interchange": 55,
    "Ashiana Interchange": 60,
    "Gajju Matta Interchang": 65,
    "Kahna Kacha Interchange": 70,
    "Haluki Interchnage": 75,
    "Lake City Interchange": 78,
    "Adda Plot Interchange": 80,
  };

  const validationSchema = Yup.object({
    interchange: Yup.string().required("Required"),
    numberPlate: Yup.string().required("Required"),
    date: Yup.string().required("Required"),
  });

  const calculate = (value: string) => {
    return INTERCHANGESDISTANCE[value];
  };
  const onSubmit = async (values: tollInterface, { resetForm }: any) => {
    let tollsArray: Record<string, any>[] = [];
    const distance: number = calculate(values.interchange);
    let carData: Record<string, string | number | boolean> | undefined = {};
    
    let charges:number;
    const response = await axios.get(`${process.env.REACT_APP_URL}/tax`);
    tollsArray = response.data;
    if (tollsArray.length > 0) {
      carData = findCar(tollsArray, values.numberPlate);
    }
    if (carData) {
      if(carData.isTripActive==false) {
          alert("Car has already exited the Interchange")
          resetForm()
          return
      }
      const calculateData = {
        entryInterchangeDistance: carData.interchangeDistance,
        exitInterchangeDistance: distance,
        exitDate: values.date,
      };
      charges= calculateCharges(calculateData);
     setCharges(charges)
     setBaseRate(20)
     
     const updateCarData={interchange:carData.interchange,numberPlate:carData.numberPlate,entryDate:carData.date,entryInterchangeDistance:carData.interchangeDistance, carDataexittripTotalCost:charges+baseRate,isTripActive:false,exitInterchangeDistance:distance,exitDate: values.date};
     await axios.put(`${process.env.REACT_APP_URL}/tax/${carData._id}`,updateCarData);
    }
    
   

    // axios.put('https://reqres.in/api/articles/1', article)
      
    resetForm();
  };

  return (
    <> <div style={{flexDirection:'row',display: 'flex',justifyContent: 'space-around'}}><div><Formik
    initialValues={{
      interchange: "",
      numberPlate: "",
      date: "",
    }}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    enableReinitialize
  >
    <Form>

        <div style={{marginTop: "20px" }}>
        <h3>Exit</h3>
            <Field
        component={Select}
        type="text"
        label="Interchange"
        name="interchange"
        style={{ width: "445px" }}
        inputProps={{ name: "interchange", id: "interchange" }}
      >
        <MenuItem value="Niazi Shaheed Interchange">
          Niazi Shaheed Interchange
        </MenuItem>
        <MenuItem value="Mehmood Booti Interchange">
          Mehmood Booti Interchange
        </MenuItem>
        <MenuItem value="Quaid-e-Azam Interchange">
          Quaid-e-Azam Interchange
        </MenuItem>
        <MenuItem value="Herbanspura Interchange">
          Herbanspura Interchange
        </MenuItem>
        <MenuItem value="Abdullah Gul Interchange">
          Abdullah Gul Interchange
        </MenuItem>
        <MenuItem value="Ghazi Interchange">Ghazi Interchange</MenuItem>
        <MenuItem value="Nawaz Shareef Interchange">
          Nawaz Shareef Interchange
        </MenuItem>
        <MenuItem value="Kamahan Interchange">Kamahan Interchange</MenuItem>
        <MenuItem value="Ashiana Interchange">Ashiana Interchange</MenuItem>
        <MenuItem value="Gajju Matta Interchang">
          Gajju Matta Interchang
        </MenuItem>
        <MenuItem value="Kahna Kacha Interchange">
          Kahna Kacha Interchange
        </MenuItem>
        <MenuItem value="Haluki Interchnage">Haluki Interchnage</MenuItem>
        <MenuItem value="Lake City Interchange">
          Lake City Interchange
        </MenuItem>
        <MenuItem value="Adda Plot Interchange">
          Adda Plot Interchange
        </MenuItem>
      </Field></div>
      
      <div>
        <Field
          style={{ marginTop: "20px",width: "445px" }}
          
          type="text"
          name="numberPlate"
          label="Number Plate"
          component={TextField}
        />
      </div>
      <div>
        <Field style={{ marginTop: "20px",width: "445px" }} type="date" name="date" component={TextField}/>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </div>
    </Form>
  </Formik></div>
  <div>
    <h2>Break Down of Cost</h2>
  <h4>Base Rate :{baseRate}</h4>
  <h4>Distance Breakdown: {charges}</h4>
  <h4>Total: {charges+baseRate} </h4></div>
  </div>
 </>
   
  );
}

export default ExitPoint;
