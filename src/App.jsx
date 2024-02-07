import { useCallback, useState, useEffect, useRef,useMemo } from 'react';

function App() {
  const [numberallowed, setNumberallowed] = useState(0);
  const [length, setlength] = useState(8);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuioplkjhgfdsazxcvbnm";
    if (numberallowed) str += "0123456789";
    if (charAllowed) str += "!@$%&";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberallowed, charAllowed, setPassword]);

  const copypassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 40);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerater();
  }, [length, numberallowed, charAllowed, passwordGenerater]);

  const containerStyle = useMemo(() => ({
    backgroundImage: "url('https://t4.ftcdn.net/jpg/04/61/47/03/360_F_461470323_6TMQSkCCs9XQoTtyer8VCsFypxwRiDGU.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
  }), []);
  return (
    <div style={containerStyle}>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg py-4 px-4 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-4'>𝙥𝙖𝙨𝙨𝙬𝙤𝙧𝙙 𝙂𝙚𝙣𝙚𝙧𝙖𝙩𝙚𝙧 </h1>
        <div className='flex shadow rounded-lg overfloe-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-2'
            placeholder='Password'
            ref={passwordRef}
          />
          <button onClick={copypassword} className='outline-none b text-white px-3 py-0.5 shirnk-0'>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id='numberInput'
              onChange={() => {
                setNumberallowed((prev) => !prev);
              }}
            />
            <label htmlFor='numbderInput'>Number</label>
            <div className='flex item-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setcharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='charInput'> character</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
