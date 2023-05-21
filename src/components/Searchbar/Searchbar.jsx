import { useState } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    const { value } = event.target;
    setQuery(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    // if (query.trim() === '') {
    //   toast.warn(`Please enter your request!`);
    //   return;
    // }

    onSubmit(query);

    // setQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />

        <SearchFormButton type="submit">
          <FcSearch style={{ width: 30, height: 30 }} />
        </SearchFormButton>
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     imageName: '',
//   };

//   static propTypes = {
//     onSubmit: PropTypes.func,
//   };

//   handleInputChange = event => {
//     const { value } = event.target;

//     this.setState({ imageName: value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     const { imageName } = this.state;

//     if (imageName.trim() === '') {
//       toast.warn(`Please enter your request!`);
//       return;
//     }

//     this.props.onSubmit(this.state.imageName);
//     // this.resetSearchForm();
//   };

//   resetSearchForm = () => {
//     this.setState({ imageName: '' });
//   };

//   render() {
//     const { imageName } = this.state;
//     return (
//       <Header>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormInput
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={imageName}
//             onChange={this.handleInputChange}
//           />

//           <SearchFormButton type="submit">
//             <FcSearch style={{ width: 30, height: 30 }} />
//           </SearchFormButton>
//         </SearchForm>
//       </Header>
//     );
//   }
// }
