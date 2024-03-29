import {useState, useContext, createContext, useCallback, useRef} from 'react';
import axios from 'axios';
// const apiKey = 'AIzaSyC2RBDtMq163rcWyIULTXC8Us1KGIxVJpg'
// const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${queryString}&key=${apiKey}`;

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchResults, setSearchResults] = useState("");

    // const apiKey = 'AIzaSyC2RBDtMq163rcWyIULTXC8Us1KGIxVJpg'

    const fetchBooks = useCallback(async()=> {
        setLoading(true)

        try{
        const apiUrl = 'http://localhost:8000/api/books/';

        const response = await axios.get(apiUrl);             
        const data = response.data;
            console.log(data)

            if(data){
                const newBooks = data.map((bookSingle) => {
              
                    return {
                        id: bookSingle.id,
                        authors: bookSingle.author,
                        categories: bookSingle.category,
                        imageLinks: bookSingle.image_url,
                        publishedDate: bookSingle.published_date,
                        description:bookSingle.description,
                        title: bookSingle.title,
                        price:bookSingle.price,
                        qty : bookSingle.quantity
                    }
                });

                setBooks(newBooks);
                console.log(newBooks)

                if(newBooks.length > 1){
                    setSearchResults("Your Search Result");
                } else {
                    setSearchResults("No Search Result Found!")
                    console.log(searchResults)
                }
            } else {
                setBooks([]);
                setSearchResults("No Search Result Found!");
                console.log(searchResults)

            }

              setLoading(false)
            } catch(error){
            console.log(error)
            setLoading(false)
        }
  
    }, []);

 
    const updateSelectedCategory = (category) => {
        setSelectedCategory(category);
      };

      
    const value = {loading, books, setBooks, searchResults, setSearchResults, fetchBooks, setSelectedCategory, selectedCategory,
    updateSelectedCategory}
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
} 

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider};