import { useCallback, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Container,
  PreviewImage,
  PlaceholderContainer,
} from './DragDropFileUploadApply.styled';
import {
  SM_FILE_UPLOAD_TYPES_TEXT,
  SM_FILE_UPLOAD_TYPES,
  SM_FILE_SIZE_UPLOAD_LIMIT,
} from '../../utils/constants';
import Image from 'next/image';
import CollectionModalIcon from '../CollectionModalIcon';

type Props = {
  uploadedFile: File;
  uploadInputRef: MutableRefObject<HTMLInputElement>;
  setUploadedFile: Dispatch<SetStateAction<File>>;
  setFormError: Dispatch<SetStateAction<string>>;
  setUploadError: Dispatch<SetStateAction<string>>;
  placeholderImage?: string;
};

const DragDropFileUploadApply = ({
  uploadedFile,
  uploadInputRef,
  setUploadedFile,
  setFormError,
  setUploadError,
  placeholderImage,
}: Props): JSX.Element => {
  const onDrop = useCallback((acceptedFiles) => {
    setUploadError('');
    setFormError('');
    const file = acceptedFiles[0];
    const isAcceptedFileType = SM_FILE_UPLOAD_TYPES[file.type] || false;
    const isAcceptedFileSize = file.size <= SM_FILE_SIZE_UPLOAD_LIMIT;
    if (isAcceptedFileType && isAcceptedFileSize) {
      setUploadedFile(file);
    } else {
      setUploadError(
        `Unable to upload, please double check your file size or file type. Accepted file types: ${SM_FILE_UPLOAD_TYPES_TEXT}`
      );
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const placeholder = (
    <PlaceholderContainer borderless={false}>
      {placeholderImage ? (
        <img src={`${process.env.NEXT_PUBLIC_IPFS_URL}${placeholderImage}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} style={{objectFit: 'cover', width: '500px', height: '500px'}} />
      ) : (
        <Image src="/preview-bg.svg" width={91.67} height={91.67} />
      )}
    </PlaceholderContainer>
  );

  return (
    <Container {...getRootProps()} ref={uploadInputRef}>
      <input
        {...getInputProps()}
        accept="image/png,image/jpg,image/jpeg,image/webp,image/gif,.png,.jpg,.jpeg,.webp,.gif"
      />
      {isDragActive ? (
        <Image src="/upload-icon-small-circle.svg" width={91.67} height={91.67} />
      ) : (
        <>
          {uploadedFile ? (
            <PreviewImage
              alt="preview"
              src={URL.createObjectURL(uploadedFile)}
            />
          ) : (
            placeholder
          )}
        </>
      )}
    </Container>
  );
};

DragDropFileUploadApply.defaultProps = {
  setFormError: () => {},
  setUploadError: () => {},
  setUploadedFile: () => {},
};

export default DragDropFileUploadApply;
