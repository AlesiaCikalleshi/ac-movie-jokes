import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Layout from "src/common/ui/Layout";
import MoviesDetails from "src/features/movies/MoviesDetails";
import MoviesList from "src/features/movies/MoviesList";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MoviesList />} />
          <Route path="/movies/:movieId" element={<MoviesDetails />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
