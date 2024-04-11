import { useCallback, useEffect, useRef, useState } from "react";

function Test1() {

  const [length, setLength] = useState(10);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);

  const callback = () => {

    console.log('==> isNumAllowed', isNumAllowed);
    console.log('==> isCharAllowed', isCharAllowed);

    const str = 'QWERTYUIOPASDFGHJKLZXCVBNMzxcvbnmasdfghjkqwertyuiop';
    const nums = '0123456789';
    const chars = `~!@#$%^&*()_+`;
    let pass = str + (isNumAllowed ? nums : '') + (isCharAllowed ? chars : '');
    let result = '';
    let max = isNumAllowed && isCharAllowed ? 74 : isNumAllowed && !isCharAllowed ? 61 : !isNumAllowed && isCharAllowed ? 61 : 51; 
    let min = 1;
    for(let i = 0; i < length ; i++) {
      const randomIndex = Math.floor(Math.random() * (max-min + 1)) + min;
      result += pass.charAt(randomIndex);
    }
    setPassword(result);
  };

  const passwordGenerator = useCallback(callback, [length, isNumAllowed, isCharAllowed]) // deps are just for memoization of function

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordInputRef.current && passwordInputRef.current.select();

  }, [password]);

  useEffect(() => {
    passwordGenerator()
  }, [length]) // here deps are to look for change
  return (
    <>
      <div className="container">
      <div>
        <h1>{password}</h1>
      {/* <input type="text" defaultValue={''} ref={passwordInputRef} onChange={(e: any) => setPassword(e.target.value)}/> */}
      </div>
      <button onClick={() => {passwordGenerator()}}>Generate password</button>
      
      
      <div className="container-fluid">

        {/* <label htmlFor="length">Length</label>  */}
        <input type="range" min={0} max={100} onChange={(e: any) => {setLength(e.target.value)}} /> {length} <br />
        
        <label>Numerics</label>
        <input 
        type="checkbox" 
        id="numberInput"
        defaultChecked = {isNumAllowed}  
        onChange={() => {setIsNumAllowed((isChecked: boolean) => !isChecked)}}
        
        /> <br />

        <label htmlFor="isCharAllowed">Special characters</label>
        <input type="checkbox" defaultChecked = {isCharAllowed} onChange={() => setIsCharAllowed((isChecked: boolean) => !isChecked)}/>
        <br /><br />
        <button onClick={copyToClipboard}>Copy to clipboard</button>
      </div>
      </div>
    </>
  )
}

export default Test1;