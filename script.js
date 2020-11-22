const addActivity = () => {
  var li = document.createElement('li');
  let activity = document.getElementById('suggestedActivity').innerHTML;
  var newLine = document.createTextNode(activity);
  li.appendChild(newLine);
  document.getElementById('activityList').appendChild(li);
  saveActivity()
}

const newActivity = () => {
  $.ajax({ 
    url: 'https://www.boredapi.com/api/activity',
    type: 'GET',
    dataType: "json",
    success: function (data) {
        console.log(data);
        document.getElementById('suggestedActivity').innerHTML = data.activity;
    },
    error: function (error) {
        console.log(`Error ${error}`);
    }
  })
}

window.onload = newActivity();

const saveActivity = () => {
	let activityToSave = document.getElementById('suggestedActivity').innerHTML;				
  $.ajax({ 
    url: '/',
    type: 'POST',
    cache: false, 
    data: { activity: activityToSave }, 
    success: function(data){
        newActivity();
        console.log(data)
    },
    error: function(jqXHR, textStatus, err){
      alert('text status '+textStatus+', err '+err)
    }
  });
};



//connect to DB created in GUI
//heroku pg:psql -a heroku-fullstack-v1
//create table
//create table activities (activity text);


