function createPage() {
  const NOTION_API_KEY = '';
  const database_id = '';

  const url = 'https://api.notion.com/v1/pages';
  const url2 = 'https://api.notion.com/v1/databases/' + database_id + '/query';

  let headers = {
    'content-type' : 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + NOTION_API_KEY,
    'Notion-Version': '2022-06-28',
  };

  let todo = [
    [
    'Daily Task 1',
    'Daily Task 2',
    'Daily Task 3'
  ],[
    'Genre of Task 1',
    'Genre of Task 2',
    'Genre of Task 3'
  ]]

  let i = 0;
  let array = ReciveData(url2, headers);

  for (let item of todo[0]) {
    if(!array.includes(item)) {
      SendData(url, database_id, headers, item, todo[1][i]);
    }
    i++;
  } 
}

function ReciveData(url, headers) {

  let payload = {
    'start_cursor': undefined,
    'filter': {
        'and' : [
          {
            'property': 'Date',  // Change the 'Date' to your name of property
            'date': {
              'is_empty' : true
            }
          },
          {
            "property": "Status", // Change the 'Status' to your name of property
            "status": {
              "equals": "Todo"
            }
          }] 
      }
  }
  
  const opts = {
    'method': 'POST',
    'headers': headers,
    'payload': JSON.stringify(payload),
  };

  let notion_data = UrlFetchApp.fetch(url, opts);
  let tables = JSON.parse(notion_data.getContentText());

  let array =[];
  for(let item of tables.results){
    let name = item.properties['Name'].title[0].plain_text; // Change the 'Name' to your name of property
    array.push(name);
  }

  return array;
}

function SendData(url, database_id, headers, todo, genre) {
  const payload = {
    'parent': { 'database_id': database_id },
    'properties': {
      'Name': {  // Change the 'Name' to your name of property
        'title': [
          {
            'text': {
              'content': todo
            }
          }
        ]
      },
      "Genre": {  // Change the 'Genre' to your name of property
        "type": "select",
        "select": {
              "name": genre
        }
      },
      "Status": {  // Change the 'Status' to your name of property
            "type": "status",
            "status": {
                "name": "Todo"
            }
        }
    }
  };

  const opts = {
    'method': 'POST',
    'headers': headers,
    'payload': JSON.stringify(payload),
  };

  UrlFetchApp.fetch(url, opts);
}
