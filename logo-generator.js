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
    'Enter the shape color (keyword or hexadecimal): ',
  ];
  
  let answers = [];
  
  const askQuestions = (i = 0) => {
    rl.question(questions[i], (answer) => {
      answers.push(answer);
      if (i === questions.length - 1) {
        rl.close();
        generateLogo();
      } else {
        askQuestions(i + 1);
      }
    });
  };
  
  askQuestions();
  
  const generateLogo = () => {
    const [text, textColor, shape, shapeColor] = answers;
  
    // This part of code will change based on the shape entered by the user.
    let svg;
  
    // Generate the SVG for each possible shape
    if (shape === 'circle') {
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" fill="${shapeColor}">
        <circle cx="150" cy="100" r="50"/>
        <text x="150" y="105" text-anchor="middle" fill="${textColor}" font-size="30px" font-family="Verdana">${text}</text>
      </svg>`;
    } else if (shape === 'square') {
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" fill="${shapeColor}">
        <rect width="100" height="100" x="100" y="50"/>
        <text x="150" y="105" text-anchor="middle" fill="${textColor}" font-size="30px" font-family="Verdana">${text}</text>
      </svg>`;
    } else if (shape === 'triangle') {
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" fill="${shapeColor}">
        <polygon points="150,25 275,175 25,175"/>
        <text x="150" y="105" text-anchor="middle" fill="${textColor}" font-size="30px" font-family="Verdana">${text}</text>
      </svg>`;
    }
  
    fs.writeFile('logo.svg', svg, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
  };
  