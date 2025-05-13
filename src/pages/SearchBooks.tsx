
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import BookSearchBox from "@/components/BookSearchBox";
import { bookCatalog } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SearchFilters = {
  query: string;
  author: string;
  genre: string;
};

const SearchBooks = () => {
  const [searchResults, setSearchResults] = useState(bookCatalog);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (filters: SearchFilters) => {
    setIsSearching(true);
    
    // Filter books based on search criteria
    const results = bookCatalog.filter((book) => {
      const matchesTitle = filters.query === "" || 
        book.title.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchesAuthor = filters.author === "" || 
        book.author.toLowerCase().includes(filters.author.toLowerCase());
      
      const matchesGenre = filters.genre === "" || 
        book.genre.toLowerCase() === filters.genre.toLowerCase();
      
      return matchesTitle && matchesAuthor && matchesGenre;
    });
    
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Search Books</h1>
        
        <BookSearchBox onSearch={handleSearch} />
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">
            {searchResults.length} Books Found
          </h2>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <div className="flex h-full">
                    <div className="w-1/3 bg-gray-200">
                      <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="w-2/3 p-4">
                      <h3 className="font-semibold line-clamp-2 mb-1">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {book.genre}
                        </Badge>
                        <Badge 
                          variant={book.available ? "outline" : "secondary"}
                          className={book.available ? "bg-green-50 text-green-700 border-green-100" : ""}
                        >
                          {book.available ? "Available" : "Checked Out"}
                        </Badge>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No books found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchBooks;
