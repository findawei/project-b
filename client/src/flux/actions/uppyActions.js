import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import AwsS3 from '@uppy/aws-s3';
import Uppy from '@uppy/core';
import ReduxStore from '@uppy/store-redux'
import store from '../store';

const header =  tokenConfig();

export const uploadS3 = ({file}) => async(dispatch) => {
try {
    Uppy({
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
        companionHeaders: header,
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
}catch (err) {
//   dispatch({
//           type: AUTH_ERROR
console.log(err)}}
