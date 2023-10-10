
  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
  // the code isn't run until the browser has finished rendering all the elements
  // in the html.
  const localeSettings = {};
  dayjs.locale(localeSettings);

  $(function () {
    const currentHour = dayjs().format('H');

  //Function to display current date and time
   function timeTracker() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
    
  // Function to save the user's text input only when the save button has been clicked.
  function textInput() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
       localStorage.setItem(key, value);
     });
   }

  // This will get the user input from the localStorage and set textarea values for each time block.
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });
    

  // function to change the block color based on past present or future.
   function currentColor() {
     $('.time-block').each(function() {
      const blockTime = parseInt(this.id);
      $(this).toggleClass('past', blockTime < currentHour);
      $(this).toggleClass('present', blockTime == currentHour);
      $(this).toggleClass('future', blockTime > currentHour);
      });
    }

   // Function to give a new color to each time block based on past, present, and future relative to the current time. 
   function newColor() {
    $('.time-block').each(function() {
      const blockTime = parseInt(this.id);
      if (blockTime == currentHour) {
        $(this).removeClass('past, future').addClass('present');
      } else if (blockTime < currentHour) {
        $(this).removeClass('future, present').addClass('past');
      } else {
        $(this).removeClass('past, present').addClass('future');
      }
    });

    }

    // Call the three main functions.
    currentColor();
    textInput();                
    newColor();

    // Update the time by seconds
    setInterval(timeTracker, 1000);
  });