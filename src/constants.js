export const optionsGame = {
  players: [1,2,3,4],
  levels: ['easy', 'medium', 'hard'],
  questions_number: [5,10,15]
};

const baseUrl = 'https://opentdb.com/';

export const questionsUrl = `${baseUrl}api.php`;
export const categoryUrl = `${baseUrl}api_category.php`;
