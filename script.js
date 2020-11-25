const getActivity = () => {
  $.ajax({ 
    url: 'https://www.boredapi.com/api/activity',
    type: 'GET',
    dataType: "json",
    success: function (data) {
        document.getElementById('suggestedActivity').innerHTML = data.activity;
    },
    error: function (error) {
        console.log(`Error ${error}`);
    }
  })
}

const addActivity = async () => {
  await saveActivity();
  let activity = document.getElementById('suggestedActivity').innerHTML;  
  let newLine = document.createTextNode(activity);
  let li = document.createElement('li');
  li.appendChild(newLine);
  document.getElementById('activityList').appendChild(li);
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
  // .done(getActivity());
};

const deleteActivities = () => {
  $.ajax({ 
    url: '/delete',
    type: 'POST',
    success: function(data){
      console.log(data);
      document.getElementById('activityList').innerHTML = "";
    },
    error: function(err){
      console.log(err);
    }
  })
};

window.onload = getActivity();







