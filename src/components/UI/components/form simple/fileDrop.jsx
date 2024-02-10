import { useDropzone } from "react-dropzone";
import { useGlobalContext } from "../../../../providers/globalContextProvider";
import { useCallback, useEffect, useState } from "react";


export const FileDrop = ({ htmlFor,accept,placeholder, className, style, children}) => {

  const [localFile, setLocalFile] = useState();
  const context = useGlobalContext();

    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
  
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          const binaryStr = reader.result
          context.setFileNewPlayerUploaded(binaryStr);
        }
        reader.readAsDataURL(file)
      })
    },[]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <label
    htmlFor={htmlFor}
    className={`panel-field-long ${className}`}
    style={style} >
        <span>{children}</span>
      <div
        {...getRootProps({className:'cm-c-field-icon fileUpload'})} >
      <input
          {...getInputProps()}
          className={`cm-c-field-icon__input addFileInput ${className}`} 
          type="file" 
          name={htmlFor}
          id={htmlFor}
          accept={accept}
        />
        <span
          className='pictureInputName' >
            {placeholder}
          </span>
      </div>        
    </label>
  );
}