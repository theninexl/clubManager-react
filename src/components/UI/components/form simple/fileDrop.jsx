import { useDropzone } from "react-dropzone";
import { useGlobalContext } from "../../../../providers/globalContextProvider";


export const FileDrop = ({ htmlFor,accept,placeholder, className, style, children}) => {

  const context = useGlobalContext();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFile) => {
      context.setFileNewPlayerUploaded(acceptedFile[0].name)
    },
  });


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