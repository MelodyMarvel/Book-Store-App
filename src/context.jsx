import {useState, useContext, createContext, useCallback} from 'react';
import axios from 'axios';
// const apiKey = 'AIzaSyC2RBDtMq163rcWyIULTXC8Us1KGIxVJpg'
// const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${queryString}&key=${apiKey}`;

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [selectedCategory, setSelectedCategory] = useState(null); // Add selectedCategory state

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchResults, setSearchResults] = useState("");
    // const [defaultBooks, setDefaultBooks] = useState([])

    const apiKey = 'AIzaSyC2RBDtMq163rcWyIULTXC8Us1KGIxVJpg'

    const fetchBooks = useCallback(async(searchQuery="python", category="")=> {
        setLoading(true)

        try{
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&subject:${category}&key=${apiKey}`;
        const response = await axios.get(apiUrl);             
        const data = response.data;
            console.log(data)

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
  
    }, [apiKey]);

 
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