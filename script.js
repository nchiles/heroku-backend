const getActivity = () => {  
  $.ajax({ 
    url: 'https://www.boredapi.com/api/activity',
    type: 'GET',
    dataType: "json",
    success: function (data) {
      let fontColors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9']
      let randColor = fontColors[Math.floor(Math.random() * fontColors.length)];
      let activity = document.getElementById('suggestedActivity');
      activity.innerHTML = data.activity.toLowerCase();
      activity.style.color = randColor;
    },
    error: function (error) {
        console.log(`Error ${error}`);
    }
  })
}

const addActivity = () => {
  //add activity
  let activity = document.getElementById('suggestedActivity').innerHTML;  
  let newLine = document.createTextNode(activity);
  let li = document.createElement('li');
  li.appendChild(newLine);
  saveActivity();
  document.getElementById('activityList').appendChild(li);

  //increment activity count
  let activityCount = parseInt(document.getElementById('activityCount').innerHTML);
  console.log(parseInt(activityCount))
  activityCount++
  document.getElementById('activityCount').innerHTML = activityCount.toString();
}

const saveActivity = () => {
  let activityToSave = document.getElementById('suggestedActivity').innerHTML;
  $.ajax({ 
    url: '/add',
    type: 'POST',
    data: { activity: activityToSave }, 
    success: function(data){
      console.log(data)
    },
    error: function(err){
      console.log(err);
    }
  })
  .done(getActivity());
};

const deleteActivities = () => {
  $.ajax({ 
    url: '/delete',
    type: 'POST',
    success: function(data){
      console.log(data);
      document.getElementById('activityList').innerHTML = '';
      document.getElementById('activityCount').innerHTML = '0';
    },
    error: function(err){
      console.log(err);
    }
  })
};

window.onload = getActivity();







