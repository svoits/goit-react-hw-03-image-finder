import { MutatingDots } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrap>
      <MutatingDots
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrap>
  );
};
