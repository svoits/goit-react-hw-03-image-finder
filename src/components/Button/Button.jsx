import { Btn } from './Button.styled';
import PropTypes from 'prop-types';

// const smoothScroll = () => {
//   window.scrollBy({
//     top: 400 * 2,
//     behavior: 'smooth',
//   });
// };

export const Button = ({ onClick }) => {
  return (
    <Btn
      type="button"
      onClick={() => {
        onClick();
        // smoothScroll();
      }}
    >
      Load more
    </Btn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
