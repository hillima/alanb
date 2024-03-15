import { useCallback, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Container,
  PreviewImage,
  PlaceholderContainer,
} from './DragDropFileUploadSm.styled';
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

const DragDropFileUploadSm = ({
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
        <CollectionModalIcon image={placeholderImage} width="88px" />
      ) : (
        <Image src="/preview-bg.svg" width={24} height={24} />
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
        <Image src="/upload-icon-small-circle.svg" width={16} height={16} />
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

DragDropFileUploadSm.defaultProps = {
  setFormError: () => {},
  setUploadError: () => {},
  setUploadedFile: () => {},
};

export default DragDropFileUploadSm;
