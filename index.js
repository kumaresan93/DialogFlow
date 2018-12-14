const functions = require('firebase-functions');
const { Text, Card, Image, Suggestion, BrowseCarousel, BrowseCarouselItem,WebhookClient, Payload } = require('dialogflow-fulfillment');
const AirportImageUrl1 = 'https://images.firstpost.com/wp-content/uploads/2018/03/Mumbai-new-airport-PTI.jpg';
const LocationButtonUrl = 'https://www.goindigo.in/?cid=Search|Google|Brand|Brand_New|IndiGo|01&gclid=CjwKCAiAlvnfBRA1EiwAVOEgfJRx2g5zLq03R6nP79MwMqwShdnr_cF2rmZJpAppwYd7IZO0NJ2XqRoCeA4QAvD_BwE';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(new Text({
      title: 'Welcome to Indaian Airlines',
      text: 'Please select your Airlines',
    })
    );
    agent.add(new Image({
      imageUrl: 'https://www.airlinesalert.com/wp-content/uploads/2018/04/air-india-11.jpg',
    })
    );
  }

  function Booking(agent) {
    agent.add(new Card({
      title: 'Flight Ticket Booking',
      imageUrl: 'https://www.airlinesalert.com/wp-content/uploads/2018/04/air-india-11.jpg',
      text: 'Book the flight the flight',
      buttonText: 'Click',
      buttonUrl: 'https://www.airlinesalert.com/wp-content/uploads/2018/04/air-india-11.jpg'
    })
    );
    agent.add('Okay,I will help You,Which airliens you want?');
    agent.add(new Suggestion('Indigo'));
    agent.add(new Suggestion('Jet Airways'));
    agent.add(new Suggestion('Air India'));
    agent.add(new Suggestion('Air Asia'));
  }

  function Destination(agent) {
    agent.add(new BrowseCarousel({
      items: [
        new BrowseCarouselItem({
          title: 'Please select your source',
          url: "https://www.google.com/",
          description: 'Description of item 1',
          image: new Image({
            imageUrl: AirportImageUrl1,
            alt: 'select youy source location',
            buttonText: 'Click',
            buttonUrl: LocationButtonUrl
          }),
          footer: 'Item 1 footer',
        }),
        new BrowseCarouselItem({
          title: 'Please select your destination',
          url: "https://www.google.com/",
          description: 'Description of item 2',
          image: new Image({
            imageUrl: AirportImageUrl1,
            alt: 'select youy destination location',
            buttonText: 'Click',
            buttonUrl: LocationButtonUrl
          }),
          footer: 'Item 2 footer',
        }),
      ],
    })
    );
  }

  function fallback(agent) {
    agent.add('Woah! Its getting a little hot in here.');
    agent.add(`I didn't get that, can you try again?`);
  }

  let intentMap = new Map(); // Map functions to Dialogflow intent names
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Ask_Booking', Booking);
  intentMap.set('Location', Destination);
  intentMap.set('Default Fallback Intent', fallback);
  agent.handleRequest(intentMap);
});