
////     THIS IS FOR IMAGE FORM SHOW IN POSTMAN

// const express = require('express');
// const bodyParser = require('body-parser');
// const { createCanvas, loadImage, registerFont } = require('canvas');
// const fs = require('fs');
// const QRCode = require('qrcode');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(cors());

// registerFont('./Montserrat-Light.ttf', { family: 'Montserrat-Light' });

// app.post('/generate-ticket', async (req, res) => {
//   try {
//     const { experienceName, date, numberOfPersons, customerName } = req.body;
//     const bookingId = generateBookingId();
//     const qrCodePath = `./qrcodes/qrcode_${bookingId}.png`;
//     await generateQRCode(bookingId, qrCodePath);

//     const canvas = createCanvas(420, 790); // Increased canvas size to accommodate 1 cm border
//     const ctx = canvas.getContext('2d');

//     // Draw black border
//     ctx.fillStyle = 'black';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw white background within the border
//     ctx.fillStyle = 'white';
//     ctx.fillRect(10, 45, canvas.width - 20, canvas.height - 60); // Adjusted for the 1 cm border

//     ctx.fillStyle = 'white)';
//     ctx.font = '15px Montserrat-Light';

//     ctx.fillText(`Booking ID ${bookingId}`, 40, 30);
//     ctx.font = '20px Montserrat-Light';
//     ctx.fillStyle = 'black';

//     const backgroundImage = await loadImage('https://www.kashmirhills.com/wp-content/uploads/2015/02/River-Rafting-1.jpg');
//     ctx.drawImage(backgroundImage, 10, 40, 400, 170);

//     const backgroundImagePath = './passprtlogo.jpeg';
//     if (fs.existsSync(backgroundImagePath)) {
//       const backgroundImage = await loadImage(backgroundImagePath);
//       ctx.drawImage(backgroundImage, 0, 720, 420, 60); // Adjusted for the 1 cm border
//     }

    

//     ctx.fillText(`${experienceName} Experience`, 40, 260);

//     ctx.beginPath();
//     ctx.setLineDash([0, 0]); // 3 pixels on, 3 pixels off for the dotted effect
//     ctx.moveTo(40, 280); // Starting point
//     ctx.lineTo(390, 280); // Ending point
//     ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
//     ctx.stroke();
//     ctx.setLineDash([]); // Reset line dash

//     ctx.fillText(`Date`, 40, 320);
//     ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
//     ctx.fillText(`${formatDate(date)}`, 40, 350);

//     // Draw a line after the date
// ctx.beginPath();
// ctx.setLineDash([0, 0]);
// ctx.moveTo(40, 370); // Starting point below the date
// ctx.lineTo(390, 370); // Ending point
// ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
// ctx.stroke();
// ctx.setLineDash([]);

//     ctx.fillStyle = 'black';
//     ctx.fillText(`Name`, 40, 400);
//     ctx.fillText(`Persons`, 320, 400);
//     ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
//     ctx.fillText(`${customerName}`, 40, 430);
//     ctx.fillText(`${numberOfPersons}`, 365, 430);
    
//     // Draw a line after the numberOfPersons
// ctx.beginPath();
// ctx.setLineDash([3, 3]);
// ctx.moveTo(40, 450); // Starting point to the right of the numberOfPersons
// ctx.lineTo(390, 450); // Ending point
// ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
// ctx.stroke();
// ctx.setLineDash([]);

// const qrCodeImage = await loadImage(qrCodePath);
//     ctx.drawImage(qrCodeImage, 160, 480, 100, 100); // Adjusted position for the 1 cm border
//     ctx.fillText(`${bookingId}`, 173, 610);

//  // Draw a line after the numberOfPersons
// ctx.beginPath();
// ctx.setLineDash([3, 3]);
// ctx.moveTo(40, 650); // Starting point to the right of the numberOfPersons
// ctx.lineTo(390, 650); // Ending point
// ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
// ctx.stroke();
// ctx.setLineDash([]);

//     ctx.fillText(`This ticket is non-refundable`, 40, 690);

//     const imageName = `ticket_${bookingId}.png`;
//     const out = fs.createWriteStream(imageName);
//     const stream = canvas.createPNGStream();
//     stream.pipe(out);

