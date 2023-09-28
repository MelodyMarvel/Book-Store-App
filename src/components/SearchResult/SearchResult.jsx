import { useGlobalContext } from '../../context';
import Book from "./Book";
import Loading from "../Loader/Loader";
import coverImg from "../../assets/No_Cover.jpg";
import "./SearchResult.css";
import { useLocation } from 'react-router-dom';


const SearchResult = () => {
  const {books, loading, searchTerm} = useGlobalContext();
  
  const bookList = books.map((singleBook) => {
    return {
      ...singleBook,
      // cover_img: singleBook.imageLinks,
      // title: singleBook.title,

    }
  });


  if(loading) return <Loading />;

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
        {searchTerm ? <h2>Your Search Result</h2> : <h2>Available Books</h2>}
        </div>
        <div className='booklist-content grid'>
          {
            bookList.map((item, index) => {
              return (
                <Book key = {index} {...item} />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default SearchResult