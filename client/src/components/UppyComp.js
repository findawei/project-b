import axios from 'axios';
import {connect} from 'react-redux';
import AwsS3 from '@uppy/aws-s3';
import Uppy from '@uppy/core';
import ReduxStore from '@uppy/store-redux'
import store from '../flux/store';
import {DragDrop, Dashboard} from '@uppy/react/';

import { tokenConfig } from '../flux/actions/authActions';

// import '@uppy/core/dist/style.min.css'

const header = tokenConfig();

if(header){
  console.log(JSON.stringify(header))
}

const uppy = Uppy({
    id: 'redux',
    store: ReduxStore({
        store: store,
        id: 'avatarUpload'
      }),
    meta: { type: 'avatar' },
    restrictions: {
      maxNumberOfFiles: 10,
      maxFileSize: 1000000,
      allowedFileTypes: ['image/*'],
      minNumberOfFiles: 1,
    },
    autoProceed: true,
  })
  .use(AwsS3, {
    // serverHeaders: header,
    companionHeaders:{
      Authorization: ''
    },
    companionUrl: "localhost:5000/companion",
    
  })
  .on('file-added', file => {
    console.log('Added file', file);
  })
  .on('upload-error', (file, error) => {
    console.log('error with file:', file.id);
    console.log('error message:', error);
  })
  .on('complete', result => {
    const url = result.successful[0].uploadURL;
    console.info('Upload complete!');
  })
  .run();

  const UppyComp = ({ currentAvatar }) => {

  return (
    <div>
      <img src={currentAvatar} alt="Current Avatar" />
      <DragDrop
        uppy={uppy}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
    uppy: state.uppy,
  });

export default connect(mapStateToProps, {}) (UppyComp);