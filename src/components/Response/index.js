import React, { useState } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Text,
  IconButton,
  Stack,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { addConversation } from '../../actions/conversationActions';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

export default function Response(props) {
  const [showButtons, setShowButtons] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");
  const footerColor = useColorModeValue("gray.700", "gray.200");

  const dispatch = useDispatch();

  // Function to dispatch action for adding conversation
  const saveConversation = () => {
    const conversationData = {
      prompt: props.prompt,
      response: props.response,
      // Add other necessary conversation data
    };
    dispatch(addConversation(conversationData));
    // Make API call here to save the conversation
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleLikeClick = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
  };

  const handleDislikeClick = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <IconButton
          key={i}
          aria-label={`Star ${i}`}
          icon={<FaStar />}
          colorScheme={i <= rating ? "yellow" : "gray"}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  const handleMouseLeave = () => {
    setShowButtons(false); // Hide buttons

    saveConversation(); // Trigger saveConversation only when the area is left

  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    // Handle submitting feedback here, e.g., send it to an API or store it in state
    console.log("Submitted feedback:", feedback);
    // Reset feedback state after submission
    setFeedback('');
  };

  return (
    <Flex
      bg={useColorModeValue("gray.50", "inherit")}
      w="full"
      py={5}
      alignItems="center"
      justifyContent="center"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        mx="auto"
        w="inherit"
        px={8}
        py={4}
        rounded="lg"
        shadow="base"
        bg={bgColor}
      >
        <Box mt={2}>
          <Text fontSize="2xl" color={textColor} fontWeight="700">
            {props.prompt}
          </Text>
          <chakra.p my={2} color={useColorModeValue("gray.600", "gray.300")}>
            {props.response.split("\n").map(function (item, key) {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </chakra.p>
          <Flex justify={"end"}>
            <Text color={footerColor} fontWeight="600">
              - Soul AI
            </Text>
          </Flex>
        </Box>
        {showButtons && (
          <Stack direction="column" alignItems="center" mt={4}>
            <Flex alignItems="center">
              <IconButton
                aria-label="Like"
                icon={<AiOutlineLike />}
                colorScheme={liked ? "green" : "gray"}
                onClick={handleLikeClick}
                mr={2}
              />
              <IconButton
                aria-label="Dislike"
                icon={<AiOutlineDislike />}
                colorScheme={disliked ? "red" : "gray"}
                onClick={handleDislikeClick}
              />
            </Flex>
            <Stack direction="row" spacing={2}>
              {renderStars()}
            </Stack>
            <Textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Enter feedback here..."
              mt={4}
            />
            <Button
              colorScheme="teal"
              onClick={handleSubmitFeedback}
              mt={2}
            >
              Submit Feedback
            </Button>
          </Stack>
        )}
      </Box>
    </Flex>
  );
}
