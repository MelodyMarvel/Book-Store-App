import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Book from '../../components/SearchResult/Book';
import { useCartContext } from '../../cartContext';
import { useGlobalContext } from '../../context';

function BookList() {
  const { category } = useParams();
  // const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { books, setBooks } = useGlobalContext();

  const { addToCart } = useCartContext();

  useEffect(() => {
    // let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=5`;
    let apiUrl = 'http://localhost:8000/api/categories/';


    const fetchBooks = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if(data){
          const newBooks = data.map((bookSingle) => {
             
              return {
                  id: bookSingle.id,
                  authors: bookSingle.author,
                  categories: bookSingle.category,
                  imageLinks: bookSingle.image_url,
                  publishedDate: bookSingle.published_date,
                  title: bookSingle.title,
                  price:bookSingle.price
              }
          });

          setBooks(newBooks);
        } else {
          setBooks([]);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return ( 
    <>
        <h2>Books in Category: {category}</h2>
    <div className='container category'>
      {books.map((book, index) => {
        return (
          <Book key = {index} {...book} addToCart={addToCart}/>
              )})}
    </div>
    </> 
  
  );
}

export default BookList;
