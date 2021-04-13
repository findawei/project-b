import React, {useState} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles';


const Dropzone = () => {

const useStyles = makeStyles((theme) => ({
  previewContainer: {
    container: 'true',
    width: '100%',
    height: '100%',
  },
  preview: {
    width: '100%',
    height: '100%',
    item: 'true',
    xs: '12',
  },
  previewImg: {
    // height: '100%',
    width: '100%',
  },
}))

const [files, setFiles] = useState([]);

const classes = useStyles();

const handleChange = (files) => {
    setFiles({
      files: files
    });
  }
  
return (
      <DropzoneArea
        dropzoneText={"Drag and drop an image here or click"}
        acceptedFiles={['image/*']}
        // onChange={handleChange()}
        filesLimit="6"
        showPreviewsInDropzone={false}
        showPreviews
        dropzoneClass={classes.dropZone}
        previewGridClasses={{
          item: classes.preview,
        }}
        getPreviewIcon={(file) => {
          if (file.file.type.split('/')[0] === 'image')
            return (
              <img className={classes.previewImg} role="presentation" src={file.data} />
            );
        }}
        />
    )
}

export default Dropzone;