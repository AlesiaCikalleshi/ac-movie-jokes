import { Button, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectJokeByMovieId, selectJokeStatus } from "./aiJokesSlice";

function JokesGenerator({ movieId, movieTitle, movieDescription }) {
  const joke = useSelector((state) => selectJokeByMovieId(state, movieId));
  const jokeStatus = useSelector(selectJokeStatus);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleGenerateJoke = async () => {
    try {
      await dispatch({ movieId, movieTitle, movieDescription }).unwrap();
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to load joke.",
        description: "Please refresh the page and check internet connection.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Button
      isLoading={jokeStatus === "loading"}
      variant="solid"
      bg="green.300"
      color="white"
      w="100%"
      onClick={handleGenerateJoke}
    >
      {joke ? "Regenerate" : "Generate"} Joke
    </Button>
  );
}

export default JokesGenerator;
