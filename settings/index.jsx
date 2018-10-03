function mySettings(props) {
  return (
    <Page>
      
      <Select
        label="Upper Left"
        title=""
        settingsKey="upperLeft"
        options={[
           {
             name: "Date",
             value: "date"
           },
           {
             name: "Time",
             value: "time"
           },
           {
             name: "(Empty)",
             value: null
           }]          
        }
      />

      <Select
        label="Lower Right"
        title=""
        settingsKey="lowerRight"
        options={[
           {
             name: "Date",
             value: "date"
           },
           {
             name: "Time",
             value: "time"
           },
           {
             name: "(Empty)",
             value: null
           }]
        }
      />
    </Page>
  );
}

registerSettingsPage(mySettings);