//     out.on('finish', () => {
//       res.download(imageName, () => {
//         fs.unlinkSync(imageName);
//         fs.unlinkSync(qrCodePath);
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// function generateBookingId(length = 6) {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
//   }

// async function generateQRCode(data, outputPath) {
//   await QRCode.toFile(outputPath, data);
//   console.log(`QR code generated at ${outputPath}`);
// }

// function formatDate(inputDate) {
//   const options = { month: 'short', day: 'numeric', year: 'numeric' };
//   const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
//   return formattedDate;
// }










//// THIS IS FOR THE IMAGE WHICH IS SHOW IN POSTMAN WHICH IS AS CALLING FROM FRONTEND SHOWING MAXIMUM CALL

//// THEN IN THIS IMAGE CONVERT INTO URL FORM THEN SEND BY THE BACKEND TO FRONTEND URL




const express = require('express');
const bodyParser = require('body-parser');
const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

registerFont('./Montserrat-Light.ttf', { family: 'Montserrat-Light' });


app.post('/generate-ticket', async (req, res) => {
  try {
    const { experienceName, date, numberOfPersons, customerName } = req.body;
    const bookingId = generateBookingId();
    const qrCodePath = `./qrcodes/qrcode_${bookingId}.png`;
    await generateQRCode(bookingId, qrCodePath);

    const canvas = createCanvas(420, 790);
    const ctx = canvas.getContext('2d');

    // Draw black border
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw white background within the border
    ctx.fillStyle = 'white';
    ctx.fillRect(10, 45, canvas.width - 20, canvas.height - 60);

    ctx.fillStyle = 'white)';
    ctx.font = '15px Montserrat-Light';

    ctx.fillText(`Booking ID ${bookingId}`, 40, 30);
    ctx.font = '20px Montserrat-Light';
    ctx.fillStyle = 'black';

    const backgroundImage = await loadImage('https://www.kashmirhills.com/wp-content/uploads/2015/02/River-Rafting-1.jpg');
    ctx.drawImage(backgroundImage, 10, 40, 400, 170);

    const backgroundImagePath = './passprtlogo.jpeg';
    if (fs.existsSync(backgroundImagePath)) {
      const backgroundImage = await loadImage(backgroundImagePath);
      ctx.drawImage(backgroundImage, 0, 720, 420, 60);
    }

    ctx.fillText(`${experienceName} Experience`, 40, 260);

    ctx.beginPath();
    ctx.setLineDash([0, 0]);
    ctx.moveTo(40, 280);
    ctx.lineTo(390, 280);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillText(`Date`, 40, 320);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillText(`${formatDate(date)}`, 40, 350);

    ctx.beginPath();
    ctx.setLineDash([0, 0]);
    ctx.moveTo(40, 370);
    ctx.lineTo(390, 370);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'black';
    ctx.fillText(`Name`, 40, 400);
    ctx.fillText(`Persons`, 320, 400);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillText(`${customerName}`, 40, 430);
    ctx.fillText(`${numberOfPersons}`, 365, 430);

    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(40, 450);
    ctx.lineTo(390, 450);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.stroke();
    ctx.setLineDash([]);

    const qrCodeImage = await loadImage(qrCodePath);
    ctx.drawImage(qrCodeImage, 160, 480, 100, 100);
    ctx.fillText(`${bookingId}`, 173, 610);

    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(40, 650);
    ctx.lineTo(390, 650);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillText(`This ticket is non-refundable`, 40, 690);

    const imageName = `ticket_${bookingId}.png`;
    const imagePath = `./ticket-app/public/ticket_images/${imageName}`;
    const out = fs.createWriteStream(imagePath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    out.on('finish', () => {
      // Clean up the QR code file
      fs.unlinkSync(qrCodePath);
      res.json({ imageUrl: `/ticket_images/${imageName}` });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function generateBookingId(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function generateQRCode(data, outputPath) {
  await QRCode.toFile(outputPath, data);
  console.log(`QR code generated at ${outputPath}`);
}

function formatDate(inputDate) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formattedDate;
}
