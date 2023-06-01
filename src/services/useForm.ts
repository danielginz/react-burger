import { useState } from "react";

interface ITestBun {
    _id: number,
    name: string,
    price: number
}
const useForm = (inputValues: any/*ITestBun*/) => {
    console.log("AAA, inputValues: "+JSON.stringify(inputValues));
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: { target: { value: any; name: any; }; }) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}

export default useForm;