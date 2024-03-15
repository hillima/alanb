import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  NameContainer,
  Name,
  AuthorText,
  Title,
  Author,
  CollectionNameButton,
} from './AssetFormTitle.styled';
import AssetFormPopupMenu from '../AssetFormPopupMenu';
import { useAuthContext } from '../Provider';
import DetailCollectionIcon from '../DetailCollectionIcon';

type Props = {
  templateName: string;
  collectionDisplayName?: string;
  collectionName: string;
  collectionAuthor: string;
  collectionImage: string;
  assetIds?: string[];
  saleIds?: string[];
  isRefetchingAssets?: boolean;
  setCurrentAssetAsModalProps?: () => void;
  model?: string;
  schemaName: string;
  templateId: string;
};

const AssetFormTitle: FC<Props> = ({
  templateName,
  collectionName,
  collectionDisplayName,
  collectionAuthor,
  collectionImage,
  assetIds,
  saleIds,
  isRefetchingAssets,
  setCurrentAssetAsModalProps,
  model,
  schemaName,
  templateId
}) => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const actor = currentUser ? currentUser.actor : '';
  const isMyTemplate = currentUser && router.query.chainAccount === actor;
  const redirectToAuthor = () => router.push(`/user/${collectionAuthor}`);
  const redirectToCollection = () => router.push(`/${collectionName}`);

  useEffect(() => {
    router.prefetch(`/user/${collectionAuthor}`);
  }, []);

  return (
    <>
      <CollectionNameButton>
        <DetailCollectionIcon image={collectionImage} name={collectionName} />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <Title onClick={redirectToCollection}>{collectionDisplayName || collectionName}</Title>
          {/* {model === undefined ? null : 
            <Link href={`/threeview/${model}`}>
              <a>
                <img src="/threejs_button.svg" />
              </a>
            </Link>
          } */}
        </div>
      </CollectionNameButton>
      <NameContainer>
        <Name>{templateName}</Name>
        {actor && (
          <AssetFormPopupMenu
            templateId={templateId}
            collectionName={collectionName}
            author={collectionAuthor}
            schemaName={schemaName}
            setCurrentAssetAsModalProps={setCurrentAssetAsModalProps}
            assetIds={assetIds}
            saleIds={saleIds}
            isMyTemplate={isMyTemplate}
            isRefetchingAssets={isRefetchingAssets}
            isTemplateCreator={
              currentUser && collectionAuthor === currentUser.actor
            }
          />
        )}
      </NameContainer>
      <AuthorText>
        Created by{' '}
        <Author onClick={redirectToAuthor}>{collectionAuthor}</Author>
      </AuthorText>
    </>
  );
};

export default AssetFormTitle;
