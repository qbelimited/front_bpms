import React,{useState} from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
function ClipboardCopy({copyText}) {
    const [isCopied, setIsCopied] = useState(false);

    
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
          // If successful, update the isCopied state value
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
      <div>
       <FormControl className=' w-full m-1 bg-input-color border-none rounded-md border-input-color' variant="outlined" readOnly >
          <OutlinedInput
            id="outlined-adornment-weight"
            value={copyText} 
            type="text"
            endAdornment={<InputAdornment position="end" className=' cursor-pointer' onClick={handleCopyClick}>{isCopied ? 'Copied!' : 'Copy'}</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            
          />
         
        
        </FormControl>
       
      </div>
    );
}

export default ClipboardCopy