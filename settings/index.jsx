function mySettings(props) {
  return (
    <Page>
      
      <Toggle
        settingsKey="bitText"
        label="Numbers on bits"
       />
      
      <Select
        label="Upper Left"
        title=""
        settingsKey="upperLeft"
        options={[{
             name: "Date",
             value: "date"
           },{
             name: "Time",
             value: "time"
           },{
             name: "Steps",
             value: "steps"
           },{
             name: "Heart Rate",
             value: "bpm"
           },{
             name: "Floors Climbed",
             value: "floors"
           },{
             name: "Calories",
             value: "calories"
           },{
             name: "(Empty)",
             value: null
           }]          
        }
      />
      
      <Select
        label="Upper Right"
        title=""
        settingsKey="upperRight"
        options={[{
             name: "Date",
             value: "date"
           },{
             name: "Time",
             value: "time"
           },{
             name: "Steps",
             value: "steps"
           },{
             name: "Heart Rate",
             value: "bpm"
           },{
             name: "Floors Climbed",
             value: "floors"
           },{
             name: "Calories",
             value: "calories"
           },{
             name: "(Empty)",
             value: null
           }]          
        }
      />

      <Select
        label="Lower Left"
        title=""
        settingsKey="lowerLeft"
        options={[{
             name: "Date",
             value: "date"
           },{
             name: "Time",
             value: "time"
           },{
             name: "Steps",
             value: "steps"
           },{
             name: "Heart Rate",
             value: "bpm"
           },{
             name: "Floors Climbed",
             value: "floors"
           },{
             name: "Calories",
             value: "calories"
           },{
             name: "(Empty)",
             value: null
           }]
        }
      />

      <Select
        label="Lower Right"
        title=""
        settingsKey="lowerRight"
        options={[{
             name: "Date",
             value: "date"
           },{
             name: "Time",
             value: "time"
           },{
             name: "Steps",
             value: "steps"
           },{
             name: "Heart Rate",
             value: "bpm"
           },{
             name: "Floors Climbed",
             value: "floors"
           },{
             name: "Calories",
             value: "calories"
           },{
             name: "(Empty)",
             value: null
           }]
        }
      />
    </Page>
  );
}

registerSettingsPage(mySettings);