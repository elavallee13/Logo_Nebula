const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  'Enter up to three characters for the logo text: ',
  'Enter the text color (keyword or hexadecimal): ',
  'Enter a shape (circle, triangle, square): ',
  'Enter the background color (keyword or hexadecimal): ',
  'Select a font style:\n1. Arial\n2. Times New Roman\n3. Montserrat\nEnter the number of your choice: ',
];

const fontStyles = [
  'Arial',
  'Times New Roman',
  'Montserrat',
];

const generateLogo = (text, textColor, shape, backgroundColor, fontStyle) => {
  let svg;

  switch (shape) {
    case 'circle':
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <circle cx="100" cy="100" r="80" fill="${backgroundColor}"/>
        <text x="100" y="120" fill="${textColor}" text-anchor="middle" font-size="40" font-family="${fontStyles[fontStyle - 1]}">${text}</text>
      </svg>`;
      break;
    case 'triangle':
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <polygon points="100,20 180,180 20,180" fill="${backgroundColor}"/>
        <text x="100" y="120" fill="${textColor}" text-anchor="middle" font-size="40" font-family="${fontStyles[fontStyle - 1]}">${text}</text>
      </svg>`;
      break;
    case 'square':
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect x="20" y="20" width="160" height="160" fill="${backgroundColor}"/>
        <text x="100" y="120" fill="${textColor}" text-anchor="middle" font-size="40" font-family="${fontStyles[fontStyle - 1]}">${text}</text>
      </svg>`;
      break;
    default:
      console.log('Invalid shape entered.');
      rl.close();
      return;
  }

  const fileName = 'logo.svg';

  fs.writeFile(fileName, svg, (err) => {
    if (err) {
      console.log('An error occurred while generating the logo.');
      console.error(err);
    } else {
      console.log(`Generated ${fileName}`);
    }
    rl.close();
  });
};

const getUserInput = (questions, answers = []) => {
  const currentQuestion = questions[0];

  rl.question(currentQuestion, (answer) => {
    const trimmedAnswer = answer.trim();
    answers.push(trimmedAnswer);

    if (questions.length === 1) {
      const [text, textColor, shape, backgroundColor, fontStyle] = answers;
      generateLogo(text, textColor, shape, backgroundColor, fontStyle);
    } else {
      const remainingQuestions = questions.slice(1);
      getUserInput(remainingQuestions, answers);
    }
  });
};

getUserInput(questions);
