import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Book from '../../components/SearchResult/Book';

function BookList() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=5`;

    const fetchBooks = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if(data.items){
          const newBooks = data.items.map((bookSingle) => {
              const {id, volumeInfo} = bookSingle;

              const {
                  authors,
                  categories,
                  imageLinks,
                  publishedDate,
                  title,
                } = volumeInfo;
        
              return {
                  id: id,
                  authors: authors,
                  categories: categories,
                  imageLinks: imageLinks,
                  publishedDate: publishedDate,
                  title: title
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
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Books in Category: {category}</h2>
      {books.map((book, index) => {
return (
                <Book key = {index} {...book} />
              )        })}
    </div>
  );
}

export default BookList;
