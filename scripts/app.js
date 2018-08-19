(function() {

  var app = {
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

  // Updates a flight card with the default flight data. If the card
  // doesn't already exist, it's cloned from the template.
  app.updateFlightCard = function(data) {
    var origin = data.origin;
    var destination = data.destination;
    var time = data.time;
    var status = data.status;

    var card = app.visibleCards[data.key];
    if (!card) {
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.route').textContent = data.origin + " to " + data.destination;
      card.removeAttribute('hidden');
      app.container.appendChild(card);
      app.visibleCards[data.key] = card;
    }

    card.querySelector('.time').textContent = time;
    card.querySelector('.status').textContent = status;
  
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };

  // Fake weather data that is presented when the user first uses the app
  var initialFlightList = {
    flights: [
      {
        key: 000001,
        origin: "Malta",
        destination: "Amsterdam",
        time: "08:45",
        status: "ON TIME",
      },
      {
        key: 0000010,
        origin: "Malta",
        destination: "London",
        time: "09:45",
        status: "DELAYED"
      },
      {
        key: 0000011,
        origin: "Malta",
        destination: "Poznan",
        time: "10:00",
        status: "ON TIME"
      },
      {
        key: 0000100,
        origin: "Malta",
        destination: "London",
        time: "11:45",
        status: "ON TIME"
      },
      {
        key: 0000101,
        origin: "Malta",
        destination: "Rome",
        time: "12:05",
        status: "ON TIME"
      },
      {
        key: 0000110,
        origin: "Malta",
        destination: "Paris",
        time: "12:35",
        status: "DELAYED"
      }
    ]
  };

  // Makes a card for each flight on the fake data list
  initialFlightList.flights.forEach(function(elmt) {
    app.updateFlightCard(elmt);
  })

  if (navigator.onLine == false) {
    banner = document.querySelector("banner_no_connection");
    banner.removeAttribute("hidden");
  }
})();
