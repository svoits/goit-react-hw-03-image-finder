import { MutatingDots } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrap>
      <MutatingDots
        height="100"
        width="100"
        color="#3f51b5"
        secondaryColor="#3f51b5"
        radius="15"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrap>
  );
};
