import React, { useState } from 'react';
import {numbers,upperCaseLetters,lowerCaseLetters,specialCharacters} from './Character';
import {Copy_success,Copy_fail} from './message';
import './index.css';
import { toast ,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function MyComponent() {
  // Component logic
  const [password, setPassword] = useState("");
  const [passwordLength, setpasswordLength] = useState(26);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const handlePasswordGenerator =() =>{
    if(!includeUpperCase && !includeLowerCase && !includeNumbers && ! includeSymbols) {
      notify("To generate password you must select atleast one checkbox", true)
    }else{
      var characterList = "";
      if(includeNumbers) {
        characterList =characterList + numbers
      }
      if(includeUpperCase){
        characterList = characterList + upperCaseLetters
      }
      if(includeLowerCase) {
        characterList = characterList + lowerCaseLetters
      }
      if(includeSymbols) {
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
      notify("password is generated successfully", false)
    }
  }
  const createPassword = (characterList) =>{
    let password = "";
    const characterListLength = characterList.length;
    for (let i= 0; i < passwordLength; i++) {
      const charaterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(charaterIndex)
    }
    return password
  }
  const copyToClipboard = (password) =>{
    navigator.clipboard.writeText(password)
  }
  const notify =(message, hasError = false) =>{
    if(hasError) {
      toast.error(message,{
        position : "top-center",
        autoClose: 5000,
        hideProgressBar:false,
        closeOnClick: true,
        pauseOnHover:true,
        draggable: true,
        progress: undefined,
      });
    } else{
      toast(message,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  const handleCopyPassword = (e) =>{
    if (password === "") {
      notify(Copy_fail, true)
    } else{
      copyToClipboard(password)
      notify(Copy_success)
    }
  }
  return (
    <div className='App'>
      <div className='container'>
        <div className='generator'> 
        <h2 className='generartor_header'> 
              Password Generator
        </h2>
        <div className="generator_password">
              <h3>{password}</h3>
              <button className='copy_btn' >
               <i onClick={handleCopyPassword} className="far fa-clipboard"></i> 
              </button>

        </div>
        <div className='form-group'>
          <label className='password-strength'>Password Length</label>
          <input className='pw' defaultValue={passwordLength} onChange={(e) =>setpasswordLength(e.target.value)} type="number" id="password-strength" max="26" min="8"/>
        </div>
        <div className='form-group'>
          <label htmlFor='uppercase-letters'> Add Uppercase Letters </label> 
          <input checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)} type="checkbox" id="uppercase-letters" name="uppercase-letters"/> 
        </div>
        <div className='form-group'>
          <label htmlFor='lowercase-letters'>Add Lowercase Letters</label>
          <input checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)} type="checkbox" id="lowercase-letters" name="lowercase-letters"/>
        </div>
        <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} type="checkbox" id="include-numbers" name="include-numbers" />
        </div>
        <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} type="checkbox" id="include-symbols" name="include-symbols" />
        </div>
        <button onClick={handlePasswordGenerator} className='generator_btn'>
          <h4>Generate Password</h4>
        </button>
        <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop ={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        </div>
      </div>      
    </div>
  );
}

export default MyComponent;
