import { FC, useEffect } from 'react';
import PreviewTemplateCard from '../PreviewTemplateCard';
import { useCreateAssetContext } from '../Provider';
import {
  Container,
  Row,
  LeftColumn,
  RightColumn,
  ElementTitle,
  AttrWrap,
  AttrText,
  AttrItemWrap,
  AttrItem,
  AttrLabel,
  AttrVal
} from './CreatePageLayout.styled';
import { fileReader } from '../../utils';

const CreatePageLayout: FC<{ children: JSX.Element, value ?: any }> = ({ children, value }) => {
  const {
    setTemplateImage,
    setTemplateVideo,
    templateUploadedFile,
    selectedCollection,
    templateName,
    templateImage,
    templateVideo,
    maxSupply,
    uploadedThumbPreview,
    isGlb
  } = useCreateAssetContext();
  useEffect(() => {
    if (templateUploadedFile && window) {
      const filetype = templateUploadedFile.type;
      if (filetype.includes('video')) {
        const readerSetTemplateVideo = (result) => {
          setTemplateImage('');
          setTemplateVideo(result);
        };
        fileReader(readerSetTemplateVideo, templateUploadedFile);
      } else {
        const readerSetTemplateImage = (result) => {
          setTemplateVideo('');
          setTemplateImage(result);
        };
        fileReader(readerSetTemplateImage, templateUploadedFile);
      }
    } else {
      setTemplateImage('');
      setTemplateVideo('');
    }
  }, [templateUploadedFile]);

  return (
    <Container>
      <Row>
        <LeftColumn>{children}</LeftColumn>
        <RightColumn>
          {isGlb ? 
            <>
            <>
            <ElementTitle>Preview GLB</ElementTitle>
              <PreviewTemplateCard
                templateVideo={templateVideo}
                templateImage={templateImage}
                templateName={templateName}
                collectionImage={selectedCollection.img}
                collectionDisplayName={selectedCollection.name}
                collectionName={selectedCollection.collection_name}
                maxSupply={maxSupply}
                hasPlaceholderIcon={!selectedCollection.name}
                isGlb={true}
              />
            </>
            <ElementTitle>Preview Thumbnail</ElementTitle>
            <PreviewTemplateCard
              templateVideo={templateVideo}
              templateImage={uploadedThumbPreview}
              templateName={templateName}
              collectionImage={selectedCollection.img}
              collectionDisplayName={selectedCollection.name}
              collectionName={selectedCollection.collection_name}
              maxSupply={maxSupply}
              hasPlaceholderIcon={!selectedCollection.name}
              isGlb={false}
            /> 
            </> :
            <>
              <ElementTitle>Preview</ElementTitle>
              <PreviewTemplateCard
                templateVideo={templateVideo}
                templateImage={templateImage}
                templateName={templateName}
                collectionImage={selectedCollection.img}
                collectionDisplayName={selectedCollection.name}
                collectionName={selectedCollection.collection_name}
                maxSupply={maxSupply}
                hasPlaceholderIcon={!selectedCollection.name}
                isGlb={false}
              />
            </>
          }
          {value != undefined && 0 < value.length ? 
          value[0]['label'] != '' && value[0]['newVal'] != '' ?
            <AttrWrap>
              <AttrText>Attributes</AttrText>
              <AttrItemWrap>
                {value.map((val) => val['label'] && val['newVal'] ? (
                  <AttrItem>
                    <AttrLabel>{val['label']}</AttrLabel>
                    <AttrVal>{val['newVal']}</AttrVal>
                  </AttrItem>
                ) : null)
                }
              </AttrItemWrap>
            </AttrWrap> : null
          : null}
        </RightColumn>
      </Row>
    </Container>
  );
};

export default CreatePageLayout;
